const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { defineSecret } = require("firebase-functions/params");

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

// Define Gemini API key as a secret
const geminiApiKey = defineSecret("GEMINI_API_KEY");

/**
 * Cloud Function triggered when a new message is created
 * Checks if the conversation partner is a bot and generates an AI response
 */
exports.generateBotResponse = onDocumentCreated(
    {
        document: "chats/{matchId}/messages/{messageId}",
        secrets: [geminiApiKey]
    },
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) {
            console.log("No data in snapshot");
            return;
        }

        const message = snapshot.data();
        const matchId = event.params.matchId;
        const messageId = event.params.messageId;

        console.log(`New message in match ${matchId}: ${message.text}`);

        // Get the match to find both users
        const matchDoc = await db.collection("matches").doc(matchId).get();
        if (!matchDoc.exists) {
            console.log("Match not found");
            return;
        }

        const match = matchDoc.data();
        const senderId = message.senderId;

        // Find the other user (potential bot)
        const partnerId = match.users.find(id => id !== senderId);

        // Check if partner is a bot
        const partnerDoc = await db.collection("profiles").doc(partnerId).get();
        if (!partnerDoc.exists) {
            console.log("Partner profile not found");
            return;
        }

        const partner = partnerDoc.data();
        if (!partner.isBot) {
            console.log("Partner is not a bot, skipping AI response");
            return;
        }

        console.log(`Bot ${partner.name} will respond to: "${message.text}"`);

        // Get conversation history for context
        const messagesSnapshot = await db
            .collection("chats")
            .doc(matchId)
            .collection("messages")
            .orderBy("createdAt", "asc")
            .limit(10)
            .get();

        const conversationHistory = [];
        messagesSnapshot.forEach(doc => {
            const msg = doc.data();
            conversationHistory.push({
                role: msg.senderId === partnerId ? "model" : "user",
                parts: [{ text: msg.text }]
            });
        });

        // Generate AI response using Gemini
        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey.value());
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Build context about the dog's personality
            const aiContext = partner.aiContext || {};
            const systemPrompt = `You are ${partner.name}, a ${partner.age} year old ${partner.breed}. 
You are a dog chatting on a dog social app.
Your personality is: ${aiContext.personality || 'friendly'}.
Your traits are: ${(aiContext.traits || ['friendly']).join(', ')}.
You often use these phrases: ${(aiContext.commonPhrases || ['Woof!']).join(', ')}.
Use a fun, casual tone with occasional dog-related expressions.
Keep responses short (1-2 sentences) and engaging.
You can use emojis like: ${aiContext.emoji || '🐕'} 🐾 ❤️
Never break character - you ARE a dog named ${partner.name}.`;

            const chat = model.startChat({
                history: conversationHistory.slice(0, -1), // Exclude the latest message
                generationConfig: {
                    maxOutputTokens: 100,
                    temperature: 0.9,
                },
            });

            const result = await chat.sendMessage(message.text);
            const response = result.response.text();

            console.log(`Bot response: "${response}"`);

            // Save the bot's response
            await db.collection("chats").doc(matchId).collection("messages").add({
                senderId: partnerId,
                text: response,
                createdAt: new Date().toISOString(),
                read: false,
                isAiGenerated: true
            });

            // Update match with last message
            await db.collection("matches").doc(matchId).update({
                lastMessage: response,
                lastMessageAt: new Date().toISOString()
            });

            console.log("Bot response saved successfully");

        } catch (error) {
            console.error("Error generating AI response:", error);

            // Fallback response if AI fails
            const fallbackResponses = [
                `Woof! ${partner.name} is excited to hear from you! 🐾`,
                `*wags tail* Hi there! 🐕`,
                `Bark bark! Let's play! 🎾`,
                `*happy dog noises* 🐶❤️`
            ];
            const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

            await db.collection("chats").doc(matchId).collection("messages").add({
                senderId: partnerId,
                text: fallback,
                createdAt: new Date().toISOString(),
                read: false,
                isAiGenerated: true,
                isFallback: true
            });
        }
    }
);

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateProfilePage from './pages/CreateProfilePage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import NotificationService from './services/NotificationService';

const AuthenticatedApp = () => {
  const { currentUser, userProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('discover');
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    // Request notification permissions on app start
    NotificationService.requestPermissions();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear selected match when leaving chat
    if (tab !== 'chat') {
      setSelectedMatch(null);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discover': return <DiscoverPage />;
      case 'matches': return (
        <MatchesPage
          setActiveTab={handleTabChange}
          setSelectedMatch={setSelectedMatch}
        />
      );
      case 'chat': return (
        <ChatPage
          onBack={handleTabChange}
          selectedMatch={selectedMatch}
        />
      );
      case 'notifications': return <NotificationsPage />;
      case 'profile': return <ProfilePage />;
      default: return <DiscoverPage />;
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  // 1. Not Logged In
  if (!currentUser) {
    if (authView === 'login') {
      return <LoginPage onNavigateSignup={() => setAuthView('signup')} />;
    } else {
      return <SignupPage onNavigateLogin={() => setAuthView('login')} />;
    }
  }

  // 2. Logged In, But No Profile (Onboarding)
  if (!userProfile) {
    return <CreateProfilePage />;
  }

  // 3. Logged In & Profile Exists (Main App)
  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      <div style={{ height: '100%' }}>
        {renderContent()}
      </div>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;

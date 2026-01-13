import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import { AuthProvider } from './contexts/AuthContext';

import NotificationService from './services/NotificationService';

function App() {
  const [activeTab, setActiveTab] = useState('discover');

  useEffect(() => {
    // Request notification permissions on app start
    NotificationService.requestPermissions();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'discover': return <DiscoverPage />;
      case 'matches': return <MatchesPage setActiveTab={setActiveTab} />;
      case 'chat': return <ChatPage onBack={setActiveTab} />;
      case 'notifications': return <NotificationsPage />;
      case 'profile': return <ProfilePage />;
      default: return <DiscoverPage />;
    }
  };

  return (
    <AuthProvider>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        <div style={{ height: '100%' }}>
          {renderContent()}
        </div>
      </Layout>
    </AuthProvider>
  );
}

export default App;

// client/src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { useSocketContext } from './context/SocketContext';

function App() {
  const { isConnected } = useSocketContext();

  return (
    <div className="app-container">
      <Routes>
        <Route 
          path="/" 
          element={!isConnected ? <LoginPage /> : <Navigate to="/chat" />} 
        />
        <Route 
          path="/chat" 
          element={isConnected ? <ChatPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
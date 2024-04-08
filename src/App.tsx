import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react';
import HomeScreen from "./screen/HomeScreen";
const ChatScreen = React.lazy(() => import('./screen/ChatScreen'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/chat" element={
        <Suspense fallback="Loading...">
          <ChatScreen />
        </Suspense>
      } />
    </Routes>
  )
}

export default App
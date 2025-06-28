
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
import Pricing from './Pricing';
import Blog from './Blog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import History from './History';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

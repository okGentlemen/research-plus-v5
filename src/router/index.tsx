import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { UserProfile } from '../pages/Settings/UserProfile';
import { VipPage } from '../pages/vip';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="settings/profile" element={<UserProfile />} />
        <Route path="/vip" element={<VipPage />} />
      </Route>
    </Routes>
  );
}
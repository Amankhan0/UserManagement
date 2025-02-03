import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './views/UserManagement/user';
import AddUser from './views/UserManagement/AddUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserManagement />} />
      <Route path="/adduser" element={<AddUser />} />
    </Routes>
  );
}

export default App;
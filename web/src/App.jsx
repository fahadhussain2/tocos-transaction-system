import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import AddUser from "./components/AddUser";
import AddTransaction from "./components/AddTransaction";
import UserDetails from "./components/UserDetails";
import UsersTable from "./components/UsersTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<UsersTable />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="add-transaction" element={<AddTransaction />} />
        <Route path="user/:id" element={<UserDetails />} />
      </Route>
    </Routes>
  );
}

export default App;

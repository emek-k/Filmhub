import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from "./modules/Navbar";

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

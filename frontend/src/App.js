import React from 'react';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./modules/Home";
import Layout from "./Layout";
import Login from "./modules/Login";
import SignUp from "./modules/SignUp";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

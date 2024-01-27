import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Layout from "./Layout";
import Login from "./components/Login";
import Profile from './components/Profile';
import SignUp from "./components/SignUp";
import axios from "axios";


function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      fetchUserInfo(id);
    }
  }, []);

  const fetchUserInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/uzytkownicy/${id}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile userInfo={userInfo} />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

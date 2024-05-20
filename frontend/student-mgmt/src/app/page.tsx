"use client"
import React from 'react';

import LoginForm from "@/components/login/LoginForm"

const Home = () => (
  <div className="App">
    <div className='w-full h-screen flex justify-center items-center'>
      <LoginForm/>
    </div>
  </div>
);

export default Home;
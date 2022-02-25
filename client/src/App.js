import React, { useState } from 'react';
import {Route , Routes , BrowserRouter as Router} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ArticleFull from './components/Dashboard/ArticleFull'

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/login" 
        element={<Login />}/>

        <Route exact path="/register" 
        element={<Register />}/>

        <Route exact path="/content/:postId" 
        element={<ArticleFull />}/>

        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App;

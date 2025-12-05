import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ExpenseTracker from "./ExpenseTracker";
import FuturePlan from "./FuturePlan";
import Yogi from "./Yogi";
import Managefinace from "./Managefinace";

const App: React.FC = () => {
  return (
    <div>
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-finances" element={<Managefinace />} />
        <Route path ="/yogi" element={<Yogi />} />
        
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
         <Route path="/future-plan" element={<FuturePlan />} />
        

      </Routes>
    </div>
  );
};

export default App;

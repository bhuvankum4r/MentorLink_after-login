import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlidingPanel from "./components/SlidingPanel"; // Ensure the correct import path

function App() {
  return (
    <div>
      <SlidingPanel />
    </div>
  );
}

export default App;

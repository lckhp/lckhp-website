import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import RegisterRedirect from "./components/RegisterRedirect";
import Calendar from "./components/Calendar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterRedirect />} />
          <Route path="/2425/*" element={<GenericRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

const GenericRoutes = () => {
  return (
    <Routes>
      <Route path="calendar" element={<Calendar />} />
      {/* Add more nested routes here */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

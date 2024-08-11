import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";


const GenericRoutes: React.FC<{ year: string }> = ({ year }) => {
  return (
    <Routes>
      <Route path="calendar" element={<Calendar year={year} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:year/*" element={<YearRoutes />} />
        </Routes>
      </div>
    </Router>
  );
};

const YearRoutes: React.FC = () => {
  const { year } = useParams<{ year: string }>(); 
  if (!year) {
    return <NotFound />; 
  }

  return <GenericRoutes year={year} />;
};
export default App;

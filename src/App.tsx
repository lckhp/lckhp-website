import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/2425/calendar" element={<Calendar year="2425" />} />
        <Route path="/:year/*" element={<YearRoutes />} />
      </Routes>
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

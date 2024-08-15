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
import Resources from "./pages/Resources";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resources" element={<Resources />} />
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

const GenericRoutes: React.FC<{ year: string }> = ({ year }) => {
  return (
    <Routes>
      <Route path="calendar" element={<Calendar year={year} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

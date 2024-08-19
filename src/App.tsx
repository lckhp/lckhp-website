import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Calendar = lazy(() => import("./pages/Calendar"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Register = lazy(() => import("./pages/Register"));
const Resources = lazy(() => import("./pages/Resources"));
const Members = lazy(() => import("./pages/Members"));
const MemberProfile = lazy(() => import("./pages/MemberProfile"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/:year/*" element={<YearRoutes />} />
        </Routes>
      </Suspense>
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

const GenericRoutes: React.FC<{ year: string }> = ({ year }) => {
  return (
    <Routes>
      <Route path="calendar" element={<Calendar year={year} />} />
      <Route path="members" element={<Members year={year} />} />
      <Route path="members/:id" element={<MemberProfile />} />{" "}
      {/* New Profile Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

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
const ReportRedirect = lazy(() => import("./pages/ReportRedirect"));
const District325R = lazy(() => import("./pages/District325R"));
const Redirect = lazy(() => import("./pages/Redirect"));
const CertificateView = lazy(() => import("./pages/CertificateView"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/club-assets"
            element={<Redirect page="club-assets" />}
          />
          <Route path="/:year/*" element={<YearRoutes />} />
          <Route path="/325r/*" element={<District325R />} />
          <Route path="/verify/:uuid" element={<CertificateView />} />
          <Route path="*" element={<NotFound />} />
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
      <Route path="members/:id" element={<MemberProfile />} />
      <Route
        path="secretary/report/:month"
        element={<ReportRedirect role="secretary" />}
      />
      <Route
        path="treasurer/report/:month"
        element={<ReportRedirect role="treasurer" />}
      />
      <Route
        path="tail-twister/report/:month"
        element={<ReportRedirect role="tail-twister" />}
      />
      {year === "2425" && (
        <Route
          path="members-contact-info"
          element={<Redirect page="members-contact-info" />}
        />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

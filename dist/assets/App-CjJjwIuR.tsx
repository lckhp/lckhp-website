import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import PageSkeleton from "./components/PageSkeleton";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Programs = lazy(() => import("./pages/Programs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Register = lazy(() => import("./pages/Register"));
const Resources = lazy(() => import("./pages/Resources"));
const Members = lazy(() => import("./pages/Members"));
const MemberProfile = lazy(() => import("./pages/MemberProfile"));
const ReportRedirect = lazy(() => import("./pages/ReportRedirect"));
const District325R = lazy(() => import("./pages/District325R"));
const Redirect = lazy(() => import("./pages/Redirect"));
const CertificateView = lazy(() => import("./pages/CertificateView"));
// const Directory = lazy(() => import("./pages/Directory"));
const DonateCategory = lazy(() => import("./pages/DonateCategory"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Donate = lazy(() => import("./pages/Donate"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [skeletonType, setSkeletonType] = useState<string>("default");

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);

    // Determine skeleton type based on the current route
    const path = location.pathname;

    if (path === "/" || path === "") {
      setSkeletonType("home");
    } else if (path.includes("calendar")) {
      setSkeletonType("calendar");
    } else if (path.includes("members")) {
      setSkeletonType("members");
    } else if (path.includes("resources")) {
      setSkeletonType("resources");
    } else {
      setSkeletonType("default");
    }
  }, [location]);

  return (
    <Suspense fallback={<PageSkeleton type={skeletonType as any} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources-page" element={<NotFound />} />
        <Route path="/directory" element={<Navigate to="/donate" replace />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route
          path="/directory/blood-bank"
          element={<Navigate to="/donate/blood-bank" replace />}
        />
        <Route
          path="/directory/blood-banks"
          element={<Navigate to="/donate/blood-bank" replace />}
        />
        <Route
          path="/directory/old-age-homes"
          element={<Navigate to="/donate/old-age-homes" replace />}
        />
        <Route
          path="/directory/orphanages"
          element={<Navigate to="/donate/orphanages" replace />}
        />
        <Route
          path="/donate/blood-bank"
          element={<DonateCategory category="blood_bank" />}
        />
        <Route
          path="/donate/blood-banks"
          element={<DonateCategory category="blood_bank" />}
        />
        <Route
          path="/donate/old-age-homes"
          element={<DonateCategory category="old_age_home" />}
        />
        <Route
          path="/donate/orphanages"
          element={<DonateCategory category="orphanage" />}
        />
        <Route
          path="/donate/urgent-needs"
          element={<DonateCategory category="urgent_needs" />}
        />
        <Route
          path="/donate/organizations"
          element={<DonateCategory category="organization" />}
        />
        <Route path="/club-assets" element={<Redirect page="club-assets" />} />
        <Route path="/:year/*" element={<YearRoutes />} />
        <Route path="/325r/*" element={<District325R />} />
        <Route path="/verify/:uuid" element={<CertificateView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
      <Route path="programs" element={<Programs year={year} />} />
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

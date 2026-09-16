import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MPDashboard from "./pages/MPDashboard";
import MPProjects from "./pages/mp/MPProjects";
import MPProjectDetail from "./pages/mp/MPProjectDetail";
 import ConstituencyPage from "./pages/ConstituencyPage";

import DAOverview from "./pages/da/DAOverview";
import DAProjectMonitoring from "./pages/da/DAProjectMonitoring";
import DAAIAlerts from "./pages/da/DAAIAlerts";
import DAProjectAnalysis from "./pages/da/DAProjectAnalysis";
import DAProjectDetail from "./pages/da/DAProjectDetail";
import DAReports from "./pages/da/DAReports";
import DAReportDetail from "./pages/da/DAReportDetail";
import ProfilePage from "./pages/da/ProfilePage";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* MP dashboard */}
      <Route path="/dashboard" element={<MPDashboard />} />
      <Route path="/dashboard/projects" element={<MPProjects />} />
      <Route path="/dashboard/projects/:projectId" element={<MPProjectDetail />} />
      <Route path="/dashboard/constituency" element={<ConstituencyPage />}/>

      {/* District Authority dashboard */}
      <Route path="/da/dashboard" element={<DAOverview />} />
      <Route path="/da/projects" element={<DAProjectMonitoring />} />
      <Route path="/da/projects/:projectId" element={<DAProjectDetail />} />
      <Route path="/da/alerts" element={<DAAIAlerts />} />
      <Route path="/da/alerts/:projectId" element={<DAProjectAnalysis />} />
      <Route path="/da/reports" element={<DAReports />} />
      <Route path="/da/reports/:reportId" element={<DAReportDetail />} />

      <Route path="/ida/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
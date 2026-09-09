import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MPDashboard from "./pages/MPDashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ConstituencyPage from "./pages/ConstituencyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={<MPDashboard />} />
      <Route path="/dashboard/projects" element={<ProjectsPage />} />
      <Route path="/dashboard/constituency" element={<ConstituencyPage />} />
      
    </Routes>
  );
}

export default App;
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import ResumeBuilder from './pages/ResumeBuilder';
import LandingPageES from './pages/LandingPageES';
import RoleSelectionES from './pages/RoleSelectionES';
import ResumeBuilderES from './pages/ResumeBuilderES';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <Router>
      <Routes>
        {/* English routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/role-selection"
          element={<RoleSelection onRoleSelect={setSelectedRole} />}
        />
        <Route
          path="/builder"
          element={<ResumeBuilder selectedRole={selectedRole} />}
        />

        {/* Spanish routes */}
        <Route path="/es" element={<LandingPageES />} />
        <Route
          path="/es/role-selection"
          element={<RoleSelectionES onRoleSelect={setSelectedRole} />}
        />
        <Route
          path="/es/builder"
          element={<ResumeBuilderES selectedRole={selectedRole} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

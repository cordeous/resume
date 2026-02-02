import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/role-selection"
          element={<RoleSelection onRoleSelect={setSelectedRole} />}
        />
        <Route
          path="/builder"
          element={<ResumeBuilder selectedRole={selectedRole} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

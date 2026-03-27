import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toast from './components/Toast';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const RoleSelection = lazy(() => import('./pages/RoleSelection'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const LandingPageES = lazy(() => import('./pages/LandingPageES'));
const RoleSelectionES = lazy(() => import('./pages/RoleSelectionES'));
const ResumeBuilderES = lazy(() => import('./pages/ResumeBuilderES'));

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
    <div style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Loading…</div>
  </div>
);

function App() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <Toast />
    </Router>
  );
}

export default App;

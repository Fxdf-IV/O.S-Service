import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import HomePage from './pages/HomePage.tsx';
import AdminUserManagement from './pages/AdminUserManagement.tsx';
import CreateTicketPage from './pages/CreateTicketPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/create-ticket" element={<CreateTicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage.tsx'; 
import RegisterPage from './pages/RegisterPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-user" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
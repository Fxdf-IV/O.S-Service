import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage.tsx'; 
// import HomePage from './pages/HomePage'; 
// import CreateTicketPage from './pages/CreateTicketPage';
// import UpdateTicketPage from './pages/UpdateTicketPage';
// import RegisterPage from './pages/RegisterPage.tsx';
// import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/home" element={<HomePage />} />
        <Route path="/create-ticket" element={<CreateTicketPage />} />
        <Route path="/update-ticket" element={<UpdateTicketPage />} />
        <Route path="/create-user" element={<RegisterPage />} />
        <Route path="/reports" element={<ReportsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TicketForm } from './pages/TicketPage/components/TicketForm';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Criando um tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<TicketForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

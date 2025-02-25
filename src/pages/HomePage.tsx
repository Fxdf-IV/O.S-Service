import { useNavigate } from "react-router-dom";
import { buttonStyle } from '../styles/styles.tsx';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h1>Página Inicial</h1>
      <p>Bem-vindo ao sistema de O.S Service!</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          onClick={() => navigate("/create-ticket")} 
          style={buttonStyle}
        >
          Criar Novo Ticket
        </button>
        
        <button 
          onClick={() => navigate("/admin/users")} 
          style={buttonStyle}
        >
          Gerenciar Usuários
        </button>
        
        <button 
          onClick={() => navigate("/login")} 
          style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default HomePage;

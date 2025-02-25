import { useNavigate } from "react-router-dom";
import { buttonStyle } from '../styles/styles.tsx';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <><div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hello!</h1>
    </div>

    <button 
    onClick={() => navigate("/admin-user-management")}
    style={{ ...buttonStyle, backgroundColor: '#666' }}>
      Gerenciamento de Cadastros
    </button></>
  );
};

export default HomePage;

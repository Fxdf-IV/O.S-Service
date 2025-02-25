import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputStyle, buttonStyle } from '../styles/styles.tsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");         // Redireciona para o HomePage
      } else {
        setError(data.message || "Erro no login");
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);           // Finaliza o estado de loading
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <br /><br />
        
        <button 
          type="submit" 
          style={{ ...buttonStyle, backgroundColor: '#666' }}
          disabled={loading}> {loading ? "Aguarde" : "Entrar"}
        </button>
      </form>

      <br /><br />

        <button 
          type="button" 
          onClick={() => navigate("/register-page")}
          style={{ ...buttonStyle, backgroundColor: '#666' }}>
          Cadastrar
        </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
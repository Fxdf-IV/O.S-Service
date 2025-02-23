import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const serverResponse = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginResponse = await serverResponse.json();

      if (serverResponse.ok) {
        alert("Login bem-sucedido!");
      }
      setError(loginResponse.message);

    } catch (error: any) {
      console.error("Erro ao conectar com o servidor:", error);
      setError("Erro ao conectar com o servidor (" +error + ")");
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/RegisterPage");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
          required
        />
        <br />
        <button type="submit">Entrar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <p>Não possui cadastro? Cadastre-se aqui:</p>
      <button type="button" onClick={handleNavigateToRegister}>Cadastrar</button>
    </div>
  );
};

export default LoginPage;

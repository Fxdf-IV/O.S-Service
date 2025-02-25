import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from "react-input-mask";
import { inputStyle, selectStyle, buttonStyle , labelStyle } from '../styles/styles.tsx';

interface Department {
  id_departament: number;
  name_departament: string;
}

interface Location {
  id_location: number;
  address_location: string;
  room: string;
}

interface Ramal {
  ramal_number: number;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    user_password: '',
    cellphone_number: '',
    user_departament_id: '',
    ramal_user_number: '',
    id_user_location: '',
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [ramals, setRamals] = useState<Ramal[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('RegisterPage mounted - Fetching data...');
    const fetchData = async () => {
      try {
        // Buscar departamentos
        console.log('Fetching departments...');
        const deptResponse = await fetch('/api/departments');
        if (deptResponse.ok) {
          const deptData = await deptResponse.json();
          console.log('Departments data:', deptData);
          setDepartments(deptData);
        } else {
          console.error('Failed to fetch departments:', deptResponse.status);
        }

        // Buscar localizações
        console.log('Fetching locations...');
        const locResponse = await fetch('/api/locations');
        if (locResponse.ok) {
          const locData = await locResponse.json();
          console.log('Locations data:', locData);
          setLocations(locData);
        } else {
          console.error('Failed to fetch locations:', locResponse.status);
        }

        // Buscar ramais
        console.log("Fetching ramals...");
        const ramalResponse = await fetch("/api/ramals");
        if (ramalResponse.ok) {
          const ramalData = await ramalResponse.json();
          console.log("Ramals data:", ramalData);
          setRamals(ramalData);
        } else {
          console.error("Failed to fetch ramals:", ramalResponse.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Erro ao carregar dados. Por favor, tente novamente.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === "ramal_user_number" ? value.replace(/\D/g, "") : value;

    setFormData({ ...formData, [e.target.name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setError('');
    setSuccess('');

    try {
      console.log('Sending request to /register endpoint...');
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setSuccess(data.message || 'Usuário registrado com sucesso!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        // Mostrar mensagem de erro específica do servidor se disponível
        setError(data.message || data.error || 'Erro ao registrar usuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro de Usuário</h2>

      {error && (
        <div style={{ color: 'red', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ color: 'green', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="user_name" style={labelStyle}>Nome Completo:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="user_password" style={labelStyle}>Senha:</label>
          <input
            type="password"
            id="user_password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="cellphone_number" style={labelStyle}>Celular:</label>
          <InputMask
            mask="(99) 99999-9999"
            placeholder="(00) 00000-0000"
            id="cellphone_number"
            name="cellphone_number"
            value={formData.cellphone_number}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="ramal_user_number" style={labelStyle}>Ramal:</label>
          <input
            type="text"
            id="ramal_user_number"
            name="ramal_user_number"
            value={formData.ramal_user_number}
            onChange={handleChange}
            required
            placeholder="Digite seu ramal"
            maxLength={5}
            style={inputStyle}
          />

          {/* Lista de ramais */}
          {ramals.length > 0 && (
            <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
              <p>Ramais disponíveis:</p>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {ramals.map((ramal) => (
                  <li key={ramal.ramal_number} style={{ marginBottom: "4px" }}>
                    {ramal.ramal_number}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="user_departament_id" style={labelStyle}>Departamento:</label>
          <select
            id="user_departament_id"
            name="user_departament_id"
            value={formData.user_departament_id}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Selecione um departamento</option>
            {departments.map((dept) => (
              <option key={dept.id_departament} value={dept.id_departament}>
                {dept.name_departament}
              </option>
            ))}
          </select>
        </div>


        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="id_user_location" style={labelStyle}>Localização:</label>
          <select
            id="id_user_location"
            name="id_user_location"
            value={formData.id_user_location}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="">Selecione uma localização</option>
            {locations.map((loc) => (
              <option key={loc.id_location} value={loc.id_location}>
                {`${loc.address_location} - Sala ${loc.room}`}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button type="submit" style={buttonStyle}>
            Registrar
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/login')}
            style={{ ...buttonStyle, backgroundColor: '#666' }}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};


export default RegisterPage;
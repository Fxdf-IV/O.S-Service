import { useState, useEffect } from 'react';

interface User {
  id: number;
  user_name: string;
  email: string;
  user_status: string;
  cellphone_number: string;
  created_at: string;
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/pending');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError('Erro ao carregar usuários');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    }
  };

  const handleUserAction = async (userId: number, status: string, role?: string) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, role }),
      });

      if (response.ok) {
        setSuccess('Status do usuário atualizado com sucesso');
        fetchUsers(); // Recarregar lista de usuários
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao atualizar status do usuário');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Gerenciamento de Usuários</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Nome</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Celular</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>Data de Registro</th>
            <th style={tableHeaderStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={tableCellStyle}>{user.user_name}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>{user.cellphone_number}</td>
              <td style={tableCellStyle}>{user.user_status}</td>
              <td style={tableCellStyle}>
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td style={tableCellStyle}>
                {user.user_status === 'pending' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                      onChange={(e) => handleUserAction(user.id, 'active', e.target.value)}
                      style={selectStyle}
                    >
                      <option value="">Selecione o cargo</option>
                      <option value="user">Usuário</option>
                      <option value="technician">Técnico</option>
                      <option value="admin">Administrador</option>
                    </select>
                    <button
                      onClick={() => handleUserAction(user.id, 'rejected')}
                      style={rejectButtonStyle}
                    >
                      Rejeitar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f5f5f5',
  padding: '12px',
  textAlign: 'left' as const,
  borderBottom: '2px solid #ddd',
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

const selectStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const rejectButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AdminUserManagement;

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold' as const
  };
  
  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  };
  
  const selectStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: 'white'
};
  
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
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

  const rejectButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

// Exportando os estilos
export { labelStyle, inputStyle, selectStyle, buttonStyle, tableHeaderStyle, tableCellStyle, rejectButtonStyle };
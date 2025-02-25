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

  // Estilos para CreateTicketPage
  const containerStyle = {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  };

  const fullWidthStyle = {
    gridColumn: '1 / span 2'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  };

  const errorAlertStyle = {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px'
  };

  const modalOverlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    width: '400px',
    maxWidth: '90%'
  };

  const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d'
  };

  const helperTextStyle = {
    display: 'block',
    marginTop: '5px',
    color: '#666',
    fontSize: '12px'
  };

// Exportando os estilos
export { labelStyle, inputStyle, selectStyle, buttonStyle, tableHeaderStyle, tableCellStyle, rejectButtonStyle, 
  containerStyle, cardStyle, gridContainerStyle, fullWidthStyle, buttonContainerStyle, errorAlertStyle,
  modalOverlayStyle, modalContentStyle, modalButtonsStyle, secondaryButtonStyle, helperTextStyle };
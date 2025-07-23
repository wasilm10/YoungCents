import React from 'react';

const Input = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label><br />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: '8px',
          width: '100%',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default Input;

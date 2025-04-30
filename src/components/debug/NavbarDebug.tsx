import React from 'react';

const NavbarDebug: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '20px',
      background: 'red',
      color: 'white',
      padding: '10px',
      zIndex: 9999,
      borderRadius: '5px',
      fontWeight: 'bold'
    }}>
      NAVBAR DEBUG ACTIVE
    </div>
  );
};

export default NavbarDebug; 
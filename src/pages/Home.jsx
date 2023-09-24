import React from 'react';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;
const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={containerStyle}>
      <Title>Welcome to Saveur!</Title>
      <Paragraph style={{ fontSize: '1.5rem' }}>
        Keep your connections closer. Get started by logging in!
      </Paragraph>
    </div>
  );
};

export default Home;

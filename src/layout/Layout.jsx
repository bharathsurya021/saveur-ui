import React from 'react';
import AppHeader from '../components/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Content } = Layout;
const AppLayout = () => {
  return (
    <Layout>
      <AppHeader />
      <ToastContainer />
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#edede9',
          width: '100%',
          height: '92vh',
          margin: '0 auto',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;

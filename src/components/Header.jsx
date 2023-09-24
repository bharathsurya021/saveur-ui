import React from 'react';
import { Button, Layout } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/slices/userApiSlice';
import { logout } from '../redux/slices/authSlice';
const { Header } = Layout;

const AppHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutHandler] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutHandler().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: '#fff', fontSize: '2rem' }}>
        <Link style={{ color: '#fff' }} to={userInfo ? '/dashboard' : '/home'}>
          Saveur
        </Link>
      </h1>
      {userInfo ? (
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button icon={<UserOutlined />}>
          <Link to={'/login'}>Login/Register</Link>
        </Button>
      )}
    </Header>
  );
};

export default AppHeader;

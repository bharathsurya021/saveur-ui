import React, { useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/slices/userApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '92vh',
        width: '480px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '480px',
          height: '400px',
          padding: '4rem',
          backgroundColor: '#fff',
        }}
      >
        <Title level={3} style={{ marginBottom: '1rem' }}>
          Login
        </Title>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input
              placeholder="Email"
              style={{ height: '48px', fontSize: '16px', padding: '12px' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
              {
                min: 5,
                message: 'Password must be at least 5 characters long!',
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              style={{ height: '48px', fontSize: '16px', padding: '12px' }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ height: '48px', fontSize: '16px' }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}
        >
          Not registered yet? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../redux/slices/authSlice';
import { useUpdateUserMutation } from '../redux/slices/userApiSlice';
const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { token } = userInfo;
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        name: userInfo.name,
        email: userInfo.email,
      });
    }
  }, [userInfo, form]);

  const onFinish = async (values) => {
    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error('Passwords must match');
    } else {
      try {
        const res = await updateProfile(
          {
            _id: userInfo._id,
            name: name,
            email: email,
          },
          token
        ).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
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
          padding: '4rem',
          backgroundColor: '#fff',
        }}
      >
        <Title level={3} style={{ marginBottom: '1rem' }}>
          My Profile
        </Title>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter your name!',
              },
            ]}
          >
            <Input
              placeholder="Name"
              style={{ height: '48px', fontSize: '16px', padding: '12px' }}
            />
          </Form.Item>
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
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                message: 'Please enter your password!',
              },
              {
                min: 5,
                message: 'Password must be at least 5 characters long!',
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
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
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;

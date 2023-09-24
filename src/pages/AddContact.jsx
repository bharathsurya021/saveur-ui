import React, { useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setContacts } from '../redux/slices/contactSlice';
import { useCreateContactMutation } from '../redux/slices/contactApiSlice';

const { Title } = Typography;

const AddContact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addContact, { isLoading }] = useCreateContactMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    const { name, email, phone } = values;

    try {
      const res = await addContact({ name, email, phone }).unwrap();
      dispatch(setContacts({ ...res }));
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    toast.success('Added to contacts');
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
          Create New Contact
        </Title>
        <Form onFinish={onFinish}>
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
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please enter your valid phone number!',
              },
              {
                min: 10,
                message: 'Password must be at least 10 characters long!',
              },
            ]}
          >
            <Input
              placeholder="Phone Number"
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
              Create Contact
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddContact;

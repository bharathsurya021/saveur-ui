import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateContact } from '../redux/slices/contactSlice';
import {
  useGetContactDetailsQuery,
  useUpdateContactDetailsMutation,
} from '../redux/slices/contactApiSlice';

const { Title } = Typography;

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: contact, refetch } = useGetContactDetailsQuery(id);
  const [updateContactDetail] = useUpdateContactDetailsMutation(id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!contact) {
      refetch();
    }
  }, [contact]);

  const onFinish = async (values) => {
    const { name, email, phone } = values;

    try {
      setIsLoading(true);
      const res = await updateContactDetail({
        name,
        email,
        phone,
        _id: id,
      }).unwrap();
      dispatch(updateContact({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setIsLoading(false);
    }
    navigate('/dashboard');
    toast.success('Updated successfully');
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
          Edit Contact
        </Title>
        <Form onFinish={onFinish} initialValues={{ ...contact }}>
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
                message: 'Phone number must be at least 10 characters long!',
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
              loading={isLoading}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditContact;

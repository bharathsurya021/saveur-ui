import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const EditContactModal = ({ open, onCancel, onOk, initialValues }) => {
  return (
    <Modal
      title="Edit Contact"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" type="dander" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={onOk}>
          Save
        </Button>,
      ]}
    >
      <Form initialValues={initialValues}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter an email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please enter a phone number' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditContactModal;

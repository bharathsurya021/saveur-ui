import React from 'react';
import { Modal, Button } from 'antd';

const DeleteContactModal = ({ open, onCancel, onOk, contactData }) => {
  const { name, email, phone } = contactData;
  return (
    <Modal
      title="Are you sure you want to delete this contact?"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" type="primary" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          style={{ backgroundColor: 'red' }}
          onClick={onOk}
        >
          Confirm
        </Button>,
      ]}
    >
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </Modal>
  );
};

export default DeleteContactModal;

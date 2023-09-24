import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../redux/slices/contactApiSlice';
import { Table, Button, Space, Input } from 'antd'; // Import Input from 'antd'
import { setContacts, deleteContact } from '../redux/slices/contactSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteContactModal from '../components/DeleteContactModal';
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(''); // Step 1

  const { data, isLoading, error, refetch } = useGetContactsQuery();
  const [removeContact, { isLoading: loadingDelete }] =
    useDeleteContactMutation();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editedData, setEditedData] = useState({});
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '100',
      fixed: 'left',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: 'red' }}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record) => {
    setEditedData(record);
    setIsEditVisible(!isEditVisible);
  };

  const handleReload = () => {
    refetch();
  };

  const handleEdit = (record) => {
    navigate(`/contact/${record._id}`);
  };

  const handleCancel = () => {
    setIsEditVisible(!isEditVisible);
  };

  const handleOk = () => {
    setIsEditVisible(!isEditVisible);
    removeContact(editedData._id)
      .unwrap()
      .then(() => {
        dispatch(deleteContact(editedData._id));
        refetch();
        toast.success('Contact deleted successfully.');
      })
      .catch((err) => {
        toast.error(err?.data?.message || err.error);
      });
  };

  const handleAdd = () => {
    navigate('/contact');
  };

  useEffect(() => {
    dispatch(setContacts({ ...data }));
    refetch();
  }, [setContacts, data]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData =
    data &&
    data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchInput.toLowerCase())
    );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '92vh',
        width: '100%',
        padding: '2rem 4rem',
      }}
    >
      <div style={{ marginBottom: 16, alignSelf: 'flex-start' }}>
        <Space size={'large'}>
          <Input.Search
            size="large"
            placeholder="Search by for ..."
            enterButton="Search"
            value={searchInput}
            allowClear
            onChange={handleSearch}
          />
          <Button size="large" type="primary" onClick={handleReload}>
            Refresh
          </Button>

          <Button size="large" type="primary" onClick={handleAdd}>
            Create Contact
          </Button>
        </Space>
      </div>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <Table
          style={{ minWidth: '600px' }}
          columns={columns}
          dataSource={filteredData} // Step 3: Use filteredData
          loading={isLoading}
          rowKey={(record) => record.name}
        />
      </div>
      <DeleteContactModal
        open={isEditVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        contactData={editedData}
      />
    </div>
  );
};

export default Dashboard;

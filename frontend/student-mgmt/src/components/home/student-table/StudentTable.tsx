import React, { useEffect, useState } from 'react';
import { Button, Space, Table, message, Modal, Form, Input } from 'antd';
import type { TableProps } from 'antd';


interface DataType {
  key: string;
  name: string;
  age: number;
  dob: string;
  email: string;
}

const BASE_URL: string = "http://localhost:3002";



const fetchStudent = async () => {
  try {
    var token = localStorage.getItem('token') || null;
    const response = await fetch(`${BASE_URL}/api/v1/student/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    message.error(error.message || 'Error fetching students');
  }
};

const searchStudent = async (query: string) => {
  try {
    var token = localStorage.getItem('token') || null;
    const isEmail = query.includes('@');
    const paramKey = isEmail ? 'email' : 'name';
    const response = await fetch(`${BASE_URL}/api/v1/student/search?${paramKey}=${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to search students');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    message.error(error.message || 'Error searching students');
  }
};

const createStudent = async (formData: any, setReFetch: React.Dispatch<React.SetStateAction<boolean>>, setIsCreateModalVisible: (visible: boolean) => void, roleId: string, createForm: any) => {
  try {
    var token = localStorage.getItem('token') || null;
    const storedData = localStorage.getItem('credential') || '{}';
    const adminData = JSON.parse(storedData);
    const { admin_id } = adminData;

    const studentData = {
      ...formData,
      role_id: roleId,
      admin_id,
    };

    const response = await fetch(`${BASE_URL}/api/v1/student/create`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (response.ok) {
      message.success('Student created successfully');
      setReFetch((prevState: boolean) => !prevState);
      setIsCreateModalVisible(false);
      createForm.resetFields(); 
    } else {
      const responseData = await response.json();
      if (responseData.errors && responseData.errors.length > 0) {
        const errorMessage = responseData.errors.map((error: any) => error.msg).join(', ');
        message.error(errorMessage);
      } else {
        message.error(responseData.message || 'Failed to create student');
      }
    }
  } catch (error: any) {
    console.error(error);

  
    message.error(error.message || 'Failed to create student');
  }
};


const fetchRoles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/roles/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch roles');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    message.error(error.message || 'Error fetching roles');
  }
};

const updateStudent = async (id: string, setFormData: (data: any) => void, setIsModalVisible: (visible: boolean) => void, form: any) => {
  var token = localStorage.getItem('token') || null;
  const response = await fetch(`${BASE_URL}/api/v1/student/?student_id=${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch student information');
  } else {
    const responseData = await response.json();
    setFormData(responseData);
    form.setFieldsValue(responseData);
    setIsModalVisible(true);
  }
};

const deleteStudent = async (id: string, setReFetch: React.Dispatch<React.SetStateAction<boolean>>) => {
  var token = localStorage.getItem('token') || null;
  try {
    const response = await fetch(`${BASE_URL}/api/v1/student/delete?student_id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      
      message.success('Deleted successfully');
      setReFetch((prevState: boolean) => !prevState);
    }else {
    
      const responseData = await response.json(); 
      message.error(responseData.message || 'Failed to delete student ');
    }
  } catch (error: any) {
    message.error(error.message || 'Failed to delete student');
  }
};

const updateStudentData = async (id: string, formData: any, setReFetch: React.Dispatch<React.SetStateAction<boolean>>, setIsModalVisible: (visible: boolean) => void) => {
  var token = localStorage.getItem('token') || null;
  console.log(token)
  try {
    
    const response = await fetch(`${BASE_URL}/api/v1/student/update/?student_id=${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      message.success('Updated successfully');
      setReFetch((prevState: boolean) => !prevState);
      setIsModalVisible(false);
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.errors && responseData.errors.length > 0
        ? responseData.errors[0].msg
        : responseData.message || 'Failed to update student test';
      message.error(errorMessage);
    }
  } catch (error: any) {
    console.log("errr", error);
    message.error(error.message || 'Failed to update student test');
  }
};


const StudentTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [reFetch, setReFetch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleId, setRoleId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchStudent();
        setData(res);
      } catch (error) {
        message.error('Failed to fetch students');
      }
    };

    fetchData();
  }, [reFetch]);

  useEffect(() => {
    const fetchRoleId = async () => {
      try {
        const roles = await fetchRoles();
        const studentRole = roles.find((role: any) => role.role_name === 'student');
        if (studentRole) {
          setRoleId(studentRole.role_id);
        }
      } catch (error) {
        message.error('Failed to fetch roles');
      }
    };

    fetchRoleId();
  }, []);

  const handleUpdate = (id: string) => {
    updateStudent(id, setFormData, setIsModalVisible, form);
  };

  const handleFormSubmit = (values: any) => {
    updateStudentData(formData.student_id, values, setReFetch, setIsModalVisible);
  };

  const handleCreateFormSubmit = (values: any) => {
    createStudent(values, setReFetch, setIsCreateModalVisible, roleId, createForm);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCreateCancel = () => {
    createForm.resetFields();
    setIsCreateModalVisible(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      try {
        const res = await fetchStudent();
        setData(res);
        message.success('Fetched all students');
      } catch (error) {
        message.error('Failed to fetch students');
      }
      return;
    }

    try {
      const results = await searchStudent(searchQuery);
      setData(results);
    } catch (error) {
      message.error('Failed to search students');
    }
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record.student_id)} type='primary'>Update</Button>
          <Button onClick={() => deleteStudent(record.student_id, setReFetch)} type='primary' danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          Create Student
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Update Student"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={formData}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />

          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input the age!' }]}
          >
            <Input />

          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please input the date of birth!' }]}
          >
            <Input />

            
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Create Student"
        visible={isCreateModalVisible}
        onCancel={handleCreateCancel}
        footer={null}
      >
        <Form
          form={createForm}
          onFinish={handleCreateFormSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input the age!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please input the date of birth!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StudentTable;

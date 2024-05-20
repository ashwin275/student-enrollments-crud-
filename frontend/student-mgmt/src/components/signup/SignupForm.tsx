'use client';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Spin, Typography, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Option } = Select;
const { Title } = Typography;
const baseUrl = "http://localhost:3002/";

const SignUpForm: React.FC = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm(); 
    const router = useRouter(); 

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`${baseUrl}api/v1/roles/`);
                if (response.ok) {
                    const data = await response.json();
                    setRoles(data);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch roles');
                }
            } catch (error) {
                setLoading(false);
                message.error('Error fetching roles');
                console.error('Error:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch(`${baseUrl}api/v1/admin/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const responseData = await response.json();

            if (response.ok) {
                form.resetFields(); 
                message.success("Created Successfully");
                router.replace('/'); 
            } else {
                if (responseData.errors && responseData.errors.length > 0) {
                    const formErrors = responseData.errors.map((error: any) => ({
                        name: error.path,
                        errors: [error.msg]
                    }));
                    form.setFields(formErrors);
                } else {
                    message.error(responseData.message || 'Error submitting form');
                }
            }
        } catch (error: any) {
            message.error(error.message || 'Error submitting form');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            {loading ? ( 
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            ) : (
                <Form
                    form={form} 
                    id='sign-up'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    style={{ maxWidth: 900, backgroundColor: "#FAFAFA", padding: "2rem", borderRadius: "20px" }}
                    onFinish={handleSubmit}
                >
                    <Title level={3} className='flex justify-center py-5'>Sign Up</Title>

                    <Form.Item key="name" label="Name" name="name" rules={[{ required: true, message: 'Please enter name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        key="email"
                        rules={[{ required: true, message: 'Please enter email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item key="role" label="Role" name="role_id" rules={[{ required: true, message: 'Please select role' }]}>
                        <Select>
                            {roles.map((role: any) => (
                                <Option key={role.role_id} value={role.role_id}>{role.role_name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        key="password"
                        rules={[{ required: true, message: 'Please enter password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <p className='text-center'>Already have an account ? <Link href={"/"}>Login</Link></p>
                </Form>
            )}
        </div>
    );
};

export default SignUpForm;

"use client"
import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Typography } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title } = Typography;
const baseUrl = "http://localhost:3002/";

type FieldType = {
  email?: string;
  password?: string;
};


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm(); 

  const router = useRouter()

  const onFinish = async (values: any) => {  
    setLoading(true)  
    try {
        const response = await fetch(`${baseUrl}api/v1/admin/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const responseData = await response.json();
        setLoading(false);

        if (response.ok) {
            form.resetFields(); 
            localStorage.setItem('token', responseData.token)
            console.log(responseData.user)
            console.log(responseData)
            const userObject = responseData.user;
            localStorage.setItem("credential", JSON.stringify(userObject));
            message.success("Login Successfully");
            router.replace('/home'); 
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
    setLoading(false);
};

  return (
    <Form
      form={form} 
      id='login'
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 900, backgroundColor: "#FAFAFA", padding: "2rem", borderRadius: "20px" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={3} className='flex justify-center py-5'>Login</Title>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading}  type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <p className='text-center'>Create a new account ? <Link href={"/sign-up"}>Register</Link></p>

    </Form>
  )
};

export default LoginForm;
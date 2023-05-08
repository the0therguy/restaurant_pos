import React, {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import { Button, Checkbox, Form, Input } from 'antd';

const Signin = () => {
    const {data: session, status} = useSession()
    const {push} = useRouter()
    const router = useRouter()
    if (status === "loading") return <h1>Checking Authentication .....</h1>

    const onFinish = async (values) => {
        console.log('Success:', values);
        if (!values.username && !values.password) {
            return false
        }
        const status = await signIn('credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: "/"
        })
        console.log(status)
        if (status.ok) await router.push(status.url)

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Signin
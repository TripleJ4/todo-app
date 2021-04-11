import { Form, Input, Button } from "antd"

const LoginForm = ({ onFinish }) => {
  return (
    <Form onFinish={onFinish} size="large">
      <Form.Item name="email" rules={[{ type: "email" }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Account
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm

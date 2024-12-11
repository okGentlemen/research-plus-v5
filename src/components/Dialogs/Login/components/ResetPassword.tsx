import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { LeftOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useCountdown } from '../hooks/useCountdown';
import { loginRules } from '../const';

interface ResetPasswordProps {
  onBack: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onBack }) => {
  const [form] = Form.useForm();
  const { countdown, startCountdown } = useCountdown(60);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    try {
      const mobile = form.getFieldValue('mobile');
      if (!mobile || !/^1[3-9]\d{9}$/.test(mobile)) {
        return;
      }
      
      setLoading(true);
      // TODO: Implement send code logic
      startCountdown();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      // TODO: Implement reset password logic
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-header">
        <Button type="text" icon={<LeftOutlined />} onClick={onBack}>
          找回密码
        </Button>
      </div>

      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="mobile" rules={loginRules.mobile}>
          <Input placeholder="输入手机号" maxLength={11} />
        </Form.Item>

        <Form.Item name="code" rules={loginRules.code}>
          <div className="verify-code-input">
            <Input placeholder="6位短信验证码" maxLength={6} />
            <Button
              className="send-code-btn"
              disabled={countdown > 0}
              onClick={handleSendCode}
            >
              {countdown > 0 ? `${countdown}s后重发` : '发送验证码'}
            </Button>
          </div>
        </Form.Item>

        <Form.Item name="password" rules={loginRules.password}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="新密码，8-16位不包含中文和空格的密码"
            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            确定并登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
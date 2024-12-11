import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { loginRules } from '../const';
import { useAppDispatch } from '@/hooks';
import { passwordLogin } from '@/store/slices/user';

interface PasswordLoginProps {
  onForgotPassword: () => void;
  onClose?: () => void;
}

export const PasswordLogin: React.FC<PasswordLoginProps> = ({ 
  onForgotPassword,
  onClose 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [autoLoginChecked, setAutoLoginChecked] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any) => {
    if (!agreementChecked) {
      message.error('请阅读并同意用户协议和隐私政策');
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(passwordLogin({
        username: values.mobile,
        password: values.password
      })).unwrap();
      
      if (result?.code === 0 && result?.data) {
        message.success('登录成功');
        onClose?.();
      }
    } catch (error: any) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="password-login">
      <Form.Item name="mobile" rules={loginRules.mobile}>
        <Input 
          prefix={<UserOutlined />}
          placeholder="请输入手机号"
          maxLength={11}
        />
      </Form.Item>

      <Form.Item name="password" rules={loginRules.password}>
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="请输入密码"
          iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          登录
        </Button>
      </Form.Item>

      <div className="form-footer">
        <a onClick={onForgotPassword}>找回密码</a>
      </div>

      <div className="agreement">
        <Checkbox 
          checked={agreementChecked}
          onChange={(e) => setAgreementChecked(e.target.checked)}
        >
          我已阅读并同意ResearchPlus
          <a href="/agreement" target="_blank" rel="noopener noreferrer">用户协议</a>、
          <a href="/privacy" target="_blank" rel="noopener noreferrer">隐私政策</a>
        </Checkbox>
        <Checkbox 
          checked={autoLoginChecked}
          onChange={(e) => setAutoLoginChecked(e.target.checked)}
        >
          下次自动登录
        </Checkbox>
      </div>
    </Form>
  );
};
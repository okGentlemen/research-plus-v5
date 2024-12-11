import React, { useState, useCallback } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useCountdown } from "../hooks/useCountdown";
import { loginRules } from "../const";
import { useAppDispatch } from "@/hooks";
import { login } from "@/store/slices/user";
import { authApi } from "@/api/auth";
import { useTencentCaptcha } from "@/hooks/useTencentCaptcha";
import type { CaptchaResult } from "@/types/captcha";

interface PasswordLoginProps {
  onClose?: () => void;
}

export const MobileLogin: React.FC<PasswordLoginProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const { countdown, startCountdown } = useCountdown(60);
  const [loading, setLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { showCaptcha: showTencentCaptcha, isReady: isCaptchaReady } =
    useTencentCaptcha();

  const handleSendCode = useCallback(async () => {
    try {
      const mobile = form.getFieldValue("mobile");
      if (!mobile || !/^1[3-9]\d{9}$/.test(mobile)) {
        message.error("请输入正确的手机号");
        return;
      }

      if (!agreementChecked) {
        message.error("请阅读并同意用户协议和隐私政策");
        return;
      }

      setShowCaptcha(true);
    } catch (error) {
      console.error("Send code error:", error);
      message.error("发送验证码失败，请重试");
    }
  }, [form, agreementChecked]);

  const handleCaptchaSuccess = useCallback(
    async (result: CaptchaResult) => {
      try {
        setLoading(true);
        const mobile = form.getFieldValue("mobile");

        await authApi.sendVerificationCode({
          mobile,
          ticket: result.ticket,
          randstr: result.randstr,
        });

        message.success("验证码已发送");
        startCountdown();
      } catch (error) {
        console.error("Send code error:", error);
        message.error("发送验证码失败，请重试");
      } finally {
        setLoading(false);
        setShowCaptcha(false);
      }
    },
    [form, startCountdown]
  );

  const handleCaptchaFail = useCallback(() => {
    setShowCaptcha(false);
    setLoading(false);
    message.error("验证失败，请重试");
  }, []);

  const handleSubmit = async (values: any) => {
    if (!agreementChecked) {
      message.error("请阅读并同意用户协议和隐私政策");
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(
        login({
          mobile: values.mobile,
          code: values.code,
          password: ''
        })
      ).unwrap();

      if (result?.code === 0 && result?.data) {
        message.success("登录成功");
        onClose?.();
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show captcha when ready
  React.useEffect(() => {
    if (showCaptcha && isCaptchaReady) {
      showTencentCaptcha(handleCaptchaSuccess, handleCaptchaFail);
    }
  }, [
    showCaptcha,
    isCaptchaReady,
    showTencentCaptcha,
    handleCaptchaSuccess,
    handleCaptchaFail,
  ]);

  return (
    <Form form={form} onFinish={handleSubmit} className="mobile-login">
      <Form.Item name="mobile" rules={loginRules.mobile}>
        <Input placeholder="输入手机号" maxLength={11} />
      </Form.Item>

      <Form.Item name="code" rules={loginRules.code}>
        <div className="verify-code-input">
          <Input placeholder="输入6位短信验证码" maxLength={6} />
          <Button
            className="send-code-btn"
            disabled={countdown > 0 || loading}
            onClick={handleSendCode}
          >
            {countdown > 0 ? `${countdown}s后重发` : "发送验证码"}
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          disabled={!agreementChecked}
        >
          登录/注册
        </Button>
      </Form.Item>

      <div className="agreement">
        <Checkbox
          checked={agreementChecked}
          onChange={(e) => setAgreementChecked(e.target.checked)}
        >
          我已阅读并同意ResearchPlus
          <a href="/agreement" target="_blank" rel="noopener noreferrer">
            用户协议
          </a>
          、
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            隐私政策
          </a>
        </Checkbox>
      </div>
    </Form>
  );
};

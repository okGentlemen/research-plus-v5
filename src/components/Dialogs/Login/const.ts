export const CAPTCHA_APP_ID = 'your-captcha-app-id';

export const loginRules = {
  mobile: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
  ],
  account: [
    { required: true, message: '请输入账号' },
    { min: 4, message: '账号不能少于4位' },
    { max: 20, message: '账号不能超过20位' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 8, message: '密码不能少于8位' },
    { max: 16, message: '密码不能超过16位' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
      message: '密码必须包含字母和数字'
    }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '请输入6位数字验证码' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码' }
  ]
};
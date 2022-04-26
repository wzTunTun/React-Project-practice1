import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/stores'
import {useNavigate} from 'react-router-dom'
function Login () {
    const { loginStore } = useStore()
    const navigagte = useNavigate()
    const onFinish = async(values) => {
        console.log('Success:', values)
        await loginStore.getToken({
            mobile: values.number,
            code: values.password
        })
        navigagte('/',{replace:true})
        message.success('陶奥李大傻逼')
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    
    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt="" />
                <Form
                    initialValues={{ remember: true }}
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="手机号"
                        name="number"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的手机号!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号！',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size='large' placeholder='请输入手机号' />
                    </Form.Item>

                    <Form.Item
                        label="验证码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码!',
                            },
                            {
                                len: 6,
                                message: '请输入6位密码',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size='large' placeholder='请输入验证码' maxLength={6} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox className='login-checkbox-label'>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" size='large' block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
import React, {memo, useState} from "react";
import Vcode from "react-vcode";

import {Form, Input, Button, message} from "antd";
import {CodeOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";

import {
	userCheckName,
	registerUser
} from '@/api/user'

import {trim,encrypt} from '@/utils'


export default memo(function RegisterForm(props) {

	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false)

	const [codeValue, setCodeValue] = useState("")

	const onVcodeChange = (code) => {
		setCodeValue(code)
	}

	const onFinish = (e) => {
		setLoading(true)
		let params={}
		params.name=e.account
		params.password=encrypt(e.password)
		registerUser(params).then(res=>{
			if (res.success) {
				message.success('注册成功')
				setLoading(false);
				props.changeTab("1");
				form.resetFields()
			}else{
				setLoading(false);
				message.error("网络错误");
			}
		})
	}


	return (
			<Form onFinish={onFinish} validateTrigger="onBlur" form={form}>
				<Form.Item name="account" rules={[
					{
						validator: async (rule, value) => {
							if (!value) {
								return Promise.reject('请输入账号')
							} else {
								let res = await userCheckName({
									name: value
								})
								if (res && res.success) {
									if (res.data.length) {
										return Promise.reject("账号已存在");
									} else {
										return Promise.resolve();
									}
								} else {
									return Promise.reject("网络错误");
								}
							}
						}
					}
				]}>
					<Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入账号"/>
				</Form.Item>
				<Form.Item name="password" rules={[
					{
						required: true,
						message: "请输入密码",
					},
					{
						min: 6,
						message: "不能小于6位",
					},
					{
						max: 16,
						message: "不能大于16位",
					}
				]} hasFeedback
				>
					<Input.Password placeholder="请输入密码" prefix={<LockOutlined className="site-form-item-icon"/>}/>
				</Form.Item>
				<Form.Item name="confirm" dependencies={["password"]} hasFeedback rules={[
					{
						required: true,
						message: "请再次输入密码",
					},
					({getFieldValue}) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject("两次密码不一致");
						},
					}),
				]}>
					<Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
				</Form.Item>
				<Form.Item>
					<Form.Item name="vcode" noStyle rules={[
						() => ({
							validator: (rule, value) => {
								const v = trim(value);
								if (v) {
									if (v.toLowerCase() !== codeValue.toLowerCase()) {
										return Promise.reject("验证码错误");
									} else {
										return Promise.resolve();
									}
								} else {
									return Promise.reject("请输入验证码");
								}
							},
						}),
					]}>
						<Input placeholder="请输入验证码" id="vcode" style={{width: "200px"}}
									 prefix={<CodeOutlined style={{fontSize: 13}}/>}/>
					</Form.Item>
					<Vcode height={32} width={120} className="vcode fr" options={{lines: 16}}
								 onChange={(code) => onVcodeChange(code)}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						注册
					</Button>
				</Form.Item>
			</Form>
	)
})
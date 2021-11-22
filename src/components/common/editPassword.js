import React, {memo, useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {useSelector} from 'react-redux'


import {
	checkPasswordCorrect,
	passwordIsRepeat,
	updateNewPassword
} from '@/api/user';

import {
	encrypt
} from '@/utils'

import localCache from '@/utils/cache'


import {Modal, Form, Input, message} from "antd";

export default memo(function EditPassword(props) {
	const layout = {
		labelCol: {span: 5},
		wrapperCol: {span: 19}
	};

	const [form] = Form.useForm();
	const history = useHistory()
	const userInfo = useSelector(state => state.userInfo)

	const handleCancel = () => {
		props.clearEditPassword()
	}

	const handleOk = () => {
		form.validateFields().then(async (values)=>{
			setBtnLoading(true)
			let params={}
			params.user_id=userInfo.user_id
			params.newPassword=encrypt(values.newPassword)
			let res=await updateNewPassword(params)
			if (res.success) {
				message.success('修改密码成功，请重新登录!');
				setBtnLoading(false)
				localCache.clearCache()

				history.push("/login")
			}
		})
	}


	const [btnLoading, setBtnLoading] = useState(false)


	return (
		<Modal title="修改密码" centered visible={props.passwordModal} onCancel={handleCancel} onOk={handleOk} width={400}
					 confirmLoading={btnLoading}>
			<Form {...layout} form={form}>
				<Form.Item required label="旧密码" name='oldPassword' rules={[
					{
						validator: async (rule, value) => {
							if (!value) {
								return Promise.reject('请输入旧密码')
							} else {
								let res = await checkPasswordCorrect({
									user_id: userInfo.user_id,
									oldPassword: value
								})
								console.log(res)
								if (res.success) {
									return Promise.resolve();
								} else {
									return Promise.reject(res.message);
								}
							}
						}
					}
				]}>
					<Input placeholder="请输入旧密码"/>
				</Form.Item>
				<Form.Item required label="新密码" name="newPassword" rules={[
					{
						validator: async (rule, value) => {
							if (!value) {
								return Promise.reject('请输入新密码')
							} else {
								let res = await passwordIsRepeat({
									user_id: userInfo.user_id,
									newPassword: value
								})
								if (res.success) {
									return Promise.resolve();
								} else {
									return Promise.reject(res.message);
								}
							}
						}
					},
					{
						min: 6,
						message: "不能小于6位",
					},
					{
						max: 16,
						message: "不能大于16位",
					}
				]}>
					<Input placeholder="请输入新密码"/>
				</Form.Item>
				<Form.Item label="确认密码"
									 name="again"
									 dependencies={["newPassword"]}
									 rules={[
										 {
											 required: true,
											 message: "请再次输入新密码",
										 },
										 ({getFieldValue}) => ({
											 validator(_, value) {
												 if (!value || getFieldValue("newPassword") === value) {
													 return Promise.resolve();
												 }
												 return Promise.reject("两次密码不一致");
											 },
										 }),
									 ]}>
					<Input placeholder="请再次输入新密码"/>
				</Form.Item>
			</Form>
		</Modal>
	)
})
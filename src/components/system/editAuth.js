//react引入
import React, {memo, useState,useEffect} from 'react'


//组件引入


//方法引入
import {
	roleList,
	editUserRoleAuth
} from '@/api/system'

//antd引入
import {
	Modal,
	Form,
	Select,
	Input,
	message
} from "antd";

import {} from "@ant-design/icons";

const {Option} = Select

export default memo(function EditAuth(props) {

	const {editUserAuthModal, currentData, closeEditUserInfo} = props
	const layout = {
		labelCol: {span: 5},
		wrapperCol: {span: 19},
	};
	const [form] = Form.useForm();


	//页面数据
	const [btnLoading, setBtnLoading] = useState(false)
	const [role,setRole]=useState([])
	const handleCancel = () => {
		closeEditUserInfo()
	}
	const handleOk = () => {
		form.validateFields().then(async values=>{
			setBtnLoading(true)
			console.log(values)
			let params={}
			params.user_id=currentData.user_id
			params.name=values.name
			params.role_id=values.role_id
			console.log(params)
			let res=await editUserRoleAuth(params)
			if (res.success) {
				console.log(res)
				message.success('修改成功')
				setBtnLoading(false)
				closeEditUserInfo(1)
			}
		})
	}

	useEffect(()=>{
		getRoleList()
		form.setFieldsValue({
			name:currentData.name,
			role_id:currentData.role_id
		})
	},[])
	const getRoleList=()=>{
		roleList().then(res=>{
			if (res.success) {
				res.data.forEach(item=>{
					item.key=item.id
				})
				setRole(res.data)
			}
		})
	}

	return (
		<Modal title="修改角色" visible={editUserAuthModal} onOk={handleOk} onCancel={handleCancel} width={400}
					 confirmLoading={btnLoading}>
			<Form form={form} {...layout} >
				<Form.Item label="用户名" name="name" rules={[
					{
						required:true,
						message:'请输入用户名'
					}
				]}>
					<Input/>
				</Form.Item>
				<Form.Item label="角色" name="role_id" rules={[
					{
						required:true,
						message:'请选择角色'
					}
				]}>
					<Select>
						{
							role.length&&role.map(item=>{
								return (
									<Option value={item.id} key={item.key}>
										{item.name}
									</Option>
								)
							})
						}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	)
})

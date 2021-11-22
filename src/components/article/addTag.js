//react引入
import React,{memo,useState} from 'react'


//组件引入


//方法引入
import {
	checkTagNameIsExist,
	adminAddTag
} from '@/api/label'

//antd引入
import {
	Button,
	Modal,
	Form,
	Input, message
} from "antd";

import {

} from "@ant-design/icons";


export default memo(function AddTag (props) {
	const [form] = Form.useForm();
	const {addTagModal,closeTagModal} =props


	//页面数据
	const [btnLoading,setBtnLoading]=useState(false)
	const handleCancel=()=>{
		closeTagModal()
	}
	const handleOk=()=>{
		form.validateFields().then(async (values)=>{
			setBtnLoading(true)
			let params={}
			params.name=values.name
			params.type=1
			let res=await adminAddTag(params)
			if (res.success) {
				message.success('添加成功')
				setBtnLoading(false)
				closeTagModal(1)
			}
		})

	}

	return (
		<Modal title="添加Tag" visible={addTagModal} onOk={handleOk} onCancel={handleCancel} width={400} confirmLoading={btnLoading}>
			<Form form={form} validateTrigger={'onBlur'}>
				<Form.Item label="标签名" name="name" rules={[
					{
						validator:async (rule,value)=>{
							if (!value) {
								return Promise.reject('请输入标签名')
							}else{
								let res=await checkTagNameIsExist({
									name:value
								})
								if (res.data.length) {
									return Promise.reject("标签已存在")
								}else{
									return Promise.resolve()
								}
							}
						}
					}
				]}>
					<Input placeholder="请输入标签名"/>
				</Form.Item>
			</Form>
		</Modal>
	)
})


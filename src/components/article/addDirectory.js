//react引入
import React,{memo,useState,useEffect} from 'react'


//组件引入


//方法引入
import {
	addDirectory,
	directoryNameIsExist,
	directoryList
} from '@/api/label'

//antd引入
import {
	Button,
	Modal,
	Form,
	Input,
	Select,
	message
} from "antd";

import {

} from "@ant-design/icons";


const {Option} =Select

export default memo(function (props) {

	const {addTagModal,closeModal} =props

	//表单数据
	const [form] = Form.useForm();
	const layout ={
		labelCol :{span:5},
		wrapperCol:{span:19}
	}
	const [directoryData,setDirectoryData] = useState([])
	useEffect(()=>{
		getList()
	},[])

	const getList=()=>{
		directoryList().then(res=>{
			if (res.success) {
				setDirectoryData(res.data)
			}
		})
	}

	const onChangeSelect=()=>{

	}




	//页面数据
	const [btnLoading,setBtnLoading]=useState(false)
	const handleCancel=()=>{
		closeModal()
	}
	const handleOk=()=>{
		form.validateFields().then(async (values)=>{
			setBtnLoading(true)
			let params={}
			params.name=values.name
			if (values.parent_id) {
				params.parent_id=values.parent_id
			}
			params.type=2
			let res=await addDirectory(params)
			if (res.success) {
				message.success("添加成功")
				setBtnLoading(false)
				closeModal(1)
			}
		})
	}

	return (
		<Modal title="添加目录" visible={addTagModal} onOk={handleOk} onCancel={handleCancel} width={400} confirmLoading={btnLoading}>
			<Form form={form} {...layout} validateTrigger={"onBlur"}>
				<Form.Item label="标签名" name="name" rules={[
					{
						validator:async (rule,value)=>{
							if (!value) {
								return Promise.reject("请输入分类目录名")
							}else{
								let res=await directoryNameIsExist({
									name:value
								})
								if (res.data.length) {
									return Promise.reject("分类目录已存在")
								}else{
									return Promise.resolve()
								}
							}
						}
					}
				]}>
					<Input placeholder="请输入标签名" />
				</Form.Item>
				<Form.Item label="父级目录" name="parent_id">
					<Select showSearch placeholder="选择父级目录" optionFilterProp="children" onChange={onChangeSelect}>
						{
							directoryData.map(item=>{
								return (
									<Option key={item.id} value={item.id}>
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


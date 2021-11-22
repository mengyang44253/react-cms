//react引入
import React,{memo,useState} from 'react'


//组件引入


//方法引入


//antd引入
import {
	Button,
	Modal
} from "antd";

import {

} from "@ant-design/icons";


export default memo(function (props) {

	const {} =props

	//表单数据


	//页面数据
	const [btnLoading,setBtnLoading]=useState(false)
	const handleCancel=()=>{

	}
	const handleOk=()=>{

	}

	return (
			<Modal title="添加Tag" visible={} onOk={handleOk} onCancel={handleCancel} width={400} confirmLoading={btnLoading}>

			</Modal>
	)
})

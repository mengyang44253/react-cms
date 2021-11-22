//react引入
import React,{memo,useState} from 'react'


//组件引入


//方法引入
import {
	changeArticleStatus
} from '@/api/article'

//antd引入
import {
	Button,
	Modal,
	message
} from "antd";

import {

} from "@ant-design/icons";


export default memo(function AuditArticle (props) {

	const {addModal,closeModal,currentData} =props

	//表单数据


	//页面数据
	const [btnLoading,setBtnLoading]=useState(false)
	const audit=async (value)=>{
		setBtnLoading(true)
		let params={}
		params.id=currentData.id
		params.status=value
		let res=await changeArticleStatus(params)
		if (res.success) {
			message.success("修改成功")
			setBtnLoading(false)
			closeModal()
		}
	}

	return (
		<Modal title="审核文章" visible={addModal} width={400} footer={[
			<Button type="dashed" onClick={()=>audit(4)} loading={btnLoading}>
				审核拒绝
			</Button>,
			<Button type="primary" onClick={()=>audit(3)} loading={btnLoading}>
				审核通过
			</Button>
		]}>
			<div>
				是否要审核通过？
			</div>
		</Modal>
	)
})


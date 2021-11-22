//react引入
import React,{memo,useState} from 'react'


//组件引入


//方法引入
import {
	articleStatusFormat,
	articleIsComment,
	fullTextFormat,
	secondFormat
} from '@/utils/filters'

//antd引入
import {
	Button,
	Modal,
	Descriptions
} from "antd";

import {

} from "@ant-design/icons";


export default memo(function ViewArticleDetail (props) {

	const {showDetail,closeShowDetail,currentData} =props

	//表单数据


	//页面数据
	const [btnLoading,setBtnLoading]=useState(false)
	const handleCancel=()=>{
		closeShowDetail()
	}

	return (
		<Modal title="文章详情" visible={showDetail} onCancel={handleCancel} width={1200} confirmLoading={btnLoading} footer={null}>
			<Descriptions bordered>
				<Descriptions.Item label="标题">
					{currentData.title}
				</Descriptions.Item>
				<Descriptions.Item label="内容">
					{currentData.content}
				</Descriptions.Item>
				<Descriptions.Item label="分类目录">
					{
						currentData.label_data.filter(item=>item.type == 2).map(item=>item.name).join(",")
					}
				</Descriptions.Item>
				<Descriptions.Item label="标签">
					{
						currentData.label_data.filter(item=>item.type == 1).map(item=>item.name).join(",")
					}
				</Descriptions.Item>
				<Descriptions.Item label="状态">
					{
						articleStatusFormat(currentData.status)
					}
				</Descriptions.Item>
				<Descriptions.Item label="文章是否可以被评论">
					{
						articleIsComment(currentData.comment_status)
					}
				</Descriptions.Item>
				<Descriptions.Item label="创建时间">
					{
						secondFormat(currentData.create_time)
					}
				</Descriptions.Item>
				<Descriptions.Item label="更新时间">
					{
						secondFormat(currentData.update_time)
					}
				</Descriptions.Item>
				<Descriptions.Item label="阅读量">
					{
						currentData.read
					}
				</Descriptions.Item>
				<Descriptions.Item label="点赞">
					{
						currentData.praise
					}
				</Descriptions.Item>
				<Descriptions.Item label="作者">
					{
						currentData.author_data.user_name
					}
				</Descriptions.Item>
			</Descriptions>,
		</Modal>
	)
})

//react引入
import React, {memo, useState} from 'react'


//组件引入
import {defaultAvatar} from '@/utils/mixin'

//方法引入
import {
	textFormat,
	genderFormat,
	secondFormat
} from '@/utils/filters'

import {
	getCountryNameById,
	getCityNameById
} from '@/utils/addressConfig'

//antd引入
import {
	Button,
	Modal,
	Descriptions,
	Image
} from "antd";

import {} from "@ant-design/icons";


export default memo(function ViewUserInfo(props) {

	const {userInfo,userInfoModal,closeUserInfo} = props


	//页面数据
	const handleCancel = () => {
		closeUserInfo()
	}
	const handleOk = () => {

	}

	return (
		<Modal title="查看用户信息" visible={userInfoModal} onOk={handleOk} onCancel={handleCancel} width={800} footer={null}>
			<Descriptions column={3}>
				<Descriptions.Item label="头像">
					<Image
						width={100}
						src={userInfo.avatar||defaultAvatar}
					/>
				</Descriptions.Item>
				<Descriptions.Item label="用户名">
					{userInfo.name}
				</Descriptions.Item>
				<Descriptions.Item label="性别">
					{
						genderFormat(userInfo.gender)
					}
				</Descriptions.Item>
				<Descriptions.Item label="最后登录时间">
					{
						secondFormat(userInfo.last_login_time)
					}
				</Descriptions.Item>
				<Descriptions.Item label="手机号">
					{textFormat(userInfo.phone)}
				</Descriptions.Item>
				<Descriptions.Item label="国家城市">
					{
						getCountryNameById(userInfo.country)
					}-
					{
						getCityNameById(userInfo.city)
					}
				</Descriptions.Item>
			</Descriptions>
		</Modal>
	)
})

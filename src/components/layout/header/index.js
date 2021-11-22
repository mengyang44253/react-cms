import React,{memo,Fragment,useState} from "react";

import {useHistory} from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'

import screenfull from "screenfull";
import {defaultAvatar} from '@/utils/mixin'

import {LayoutHeaderStyle} from '@/views/home/style'
import EditUserInfo from '@/components/common/editUserInfo'
import EditPassword from '@/components/common/editPassword'

import localCache from '@/utils/cache'


import { Tooltip, Dropdown, Menu,Avatar } from "antd";
import {
	MenuFoldOutlined,
	FullscreenExitOutlined,
} from "@ant-design/icons";


export default memo(function LayoutHeader(props){
	const userInfo=useSelector(state=>state.userInfo)

	const history=useHistory()

	const [infoModal, setInfoModal] = useState(false);
	const clearUserModal=()=>{
		setInfoModal(false)
	}


	const toggle=()=>{
		props.onToggle()
	}

	const [fullScreen,setFullScreen]=useState(false)

	const requestFullScreen=()=>{
		if (screenfull.isEnabled) {
			screenfull.toggle().then(() => {
				setFullScreen(screenfull.isFullscreen)
			});
		}
	}

	const [passwordModal, setPasswordModal] = useState(false);
	//关闭修改密码对话框
	const clearEditPassword=()=>{
		setPasswordModal(false)
	}

	const handleCancel=({key})=>{
		if (key === '1') {
			setInfoModal(true);
		}else if(key ==='2'){
			setPasswordModal(true)
		}else if(key === '3'){
			localCache.clearCache()
			history.push("/login")
		}
	}


	return (
			<Fragment>
				<Tooltip placement="bottom" title={props.collapsed?'展开菜单':'收起菜单'}>
					<MenuFoldOutlined className={props.collapsed?'trigger fold':'trigger'} onClick={toggle} />
				</Tooltip>
				<div className="rightBox">
					<Tooltip placement="bottom" title={fullScreen?'退出全屏':'全屏'}>
						<div className="full all-center">
							<FullscreenExitOutlined className="icon" onClick={requestFullScreen} />
						</div>
					</Tooltip>
					{
						userInfo&&(
								<Dropdown overlay={
									<Menu onClick={handleCancel}>
										<Menu.ItemGroup title="用户中心">
											<Menu.Item key={1}>
												编辑个人信息
											</Menu.Item>
											<Menu.Item key={2}>
												修改密码
											</Menu.Item>
											<Menu.Item key={3}>
												退出登录
											</Menu.Item>
										</Menu.ItemGroup>
									</Menu>
								}>
									<div className="userhead all-center">
										<Avatar src={userInfo.avatar?userInfo.avatar:defaultAvatar} />
										<span className="username">
											{userInfo.name?userInfo.name:'Not'}
										</span>
									</div>
								</Dropdown>
						)
					}
				</div>
				{
					infoModal?<EditUserInfo infoModal={infoModal} clearUserModal={clearUserModal} />:null
				}
				{
					passwordModal?<EditPassword passwordModal={passwordModal} clearEditPassword={clearEditPassword} />:null
				}
			</Fragment>
	)
})
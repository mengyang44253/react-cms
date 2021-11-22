import React,{memo,useState,Fragment,useEffect} from "react";

import Router from '@/router'
import {Link, useLocation} from "react-router-dom";

import logo from '@/assets/img/logo.png'

import {Menu,Image } from "antd";

const {SubMenu} = Menu;





export default memo(function LayoutSider(props){
	const [selectedKeys, setSelectedKeys] = useState(["/home"]);


	const [openKeys, setOpenKeys] = useState([]);


	//子级菜单处理
	const renderSubMenu = ({path, title, icon, children}) => {
		return (
				<SubMenu key={path} icon={icon} title={title}>
					{children &&
					children.map((item) => {
						return item.children && item.children.length > 0
								? renderSubMenu(item)
								: renderMenu(item);
					})}
				</SubMenu>
		);
	};
	//无子级菜单
	const renderMenu = ({title, path, icon}) => {
		return (
				<Menu.Item key={path} icon={icon}>
					<Link to={path}>
						<span>{title}</span>
					</Link>
				</Menu.Item>
		);
	};


	//菜单高亮显示
	const selectMenuHigh = (pathname, menuKey) => {
		setSelectedKeys([pathname])
		setOpenKeys([menuKey])
	}
	const openMenu = (openKeys) => {
		setOpenKeys([openKeys[openKeys.length - 1]])
	}
	const selectMenu = ({key, keyPath}) => {
		selectMenuHigh(key, keyPath[keyPath.length - 1])
	}

	return (
			<Fragment>
				<div className={props.collapsed?"menuLogo hide":"menuLogo"}>
						<Image
								preview={false}
								width={50}
								src={logo}
						/>
						<div className="text">
							{props.collapsed?null:<div>React-Admin</div>}
						</div>
				</div>
				<Menu theme="dark" mode="inline" selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={openMenu} onClick={selectMenu}>
					{
						Router&&Router.map((firstItem)=>{
							return firstItem.children&&firstItem.children.length>0?renderSubMenu(firstItem):renderMenu(firstItem)
						})
					}
				</Menu>
			</Fragment>
	)

})
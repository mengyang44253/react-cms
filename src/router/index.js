import React from "react";

import {
	HomeOutlined,
	BarChartOutlined,
	CommentOutlined,
	UserSwitchOutlined,
	RobotOutlined,
	BookOutlined,
	WhatsAppOutlined,
	UsergroupAddOutlined,
	BoxPlotOutlined,
	UpSquareOutlined,
	CopyOutlined
} from "@ant-design/icons";

const Router = [
	{
		title: "首页",
		icon: <HomeOutlined/>,
		path: "/home",
	},
	{
		title:"文章管理",
		icon:<CopyOutlined />,
		path:'/home/article',
		children:[
			{
				title:'新建文章',
				path:'/home/article/addArticle'
			},
			{
				title:'文章列表',
				path:'/home/article/articleList'
			},
			{
				title:'标签管理',
				path:'/home/article/tag'
			},
			{
				title:'目录管理',
				path:'/home/article/directory'
			}
		]
	},
	{
		title: "评论管理",
		icon:<BarChartOutlined/>,
		path:"/home/comment"
	},
	{
		title: "友链管理",
		icon:<BookOutlined/>,
		path:"/home/friend"
	},
	{
		title: "系统管理",
		icon: <RobotOutlined/>,
		path: "/home/system",
		children: [
			{
				title: "账号管理",
				icon: "",
				path: "/home/system/user",
			},
			{
				title: "角色管理",
				icon: "",
				path: "/home/system/role",
			},
		],
	}
]


export default Router
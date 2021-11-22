import React, {memo, useState} from 'react'

import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";


import {LoginWarp} from "./style";

import {Tabs} from "antd";

const {TabPane} = Tabs;

export default memo(function Login() {
	const [tab, setTab] = useState("1")

	const changeTab = (value) => {
		setTab(value)
	}

	return (
			<LoginWarp>
				<div className="wrap">
					<Tabs activeKey={tab} centered onChange={changeTab}>
						<TabPane tab="登录" key="1">
							<LoginForm/>
						</TabPane>
						<TabPane tab="注册" key="2">
							<RegisterForm changeTab={changeTab}/>
						</TabPane>
					</Tabs>
				</div>
			</LoginWarp>
	)
})
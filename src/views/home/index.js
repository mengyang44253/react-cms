import React,{memo,useState} from 'react'

import LayoutHeader from '@/components/layout/header'
import LayoutSider from '@/components/layout/sider'
import LayoutContent from '@/components/layout/content'

import {HomeWrap} from "./style";

import {Layout} from 'antd'
const {Sider, Header, Content} = Layout;

export default memo(function Home(){

	const [collapsed, setCollapsed] = useState(false)

	const onToggle = () => {
		setCollapsed(!collapsed)
	}

	return (
		<HomeWrap>
			<Layout className="layout-wrap">
				<Sider width="256px" className="layout-sider" collapsed={collapsed}>
					<LayoutSider collapsed={collapsed} />
				</Sider>
				<Layout>
					<Header className="layout-header">
						<LayoutHeader collapsed={collapsed} onToggle={onToggle} />
					</Header>
					<Content className="layout-content">
						<LayoutContent />
					</Content>
				</Layout>
			</Layout>
		</HomeWrap>
	)
})

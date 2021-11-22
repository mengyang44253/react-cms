//react引入
import React,{memo,useState,useEffect} from 'react'


//组件引入


//方法引入
import {
	AuthTree
} from '@/utils/authTree'

import {
	roleEditAuth,
	getAuthByRoleId
} from '@/api/system'

//antd引入
import {
	Modal,
	Tree,
	message
} from "antd";

import {

} from "@ant-design/icons";


export default memo(function RoleAuth (props) {

	const {auth,closeAuthModal,currentData} =props


	//页面数据
	const [btnLoading,setBtnLoading]=useState(false)
	const [checkedKeys, setCheckedKeys] = useState([]);
	const onCheck=(checkedKeysValue)=>{
		console.log('onCheck', checkedKeysValue.checked);
		setCheckedKeys(checkedKeysValue.checked);
	}
	const handleCancel=()=>{
		closeAuthModal()
	}
	const handleOk=async ()=>{
		if (!checkedKeys.length) {
			message.error('请选择权限')
			return false
		}
		setBtnLoading(true)
		let params={}
		params.role_id=currentData.id
		params.name=checkedKeys.join(',')
		let res=await roleEditAuth(params)
		console.log(res)
		if (res.success) {
			message.success('修改成功')
			setBtnLoading(false)
			closeAuthModal()
		}
	}

	useEffect(()=>{
		getAuthName()
	},[currentData])

	const getAuthName=async ()=>{
		let params={}
		params.role_id=currentData.id
		let res=await getAuthByRoleId(params)
		if (res.success) {
			if (res.data) {
				setCheckedKeys(res.data.split(','))
			}
		}
	}

	return (
		<Modal title="权限管理" visible={auth} onOk={handleOk} onCancel={handleCancel} width={400} confirmLoading={btnLoading}>
			<Tree checkable checkStrictly defaultExpandAll autoExpandParent treeData={AuthTree}  onCheck={onCheck}  checkedKeys={checkedKeys} />
		</Modal>
	)
})


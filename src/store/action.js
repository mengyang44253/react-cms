import store from '@/store'



import {CHANGE_USERINFO,CHANGE_USER_ID,CLEAR_USERINFO,CHANGE_TOKEN} from './actionTypes'


import {
	getUserInfoByUserId
} from '@/api/user'

import localCahce from '@/utils/cache'


//设置userId
export const ChangeUserId=(id)=>({
	type:CHANGE_USER_ID,
	id
})

//设置token
export const changeToken=(token)=>({
	type:CHANGE_TOKEN,
	token
})

//设置用户信息
export const ChangeUserInfo=(userInfo) => ({
	type:CHANGE_USERINFO,
	userInfo
})

//清除用户信息
export const ClearUserInfo=()=>({
	type:CLEAR_USERINFO
})

//根据id获取用户信息
export function getUserInfoById(id){
	return async dispatch=>{
		let res=await getUserInfoByUserId({
			user_id:id
		})
		console.log(res)
		if(res.success){
			localCahce.setCache('userInfo',res.data)
			dispatch(ChangeUserInfo(res.data))
		}
	}
}


export function loadLocalLogin(){
	console.log('从localStorage获取数据')
	const token=localCahce.getCache('token')
	console.log(token)
	if (token) {
		store.dispatch(changeToken(token))
	}
	const user_id = localCahce.getCache('user_id')
	console.log(user_id)
	if (user_id) {
		store.dispatch(ChangeUserId(user_id))
	}
	const userInfo=localCahce.getCache('userInfo')
	console.log(userInfo)
	if (userInfo) {
		store.dispatch(ChangeUserInfo(userInfo))
	}
}


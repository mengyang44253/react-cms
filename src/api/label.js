import Http from '@/utils/axios'


//后台添加标签
export function adminAddTag(params) {
	return Http({
		method:'post',
		params,
		url:'/admin/label/addTag'
	})
}

//后台检查标签名是否重复
export function checkTagNameIsExist(params) {
	return Http({
		method:'get',
		params,
		url:'/admin/label/checkTag'
	})
}

//后台tag列表
export function tagList(params) {
	return Http({
		method:'post',
		params,
		url:'/admin/label/tagList'
	})
}

//删除一个标签
export function deletedSomeTag(params) {
	return Http({
		method:'get',
		params,
		url:'/admin/label/deleteTag'
	})
}

//添加目录
export function addDirectory(params) {
	return Http({
		method:'post',
		params,
		url:'/admin/label/addDirectory'
	})
}

//目录名校验
export function directoryNameIsExist(params) {
	return Http({
		method:'get',
		params,
		url:'/admin/label/checkDirectory'
	})
}

//目录列表
export function directoryList(params) {
	return Http({
		method:'post',
		params,
		url:'/admin/label/directoryList'
	})
}

//删除某一个目录
export function deletedSomeDirectory (params) {
	return Http({
		method:'get',
		params,
		url:'/admin/label/deletedDirectory'
	})
}

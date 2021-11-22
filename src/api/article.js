import Http from "../utils/axios";


//添加文章
export function addArticle(params) {
	return Http({
		method:'post',
		params,
		url:"/admin/article/addArticle"
	})
}

//修改文章
export function editArticle(params) {
	return Http({
		method:'post',
		params,
		url:"/admin/article/editArticle"
	})
}

//文章列表
export function articleList(params) {
	return Http({
		method:"post",
		params,
		url:"/admin/article/articleList"
	})
}

//修改文章的状态
export function changeArticleStatus(params) {
	return Http({
		method:'post',
		params,
		url:"/admin/article/articleStatus"
	})
}

//根据文章id获取文章详情
export function getArticleDetailById(params) {
	return Http({
		method:'get',
		params,
		url:"/admin/article/getDetailById"
	})
}

//删除某一篇文章
export function deleteSomeArticle(params) {
	return Http({
		method:'get',
		params,
		url:"/admin/article/deleteArticle"
	})
}
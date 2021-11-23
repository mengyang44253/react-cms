import Http from "../utils/axios";

//评论列表
export function commentList(params) {
  return Http({
    method:"post",
    params,
    url:"/admin/comment/list"
  })
}

//评论状态审核
export function commentStatusAudit(params) {
  return Http({
    method:"post",
    params,
    url:"/admin/comment/status"
  })
}
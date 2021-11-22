import Http from '@/utils/axios'

//新建友链
export function adminAddFriend(params){
  return Http({
    method:'post',
    params,
    url:'/admin/friend/create'
  })
}

//友链列表
export function adminFriendList(params) {
  return Http({
    method:'post',
    params,
    url:'/admin/friend/list'
  })
}

//编辑友链
export function adminEditFriend(params){
  return Http({
    method:'post',
    params,
    url:'/admin/friend/edit'
  })
}

//修改友链的状态
export function adminEditFriendStatus(params) {
  return Http({
    method:'post',
    params,
    url:'/admin/friend/editStatus'
  })
}

//删除友链
export function adminDeletedFriend(params) {
  return Http({
    method:'get',
    params,
    url:'/admin/friend/deleted'
  })
}
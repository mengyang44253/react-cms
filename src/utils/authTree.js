export const AuthTree = [
	{
		title:"所有权限",
		key:'ALL_AUTH',
		disabled:true,
		children:[
			{
				title:'首页',
				key:'home'
			},
			{
				title:'文章管理',
				key:'art'
			},
			{
				title:'系统管理',
				key:'sys',
				children:[
					{
						title:'账号管理',
						key:'sys.act',
						children:[

						]
					},
					{
						title:'角色管理',
						key:'sys.rol',
						children:[
							{
								title:'添加',
								key:'sys.rol.add'
							},
							{
								title:'修改',
								key:'sys.rol.edi'
							},
							{
								title:'删除',
								key:'sys.rol.del'
							},
							{
								title:'权限管理',
								key:'sys.rol.aut'
							},
						]
					}
				]
			}
		]
	}
]
//react引入
import React, { memo, useState, useEffect } from 'react'
import dayjs from 'dayjs'

//组件引入
import AddRole from '@/components/system/addRole'
import RoleAuth from '@/components/system/auth'

//方法引入
import {
	roleList,
	deletedSomeRole,
	editRole
} from '@/api/system'

import {
	secondFormat
} from '@/utils/filters'

//antd引入
import {
	Button,
	Spin,
	Row,
	Col,
	Input,
	Table,
	Pagination,
	Tooltip,
	Divider,
	Popconfirm,
	message,
	DatePicker
} from "antd";

import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	SolutionOutlined
} from "@ant-design/icons";
const { RangePicker } = DatePicker;


export default memo(function Role() {
	//搜索数据
	const [roleName, setRoleName] = useState("")
	const nameChange = (e) => {
		setRoleName(e.target.value)
	};
	const [time, setTime] = useState([])
	const timeChange = (date) => {
		console.log(date)
		setTime(date)
	}

	//表格数据
	const [showAddBtn, setShowAddBtn] = useState(true);

	const openAddRoleModal = () => {
		setAddRoleModal(true)
	}
	const closeRoleModal = (e) => {
		setAddRoleModal(false)
		setCurrentData({})
		if (e) {
			getList()
		}
	}

	const [auth,setAuth]=useState(false)
	const openAuthModal=(record)=>{
		setCurrentData(record)
		setAuth(true)
	}
	const closeAuthModal=()=>{
		setCurrentData({})
		setAuth(false)
	}


	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [currentData,setCurrentData]=useState({})
	const columns = [
		{
			title: "角色名",
			dataIndex: "name",
			key: "name",
			width: 100,
			ellipsis: true
		},
		{
			title:'描述',
			dataIndex:'desc',
			key:'desc',
			width: 200,
			ellipsis:true
		},
		{
			title: "创建时间",
			dataIndex: "create_time",
			key: "create_time",
			width: 200,
			ellipsis: true,
			render: (text) => {
				return secondFormat(text)
			}
		},
		{
			title: "更新时间",
			dataIndex: "update_time",
			key: "update_time",
			width: 200,
			ellipsis: true,
			render: (text) => {
				return secondFormat(text)
			}
		},
		{
			title: "操作",
			dataIndex: "handle",
			key: "handle",
			width: 200,
			render: (text, record) => {
				return (
					<div>
						<span>
							<Tooltip placement="top" title="修改">
                <EditOutlined twoToneColor="#0066cc" onClick={()=>changeRole(record)} />
              </Tooltip>
						</span>
						<Divider type="vertical"/>
						<Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => deletedRole(record)}>
							<Tooltip placement="top" title="删除">
								<DeleteOutlined twoToneColor="#ff3333" />
							</Tooltip>
						</Popconfirm>
						<Divider type="vertical"/>
						<span>
							<Tooltip placement="top" title="权限管理">
                <SolutionOutlined twoToneColor="#757bf2" onClick={()=>openAuthModal(record)} />
              </Tooltip>
						</span>
					</div>
				)

			}
		}
	]

	const deletedRole=async (record)=>{
		let params={}
		params.id=record.id
		let res=await deletedSomeRole(params)
		if (res.success) {
			message.success('删除成功')
			getList()
		}
	}

	const changeRole=async (record)=>{
		setCurrentData(record)
		setAddRoleModal(true)
	}

	//页面数据
	const [addRoleModal, setAddRoleModal] = useState(false);
	const [loading, setLoading] = useState(false);


	//搜索方法
	const reset = () => {
		setRoleName("")
		setTime([])
	};

	const search = () => {
		setCurrentPage(1)
		getList()
	};


	//表格方法
	const getList = async () => {
		setLoading(true)
		let params = {}
		params.pagination = 1
		params.limit = 10
		params.start = currentPage - 1
		if (roleName) {
			params.name = roleName
		}
		if (time.length) {
			params.start_time=dayjs(time[0]).unix()
			params.end_time = dayjs(time[1]).unix()
		}
		let res = await roleList(params)
		if (res.success) {
			setLoading(false)
			res.data.forEach(item => {
				item.key = item.id
			})
			setDataSource(res.data)
			setCount(res.count)
		} else {
			setLoading(false)
		}
	}
	const currentChange = (value) => {
		setCurrentPage(value)
		getList()
	};

	useEffect(() => {
		getList()
	},[])


	return (
		<div>
			<div className="filter-content">
				<Row gutter={16}>
					<Col span={5}>
						<div>
							<Input placeholder="请输入角色名" onChange={nameChange}/>
						</div>
					</Col>
					<Col span={5}>
						<div>
							<RangePicker value={ time } onChange={ timeChange } />
						</div>
					</Col>
					<Col span={4} offset={10}>
						<div>
							<Button className="fr resetBtn" onClick={reset}>重置</Button>
							<Button className="fr" type="primary" onClick={search}>搜索</Button>
						</div>
					</Col>
				</Row>
			</div>
			<div className="table-content" style={{height: `calc(100vh - 200px)`}}>
				<div className="add">
					{showAddBtn ? (
						<Button
							type="dashed"
							icon={<PlusOutlined/>}
							onClick={openAddRoleModal}
						>
							添加
						</Button>
					) : null}
				</div>
				<div className="table-wrap">
					<Table scorll={{x: 1500, scrollToFirstRowOnChange: true, y: 300}} bordered dataSource={dataSource}
								columns={columns} pagination={false}/>
				</div>
			</div>
			<div className="footer-content">
				<Pagination
					size="small"
					current={currentPage}
					total={count}
					onChange={currentChange}
				/>
			</div>
			<Spin className="loading" size="large" spinning={loading}/>
			{
				addRoleModal ? <AddRole addRoleModal={addRoleModal} closeRoleModal={closeRoleModal} currentData={currentData}/> : null
			}
			{
				auth?<RoleAuth auth={auth} closeAuthModal={closeAuthModal} currentData={currentData} />:null
			}
		</div>
	)
})

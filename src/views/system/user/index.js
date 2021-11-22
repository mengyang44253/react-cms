//react引入
import React, {memo, useEffect, useState} from "react";

//组件引入
import ViewUserInfo from '@/components/system/viewUserInfo'
import EditAuth from '@/components/system/editAuth'

//方法引入
import {
	getUserList,
	deletedSomeUser
} from '@/api/system'
import {
	textFormat,
	secondFormat
} from "@/utils/filters";

//antd引入
import {
	Button,
	Pagination,
	Spin,
	Row,
	Col,
	Input,
	DatePicker,
	Table,
	Tooltip,
	Divider,
	Popconfirm,
	message
} from "antd";

import {
	EditOutlined,
	PlusOutlined,
	FundViewOutlined, DeleteOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const {RangePicker} = DatePicker;

export default memo(function User() {
	//搜索数据
	const [name, setName] = useState("");

	const nameChange = (e) => {
		setName(e.target.value);
	};
	const [time, setTime] = useState([])
	const timeChange = (date) => {
		setTime(date)
	}
	const reset = () => {
	};

	const search = () => {
		getList();
	};

	//表格数据
	const [showAddBtn, setShowAddBtn] = useState(false);

	const openAddTagModal = () => {
	};
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [currentData, setCurrentData] = useState({})
	const [userInfoModal, setUserInfoModal] = useState(false)
	const [editUserAuthModal, setEditUserAuthModal] = useState(false)
	const columns = [
		{
			title: '用户名',
			dataIndex: 'name',
			key: "name",
			width: 100,
			ellipsis: true
		},
		{
			title: '所属角色',
			dataIndex: 'roleName',
			key: "roleName",
			width: 100,
			ellipsis: true,
			render: (text) => {
				return textFormat(text)
			}
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: "create_time",
			width: 100,
			ellipsis: true,
			render: (text) => {
				return secondFormat(text)
			}
		},
		{
			title: '操作',
			dataIndex: 'handle',
			key: "handle",
			width: 100,
			ellipsis: true,
			render: (text, record) => {
				return (
					<div>
						<span>
							<Tooltip placement="top" title="查看">
								<FundViewOutlined twoToneColor="#00a854" onClick={() => viewUserInfo(record)}/>
              </Tooltip>
						</span>
						<Divider type="vertical"/>
						<span>
							<Tooltip placement="top" title="修改">
								<EditOutlined twoToneColor="##0066cc" onClick={() => editUserInfo(record)}/>
              </Tooltip>
						</span>
						<Divider type="vertical"/>
						<Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => deletedUser(record)}>
							<Tooltip placement="top" title="删除">
								<DeleteOutlined twoToneColor="#ff3333"/>
							</Tooltip>
						</Popconfirm>
					</div>
				)
			}

		},
	];

	const viewUserInfo = (record) => {
		setCurrentData(record)
		setUserInfoModal(true)
	}
	const closeUserInfo = () => {
		setCurrentData({})
		setUserInfoModal(false)
	}
	const editUserInfo = (record) => {
		setCurrentData(record)
		setEditUserAuthModal(true)
	}
	const closeEditUserInfo = (value) => {
		setCurrentData({})
		setEditUserAuthModal(false)
		if (value) {
			getList()
		}
	}

	const deletedUser = async (record) => {
		console.log(record)
		let params={}
		params.user_id=record.user_id
		console.log(params)
		let res = await deletedSomeUser(params)
		if (res.success) {
			message.success('修改成功')
			getList()
		}
	}

	const currentChange = () => {
		getList()
	};

	//页面数据
	const [addTagModal, setAddTagModal] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getList();
	}, []);
	const getList = () => {
		setLoading(true)
		let params = {}
		params.limit = 10
		params.start = currentPage - 1
		params.pagination = 1
		if (time.length) {
			params.start_time = dayjs(time[0]).unix()
			params.end_time = dayjs(time[1]).unix()
		}
		if (name) {
			params.name = name
		}
		getUserList(params).then(res => {
			console.log(res)
			if (res.success) {
				setLoading(false)
				res.data.forEach(item => {
					console.log(item)
					item.key = item.user_id
				})
				setDataSource(res.data)
				setCount(res.count)
			}
		})
	};

	return (
		<div>
			<div className="filter-content">
				<Row gutter={16}>
					<Col span={5}>
						<div>
							<Input placeholder="请输入用户名"/>
						</div>
					</Col>
					<Col span={5}>
						<div>
							<RangePicker placeholder={['最后登录时间', '最后登录时间']} value={time} onChange={timeChange}/>
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
							onClick={openAddTagModal}
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
				userInfoModal ?
					<ViewUserInfo userInfo={currentData} userInfoModal={userInfoModal} closeUserInfo={closeUserInfo}/> : null
			}
			{
				editUserAuthModal ? <EditAuth editUserAuthModal={editUserAuthModal} currentData={currentData}
																			closeEditUserInfo={closeEditUserInfo}/> : null
			}
		</div>
	);
});

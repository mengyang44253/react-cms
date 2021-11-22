//react引入
import React, {memo, useEffect, useState} from 'react'
import dayjs from "dayjs";
import {useHistory} from "react-router-dom";

//组件引入
import AuditArticle from '@/components/article/auditArticle'
import ViewArticleDetail from '@/components/article/viewArticleDetail'

//方法引入
import {
	fullTextFormat,
	articleStatusFormat,
	articleIsComment,
	secondFormat
} from '@/utils/filters'
import {
	articleList,
	deleteSomeArticle,
	changeArticleStatus
} from '@/api/article'

import {
	ArticleStatus
} from '@/utils/enumValue'

//antd引入
import {
	Button,
	Col,
	DatePicker,
	Input,
	Row,
	Spin,
	Popconfirm,
	Tooltip,
	Divider,
	Pagination,
	Table,
	message,
	Switch,
	Select
} from "antd";

import {
	PlusOutlined,
	DiffOutlined,
	FundViewOutlined,
	AuditOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";

const {RangePicker} = DatePicker;
const {Option}=Select


export default memo(function ArticleList() {
	const history = useHistory();


	//搜索数据
	const [name, setName] = useState("");

	const nameChange = (e) => {
		setName(e.target.value)
	};

	const [selectValue,setSelectValue]=useState(null)
	const changeSelectValue=(value)=>{
		setSelectValue(value)
	}

	const [time, setTime] = useState([])
	const timeChange = (date) => {
		setTime(date)
	}
	const reset = () => {
		setName("")
		setTime([])
		setSelectValue(null)
	};

	const search = () => {
		setCurrentPage(1)
		getList()
	};

	//表格数据
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [currentData, setCurrentData] = useState({})
	const columns = [
		{
			title: "文章标题",
			dataIndex: "title",
			key: "title",
			width: 200,
			ellipsis: true
		},
		{
			title: "文章内容",
			dataIndex: "content",
			key: "content",
			width: 300,
			ellipsis: true,
			render: (text) => {
				return fullTextFormat(text)
			}
		},
		{
			title: "分类目录",
			dataIndex: "label_data",
			key: "label_data",
			width: 150,
			render: (text, record) => {
				return text.filter(item => item.type === 2)
				.map(item => item.name)
				.join(",")
			}
		},
		{
			title: "标签",
			dataIndex: "label_data",
			key: "label_data",
			width: 150,
			render: (text) => {
				return text.filter(item => item.type === 1)
				.map(item => item.name)
				.join(",")
			}
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			width: 120,
			render: (text) => {
				return articleStatusFormat(text)
			}
		},
		{
			title: "文章是否可以被评论",
			dataIndex: "comment_status",
			key: "comment_status",
			width: 170,
			render: (text) => {
					return (
						<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text === 1} onChange={changeCommentStatus} />
						)

			}
		},
		{
			title: "创建时间",
			dataIndex: "create_time",
			key: "create_time",
			width: 200,
			render: (text) => {
				return secondFormat(text)
			}
		},
		{
			title: "操作",
			dataIndex: "handle",
			key: "handle",
			width: 180,
			fixed: "right",
			render: (text, record) => {
				return (
					<div>
						{
							record.status === 1 ? (
								<>
									<Popconfirm title="确定要发布吗？" onConfirm={() => publish(record)}>
										<Tooltip placement="top" title="发布">
											<DiffOutlined twoToneColor="#279acc"/>
										</Tooltip>
									</Popconfirm>
									<Divider type="vertical"/>
								</>
							) : null
						}

						{
							record.status !== 1 ? (
								<>
									<span className="control-btn green" onClick={() => auditSomeArticle(record)}>
              <Tooltip placement="top" title="审核">
                <AuditOutlined twoToneColor="#00aaa6"/>
              </Tooltip>
            </span>
									<Divider type="vertical"/>
								</>
							) : null
						}
						<span onClick={() => viewArticleDetail(record)}>
							<Tooltip placement="top" title="查看">
								<FundViewOutlined twoToneColor="#00a854"/>
							</Tooltip>
						</span>
						<Divider type="vertical"/>
						<span className="control-btn blue" onClick={() => {
							history.push(`/home/article/editArticle/${record.id}`)
						}}>
              <Tooltip placement="top" title="修改">
                <EditOutlined twoToneColor="##0066cc"/>
              </Tooltip>
            </span>
						<Divider type="vertical"/>
						<Popconfirm title="确定删除吗?" onConfirm={() => deletedArticle(record)} okText="确定" cancelText="取消">
              <span className="control-btn red">
                <Tooltip placement="top" title="删除">
                  <DeleteOutlined twoToneColor="#ff3333"/>
                </Tooltip>
              </span>
						</Popconfirm>
					</div>
				)
			}
		}
	]


	const changeCommentStatus=async (checked,event)=>{
		console.log(checked)
		console.log(event)
	}

	const publish = async (record) => {
		let params = {}
		params.id = record.id
		params.status = 2
		let res = await changeArticleStatus(params)
		if (res.success) {
			message.success("发布成功")
			getList()
		}
	}
	const [showDetail,setShowDetail]=useState(false)
	const viewArticleDetail = async (record) => {
		setCurrentData(record)
		setShowDetail(true)
	}
	const closeShowDetail=()=>{
		setShowDetail(false)
	}

	const auditSomeArticle = async (record) => {
		setCurrentData(record)
		setAddModal(true)
	}
	const deletedArticle = async (record) => {
		console.log(record)
		let params = {}
		params.id = record.id
		console.log(params)
		let res = await deleteSomeArticle(params)
		if (res.success) {
			message.success("删除成功")
			getList()
		}
	}


	const currentChange = (value) => {
		setCurrentPage(value)
	};

	//页面数据
	const [addModal, setAddModal] = useState(false);
	const closeModal = (value) => {
		setAddModal(false)
		getList()
	}
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getList()
	}, [currentPage])
	const getList = async () => {
		setLoading(true)
		let params = {}
		params.pagination = 1
		params.limit = 10
		params.start = currentPage - 1
		if (name) {
			params.name = name
		}
		if (selectValue) {
			params.status=selectValue
		}
		if (time.length) {
			params.start_time = dayjs(time[0]).unix()
			params.end_time = dayjs(time[1]).unix()
		}
		let res = await articleList(params)
		if (res.success) {
			setLoading(false)
			res.data.forEach(item => {
				item.key = item.id
			})
			console.log(res.data)
			setDataSource(res.data)
			setCount(res.count)
		} else {
			setLoading(false)
		}
	}


	return (
		<div>
			<div className="filter-content">
				<Row gutter={16}>
					<Col span={5}>
						<div>
							<Input placeholder="请输入文章标题" value={name} onChange={nameChange}/>
						</div>
					</Col>
					<Col span={5}>
						<div>
							<Select style={{width:'100%'}} placeholder="请选择状态" value={selectValue} onChange={changeSelectValue}>
								{
									ArticleStatus.map(item=>{
										return <Option value={item.value} key={item.value}>{item.label}</Option>
									})
								}
							</Select>
						</div>
					</Col>
					<Col span={6}>
						<div>
							<RangePicker value={time} onChange={timeChange} placeholder={["创建开始时间", "创建结束时间"]}/>
						</div>
					</Col>
					<Col span={4} offset={4}>
						<div>
							<Button className="fr resetBtn" onClick={reset}>重置</Button>
							<Button className="fr" type="primary" onClick={search}>搜索</Button>
						</div>
					</Col>
				</Row>
			</div>
			<div className="table-content">
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
				addModal ? <AuditArticle currentData={currentData} addModal={addModal} closeModal={closeModal}/> : null
			}
			{
				showDetail?<ViewArticleDetail showDetail={showDetail} closeShowDetail={closeShowDetail} currentData={currentData} />:null
			}
		</div>
	)
})

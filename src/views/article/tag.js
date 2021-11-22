//react引入
import React, {memo, useEffect, useState} from 'react'

//组件引入
import AddTag from '@/components/article/addTag'

//方法引入
import {
	tagList,
	deletedSomeTag
} from '@/api/label'


//antd引入
import {
	Button,
	Col,
	Input,
	Row,
	Spin,
	DatePicker,
	Pagination,
	Table,
	Popconfirm,
	Tooltip,
	message
} from "antd";

import {
	PlusOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import {secondFormat} from "../../utils/filters";

const {RangePicker} = DatePicker;


export default memo(function Tag() {
	//搜索数据
	const [name, setName] = useState("");
	const nameChange = (e) => {
		setName(e.target.value)
	};
	const [time,setTime]=useState([])
	const timeChange=(date)=>{
		setTime(date)
	}
	const reset = () => {
		setName("")
		setTime([])
	};

	const search = () => {
		setCurrentPage(1)
	};

	//表格数据
	const [showAddBtn, setShowAddBtn] = useState(true);


	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title:'标签名',
			dataIndex:'name',
			key:'name',
		},
		{
			title: "标签文章总和",
			dataIndex: "group_count",
			key:"group_count",
		},
		{
			title: "创建时间",
			dataIndex: "create_time",
			key:"create_time",
			render:(text)=>{
				return secondFormat(text)
			}
		},
		{
			title: "操作",
			dataIndex: "handle",
			key:'handle',
			width:100,
			render:(text,row)=>{
				return (
					<div>
						<Popconfirm title="确认删除吗？" okText="确认" cancelText="取消" onConfirm={()=>deleteTag(row)}>
                <span className="control-btn red">
                  <Tooltip placement="top" title="删除">
                  <DeleteOutlined twoToneColor="#ff3333" />
                </Tooltip>
                </span>
						</Popconfirm>
					</div>
				)
			}
		}
	]
	const deleteTag=async (value)=>{
		let params={}
		params.id=value.id
		let res=await deletedSomeTag(params)
		if (res.success) {
			message.success("删除成功")
			getList()
		}
	}
	const currentChange = (value) => {
		setCurrentPage(value)
	};

	//页面数据
	const [addTagModal, setAddTagModal] = useState(false);
	const openAddTagModal = () => {
		setAddTagModal(true)
	}
	const closeTagModal=(value)=>{
		setAddTagModal(false)
		if (value) {
			getList()
		}
	}
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getList()
	}, [currentPage])
	const getList = async () => {
		setLoading(true)
		let params={}
		params.pagination=1
		params.limit=10
		params.start=currentPage-1
		if (name) {
			params.name=name
		}
		if (time.length) {
			params.start_time=dayjs(time[0]).unix()
			params.end_time=dayjs(time[1]).unix()
		}
		let res=await tagList(params)
		if (res.success) {
			setLoading(false)
			res.data.forEach(item=>{
				item.key=item.id
			})
			setDataSource(res.data)
			setCount(res.count)
		}else{
			setLoading(false)
		}
	}


	return (
		<div>
			<div className="filter-content">
				<Row gutter={16}>
					<Col span={5}>
						<div>
							<Input placeholder="请输入标签名" value={name} onChange={nameChange}/>
						</div>
					</Col>
					<Col span={5}>
						<div>
							<RangePicker value={time} onChange={timeChange} placeholder={["创建开始时间","创建结束时间"]}/>
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
			<div className="table-content">
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
				addTagModal?<AddTag addTagModal={addTagModal} closeTagModal={closeTagModal} />:null
			}
		</div>
	)
})

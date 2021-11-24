//react引入
import React, { Fragment, memo, useEffect, useState } from "react";

import dayjs from "dayjs";
//组件引入

//方法引入
import { commentStatus } from "@/utils/enumValue";
import { textFormat,secondFormat,commentTypeFormat,commentStatusFormat } from "@/utils/filters";

import { commentList,commentStatusAudit,deletedComment} from "@/api/comment";

//antd引入
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Spin,
  Table,
  Tooltip,
  Select,
} from "antd";

import {
  AuditOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const { Option } = Select;

export default memo(function $END$() {
  //搜索数据
  const [name, setName] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const [time, setTime] = useState([]);
  const timeChange = (date) => {
    setTime(date);
  };
  const [select, setSelect] = useState(null);
  const selectChange = () => {
    setSelect();
  };
  const reset = () => {
    setName("");
    setTime([]);
  };

  const search = () => {
    setCurrentPage(1);
    getList();
  };

  //表格数据

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "评论文章",
      dataIndex: "article_data",
      key: "article_data",
      width: 100,
      ellipsis: true,
      render: (text) => {
        return textFormat(text.title);
      },
    },
    {
      title: "评论人名称",
      dataIndex: "from_name",
      key: "from_name",
      width: 100,
			ellipsis: true,
			render: (text) => {
				return textFormat(text)
			}
    },
    {
      title: "评论人邮箱",
      dataIndex: "from_email",
      key: "from_email",
      width: 100,
			ellipsis: true,
			render: (text) => {
				return textFormat(text)
			}
    },
    {
      title: "评论人网址",
      dataIndex: "from_website",
      key: "from_website",
      width: 100,
			ellipsis: true,
			render: (text) => {
				return textFormat(text)
			}
    },
    {
      title: "评论内容",
      dataIndex: "content",
      key: "content",
      width: 100,
      ellipsis: true,
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 100,
      ellipsis: true,
      render: (text) => {
        return commentTypeFormat(text)
      },
    },
    {
      title: "被评论人姓名",
      dataIndex: "to_name",
      key: "to_name",
      width: 100,
			ellipsis: true,
			render: (text) => {
				return textFormat(text)
			}
    },
    {
      title: "被评论人邮箱",
      dataIndex: "to_email",
      key: "to_email",
      width: 100,
			ellipsis: true,
			render: (text) => {
				return textFormat(text)
			}
    },
    {
      title: "被评论人网址",
      dataIndex: "to_website",
      key: "to_email",
      width: 100,
			ellipsis: true,
			render: (text) => {
				return textFormat(text)
			}
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
      width: 100,
			ellipsis: true,
			render: (text) => {
				return secondFormat(text)
			}
		},
		{
			title: "评论状态",
			dataIndex: "status",
			key: "status",
			width: 100,
			ellipsis: true,
			render: (text) => {
				return commentStatusFormat(text)
			}
		},
    {
      title: "操作",
      dataIndex: "handle",
      key: "handle",
      width: 100,
      render: (text, record) => {
        return (
          <div>
            {record && record.status === 1 ? (
              <Fragment>
                <Popconfirm
                  title="确定要审核通过吗？"
                  okText="通过"
                  cancelText="拒绝"
                  onConfirm={() => auditFriend(record, 2)}
                  onCancel={ ()=>auditFriend(record,3)}
                >
                  <Tooltip placement="top" title="审核">
                    <AuditOutlined twoToneColor="#00aaa6" />
                  </Tooltip>
                </Popconfirm>

                <Divider type="vertical" />
              </Fragment>
						) : null}
						<Popconfirm
              title="确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => deletedFriend(record)}
            >
              <Tooltip placement="top" title="删除">
                <DeleteOutlined twoToneColor="#ff3333" />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
	];
	const auditFriend = async (record,status) => {
		console.log(record)
		console.log(status)
		let params = {}
		params.id = record.id
		params.status = status
		let res = await commentStatusAudit(params)
		if (res.success) {
			getList()
		}
	}
	const deletedFriend = async (record) => {
		console.log(record)
		let params = {}
		params.id = record.id
		let res = await deletedComment(params)
		if (res.success) {
			getList()
		}
	}

	const currentChange = (value) => {
		setCurrentPage(value)
	};

  //页面数据
  const [addModal, setAddModal] = useState(false);
  const openAddModal = () => {
    setAddModal(true);
  };
  const closeModal = (value) => {
    setAddModal(false);
    if (value) {
      getList();
    }
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, [currentPage]);
  const getList = async () => {
    setLoading(true);
		let params = {};
    params.pagination = 1;
    params.limit = 10;
    params.start = currentPage - 1;
    if (name) {
      params.name = name;
    }
    if (time.length) {
      params.start_time = dayjs(time[0]).unix();
      params.end_time = dayjs(time[1]).unix();
    }
    if (select) {
      params.status = select;
    }
    let res = await commentList(params);
    if (res.success) {
      setLoading(false);
      res.data.forEach((item) => {
        item.key = item.id;
      });
      setDataSource(res.data);
      setCount(res.count);
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="filter-content">
        <Row gutter={16}>
          <Col span={5}>
            <div>
              <Input placeholder="请输入评论人姓名" onChange={nameChange} />
            </div>
          </Col>
          <Col span={5}>
            <div>
              <RangePicker value={time} onChange={timeChange} />
            </div>
          </Col>
          <Col span={5}>
            <div>
              <Select
                style={{ width: 120 }}
                allowClear
                value={select}
								onSelect={selectChange}
								placeholder="评论状态"
              >
                {commentStatus.map((item) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </Col>
          <Col span={4} offset={5}>
            <div>
              <Button className="fr resetBtn" onClick={reset}>
                重置
              </Button>
              <Button className="fr" type="primary" onClick={search}>
                搜索
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="table-content">
        <div className="table-wrap">
          <Table
            scorll={{ x: 1500, scrollToFirstRowOnChange: true, y: 300 }}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
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
      <Spin className="loading" size="large" spinning={loading} />
    </div>
  );
});

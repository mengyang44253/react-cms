//react引入
import React, { memo, useEffect, useState, Fragment } from "react";

//组件引入
import AddFriend from "@/components/friend/addFriend";

//方法引入
import {
  adminFriendList,
  adminEditFriend,
  adminDeletedFriend,
  adminEditFriendStatus,
} from "@/api/friend";

import { friendStatusFormat } from "@/utils/filters";

//antd引入
import {
  Button,
  Spin,
  Row,
  Col,
  Input,
  DatePicker,
  Table,
  Pagination,
  Image,
  Tooltip,
  Divider,
  Popconfirm,
  message,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default memo(function Friend() {
  //搜索数据
  const [name, setName] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const [time, setTime] = useState([]);
  const timeChange = (date) => {
    console.log(date);
    setTime(date);
  };
  const reset = () => {};

  const search = () => {
    getList();
  };

  //表格数据
  const [showAddBtn, setShowAddBtn] = useState(true);
  const openAddModal = () => {
    setAddFriend(true);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [addFriend, setAddFriend] = useState(false);
  const [currentData, setCurrentData] = useState({});

  const closeAddFriend = (value) => {
    setAddFriend(false);
    setCurrentData({});
    if (value) {
      getList();
    }
  };

  const columns = [
    {
      title: "网站名",
      dataIndex: "name",
      key: "name",
      width: 100,
      ellipsis: true,
    },
    {
      title: "网站图标",
      dataIndex: "img",
      key: "img",
      width: 100,
      render: (text) => {
        return <Image width={100} height={100} src={text} />;
      },
    },
    {
      title: "网站网址",
      dataIndex: "website",
      key: "website",
      width: 200,
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => {
        return friendStatusFormat(text);
      },
    },
    {
      title: "操作",
      dataIndex: "handle",
      key: "handle",
      width: 100,
      render: (text, record) => {
        console.log(record);
        return (
          <div>
            {record && record.status === 1 ? (
              <Fragment>
                <Popconfirm
                  title="确定要审核通过吗？"
                  okText="通过"
                  cancelText="拒绝"
                  onConfirm={() => auditFriend(record, 2)}
                  // onCancel={ (record)=>auditFriend(record,3)}
                >
                  <Tooltip placement="top" title="审核">
                    <AuditOutlined twoToneColor="#00aaa6" />
                  </Tooltip>
                </Popconfirm>

                <Divider type="vertical" />
              </Fragment>
            ) : null}

            <span>
              <Tooltip placement="top" title="修改">
                <EditOutlined
                  twoToneColor="#0066cc"
                  onClick={() => editFriend(record)}
                />
              </Tooltip>
            </span>
            <Divider type="vertical" />
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

  const auditFriend = async (record, status) => {
    let params = {};
    params.id = record.id;
    params.status = status;
    let res = await adminEditFriendStatus(params);
    if (res.success) {
      message.success("审核成功");
      getList();
    }
  };

  const editFriend = (record) => {
    setCurrentData(record);
    setAddFriend(true);
  };

  const deletedFriend =async (record) => {
    console.log(record)
    let params={}
    params.id=record.id
    let res=await adminDeletedFriend(params)
    if (res.success) {
      message.success("删除成功")
      getList()
    }
	};

  const currentChange = () => {
    getList()
  };

  //页面数据
  const [addTagModal, setAddTagModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);
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
    let res = await adminFriendList(params);
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
              <Input placeholder="请输入网站名" onChange={nameChange} />
            </div>
          </Col>
          <Col span={5}>
            <div>
              <RangePicker value={time} onChange={timeChange} />
            </div>
          </Col>
          <Col span={4} offset={10}>
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
        <div className="add">
          {showAddBtn ? (
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={openAddModal}
            >
              添加
            </Button>
          ) : null}
        </div>
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
      {addFriend ? (
        <AddFriend
          addFriend={addFriend}
          closeAddFriend={closeAddFriend}
          currentData={currentData}
        />
      ) : null}
    </div>
  );
});

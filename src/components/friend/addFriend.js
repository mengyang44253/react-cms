//react引入
import React, { memo, useEffect, useState } from "react";

//组件引入
import FileUpload from "@/components/fileUpload";

//方法引入
import { adminAddFriend, adminEditFriend } from "@/api/friend";

//antd引入
import { Button, Form, Modal, Input, Image, message } from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export default memo(function AddFriend(props) {
  const { addFriend, closeAddFriend, currentData } = props;

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const [form] = Form.useForm();

  //页面数据
  const [btnLoading, setBtnLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [AvatarLoading, setAvatarLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const avatarChange = (value) => {
    console.log(value);
    setAvatar(value);
    console.log(avatar);
  };
  const startUploadImage = () => {
    setAvatarLoading(true);
  };
  const endUploadImage = () => {
    setAvatarLoading(false);
  };

  const handleCancel = () => {
    closeAddFriend();
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (!avatar) {
        message.error("请上传头像");
      }
      setBtnLoading(true);
      console.log(values);
      let params = {};
      params.name = values.name;
      params.img = avatar;
      params.website = values.website;
			params.status = 1;
			let res
			if (currentData.id) {
				params.id = currentData.id
				res=await adminEditFriend(params)	
			} else {
				res = await adminAddFriend(params);
				
			}
      console.log(res);
			if (res.success) {
				if (currentData.id) {
					message.success("修改成功");
				} else {
					message.success("添加成功");
				}
        setBtnLoading(false);
        closeAddFriend(1);
      }
    });
  };

  useEffect(() => {
    console.log(currentData);
    if (currentData.id) {
      setTitle("修改友链");
      form.setFieldsValue({
        name: currentData.name,
        website: currentData.website,
      });
      setAvatar(currentData.img);
    } else {
      setTitle("添加友链");
    }
  });

  return (
    <Modal
      title={title}
      visible={addFriend}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
      confirmLoading={btnLoading}
    >
      <Form form={form} {...layout}>
        <Form.Item
          label="网站名"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入网站名",
            },
          ]}
        >
          <Input placeholder="请输入网站名" />
        </Form.Item>
        <Form.Item label="网站图标" name="img">
          <FileUpload
            avatarChange={(value) => avatarChange(value)}
            startUploadImage={startUploadImage}
            endUploadImage={endUploadImage}
          >
            {avatar ? (
              <Image preview={false} width={100} height={100} src={avatar} />
            ) : (
              <div>
                {AvatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
              </div>
            )}
          </FileUpload>
        </Form.Item>
        <Form.Item
          label="网址"
          name="website"
          rules={[
            {
              required: true,
              message: "请输入网址",
            },
          ]}
        >
          <Input placeholder="请输入网址" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

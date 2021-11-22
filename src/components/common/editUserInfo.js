import React,{useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import dayjs from 'dayjs'


import FileUpload from '@/components/fileUpload'
import CountrySelect from '@/components/common/CountrySelect'
import CitySelect from '@/components/common/CitySelect'

import {
	updateUserInfo
} from '@/api/user'
import {getUserInfoById} from "@/store/action";

import {Modal,Form,Input,DatePicker,Radio,Alert,Image,Row,Col,message} from 'antd'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


export default function EditUserInfo(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch()
	const layout = {
		labelCol: {span: 5},
		wrapperCol: {span: 19},
	};

	const userInfo = useSelector((state) => state.userInfo);
	const {id,avatar,name,birth,phone,country,city,gender}=userInfo

	const [countryId, setCountryId] = useState(country);
	const countryChange=(value)=>[
		setCountryId(value)
	]
	const [cityId, setCityId] = useState(city);
	const cityChange=(value)=>{
		console.log(value)
		setCityId(value)
	}

	const [userName,setName]=useState(name)
	const userNameChange=async (e)=>{
		console.log(e)
		setName(e.target.value)
	}
	//
	const [timeValue,setTimeValue]=useState(null)
	const timeChange=(e)=>{
		console.log(e)
		setTimeValue(e)
	}

	const [userPhone,setUserPhone]=useState(phone)
	const phoneChange=(e)=>{
		setUserPhone(e.target.value)
	}

	const [genderValue,setGenderValue]=useState(gender)
	const genderChange=e=>{
		setGenderValue(e.target.value)
	}

	const handleCancel=()=>{
		form.resetFields();
		props.clearUserModal();
	}

	const [btnLoading,setBtnLoading]=useState(false)

	const handleOk=()=>{
		form.validateFields().then(async (values)=>{
			setBtnLoading(true)
			console.log(values)
			let params={}
			params.id=id
			params.avatar=Avatar||null
			params.name=values.name
			params.birth=values.birth?dayjs(values.birth).unix():null
			params.phone=values.phone||null
			params.country=countryId
			params.city=cityId||null
			params.gender=values.gender||null
			updateUserInfo(params).then(res=>{
				if (res.success) {
					dispatch(getUserInfoById(id))
					setBtnLoading(false)
					message.success('修改成功')
					props.clearUserModal()
				}
			})

		})
	}
	const [Avatar,setAvatar]=useState(avatar)
	const [AvatarLoading,setAvatarLoading]=useState(false)
	const startUploadImage=()=>{
		setAvatarLoading(true)
	}
	const endUploadImage=()=>{
		setAvatarLoading(false)
	}
	const avatarChange=(value)=>{
		console.log(value)
		setAvatar(value)
	}

	//设置表单初始值
	useEffect(() => {
		form.setFieldsValue({
			name: name,
			birth: (birth?dayjs.unix(birth):null),
			phone: phone,
			gender:gender
		});
	}, [userInfo]);

	return (
		<Modal destroyOnClose={true} forceRender getContainer={false} title="编辑个人信息" visible={props.infoModal} onOk={handleOk} onCancel={handleCancel} confirmLoading={btnLoading}>
			<Form {...layout} form={form} preserve={false} validateTrigger={'onBlur'}>
				<Form.Item name='avatar' label="用户头像">
					<FileUpload avatarChange={(value)=>avatarChange(value)} startUploadImage={startUploadImage} endUploadImage={endUploadImage}>
						{
							Avatar?(
								<Image preview={false} width={100} src={Avatar} />
							):(
								<div>
									{AvatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
								</div>
							)
						}
					</FileUpload>
				</Form.Item>
				<Form.Item name="name" label="用户名" rules={[
					{
						required:true,
						message:'请填写用户名'
					}
				]}>
					<Input value={userName} onChange={userNameChange} />
				</Form.Item>
				<Form.Item name='birth' label="出生年月日">
					<DatePicker value={timeValue} style={{width:'100%'}} onChange={timeChange} />
				</Form.Item>
				<Form.Item name='phone' label="电话">
					<Input value={userPhone} onChange={phoneChange} />
				</Form.Item>
				<Form.Item label="所在地">
					<Row gutter={16}>
						<Col className="gutter-col" span={12}>
							{
								props.infoModal?(
									<CountrySelect defaultCountry={countryId} countryChange={(value)=>countryChange(value)} />
								):null
							}
						</Col>
						<Col className="gutter-col" span={12}>
							{
								props.infoModal?(
									<CitySelect defaultCity={cityId} countryId={countryId} cityChange={(value)=>cityChange(value)} />
								):null
							}
						</Col>
					</Row>
				</Form.Item>
				<Form.Item name='gender' label="性别">
					<Radio.Group value={genderValue} onChange={genderChange}>
						<Radio value={1}>男</Radio>
						<Radio value={2}>女</Radio>
					</Radio.Group>
				</Form.Item>
			</Form>
			<Alert message="注：此信息仅为项目模拟数据，无其他用途" type="info"/>
		</Modal>
	)
}

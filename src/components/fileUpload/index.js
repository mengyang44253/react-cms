import React,{memo} from "react";

import {Upload,message} from "antd";

import oss from 'ali-oss'

import dayjs from "dayjs";

import ossInfo from '@/config/oss'

import MD5 from '@/utils/MD5'

import {
	getFileTypeByType,
	getFileName,
	getFileType
} from '@/utils/filters'

export default memo(function FileUpload (props) {
	const client=(self)=>{
		return new oss({
			region:ossInfo.ossData.region,
			accessKeyId:ossInfo.ossData.accessKeyId,
			accessKeySecret:ossInfo.ossData.accessKeySecret,
			bucket:ossInfo.ossData.bucket
		})
	}

	const UploadToOss=(self,path,file)=>{
		//上传阿里云的目录
		const directory='ams'
		return new Promise((resolve,reject)=>{
			client(self).multipartUpload(`${directory}/${path}`,file).then(data=>{
				resolve(data)
			}).catch(err=>{
				reject(err)
			})
		})
	}

	const handleGetImage=async (name)=>{
		const store=oss({
			region:ossInfo.ossData.region,
			accessKeyId:ossInfo.ossData.accessKeyId,
			accessKeySecret:ossInfo.ossData.accessKeySecret,
			bucket:ossInfo.ossData.bucket
		})
		// 此处调用ali-oss的signatureUrl获取文件对应访问路径
		const imageUrl=store.signatureUrl(name)
		let url=imageUrl.split("?")
		//上传结束事件
		props.endUploadImage && props.endUploadImage()
		props.avatarChange&&props.avatarChange(url[0])
	}


	const beforeUpload=(file)=>{
		const typeName=getFileTypeByType(file)
		const ISIMAGE=typeName === 'image'
		if (!ISIMAGE) {
			message.error('请上传图片文件!');
			return false
		}
		const ISLT1M=(file.size/1024/1024)<1
		if (!ISLT1M) {
			message.error('文件大小必须小于1MB!');
			return false
		}
		const reader=new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend=()=>{
			//开始上传事件
			props.startUploadImage &&props.startUploadImage()
			let name=MD5(`${dayjs().valueOf()}${getFileName(file.name)}`)
			name+='.'+getFileType(file.name)
			UploadToOss(this,name,file).then(res=>{
				handleGetImage(res.name)
			}).catch(err=>{
				console.log(err)
			})
		}
	}




	return (
			<Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} beforeUpload={beforeUpload} accept="image/*">
				{props.children}
			</Upload>
	)
})
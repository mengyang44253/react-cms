
import dayjs from "dayjs";
import {ArticleStatus,articleCommentStatus,friendStatus,genderStatus,commentStatus,commentType} from '@/utils/enumValue'//获取文章状态



//公共过滤器,用于生成不同的过滤器
const commonFormat=function(dataList,label='label'){
	return function (input){
		if(input === false ||input === null || input === undefined ||input === ''){
			return '-'
		}
		let current = dataList.find(item=>{
			return item.value === input
		})
		if(current){
			return current[label]
		}else{
			return '-'
		}
	}
}


//文本格式化 无数据显示-
export function textFormat(input) {
	if (!input || input === "" || input === "null" || input === "undefined") {
		return "-";
	}
	return input;
}

//数字格式化
export function numnerFormat(input,format){
	input=parseFloat(input);
	if(isNaN(input)){
		return '-'
	}else{
		format=format?format:2
		return parseFloat((input*1).toFixed(format))
	}
}

//时间格式化
export function dateFormat(input,format){
	format=format|| 'LLLL'
	const formatKey={
		YM: "YYYY-MM",
		L: "MM-DD",
		LL: "YYYY-MM-DD",
		LLL: "YYYY-MM-DD HH:mm",
		LLLL: "YYYY-MM-DD HH:mm:ss",
		LLLLSS: "YYYY-MM-DD HH:mm:ss SS",
		T: "HH:mm",
		TT: "HH:mm:ss",
		LT: "MM-DD HH:mm"
	}
	format=formatKey(format)
	const date=dayjs(input,"YYYYMMDDHHmmssSS")
	if(date.isValid()){
		input=date.format(format)
	}else{
		input ='-'
	}
	return input
}

//秒级时间戳转化为时间
export function secondFormat(input, format) {
	if (!input) return "-";
	format = format || "LLLL";
	const formatKey = {
		Y: "YYYY",
		YM: "YYYY-MM",
		L: "MM-DD",
		LL: "YYYY-MM-DD",
		LLL: "YYYY-MM-DD HH:mm",
		LLLL: "YYYY-MM-DD HH:mm:ss",
		LLLLSS: "YYYY-MM-DD HH:mm:ss SS",
		T: "HH:mm",
		TT: "HH:mm:ss",
		LT: "MM-DD HH:mm",
	};
	format = formatKey[format];
	const date = dayjs.unix(input);
	if (date.isValid()) {
		input = date.format(format);
	} else {
		input = "-";
	}
	return input;
}

//获取文件后缀名
export function getFileType(filePath){
	console.log(filePath)
	let startIndex=filePath.lastIndexOf(".")
	if(startIndex !== -1){
		return filePath.substring(startIndex+1,filePath.length);
	}else return ""
}
//是否是image文件
export function getFileTypeByType(file){
	return (file && file.type.substring(0,file.type.indexOf('/')))||''
}

//获取文件名
export function getFileName(filePath){
	if(!filePath){
		return "-"
	}else{
		return filePath.replace(/(.*\/)*([^.]+).*/gi,"$2")
	}
}

//获取文件尺寸
export function getFileSize(fileByte){
	let fileSizeByte=fileByte
	let fileSizeMsg=""
	if(fileSizeByte<1048576){
		fileSizeMsg=(fileSizeByte/1024).toFixed(2)+"KB"
	}else if(fileSizeByte === 1048576){
		fileSizeMsg="1MB";
	}else if(fileSizeByte>1048576 && fileSizeByte<1073741824){
		fileSizeMsg=(fileSizeByte/(1024*1024)).toFixed(2)+"MB"
	}else if(fileSizeByte>1048576 && fileSizeByte === 1073741824){
		fileSizeMsg="1GB"
	}else if(fileSizeByte>1073741824 &&fileSizeByte<1099511627776){
		fileSizeMsg=(fileSizeByte / (1024 * 1024 * 1024)).toFixed(2)+"GB"
	}else {
		fileSizeMsg=">1TB"
	}
	return fileSizeMsg
}

//文章状态过滤器
export function articleStatusFormat(input){
	if(!input) return '-'
	let current =ArticleStatus.find(item=>{return item.value === input})
	if (current) {
		return current[`label`]
	}else{
		return '-'
	}
}

//文章是否可以被评论
export function articleIsComment(input){
	let current=articleCommentStatus.find(item=>item.value === input)
	if (current) {
		return current[`label`]
	}else{
		return '-'
	}
}

//将富文本过滤为纯文本
export const fullTextFormat=function (input,length){
	let str=input.replace(/<[^<>]+>/g,"").replace(/&nbsp;/ig, "").replace(/\s+/g,"")
	let result
	if(length){
		if(str.length>length){
			result=str.slice(0,length)+"...";
		}else{
			result=str.slice(0,length)
		}
	}else{
		result=str
	}
	return result
}

//友链状态
export const friendStatusFormat=commonFormat(friendStatus)

//性别
export const genderFormat=commonFormat(genderStatus)

//评论状态
export const commentStatusFormat = commonFormat(commentStatus)

//评论类型
export const commentTypeFormat=commonFormat(commentType)


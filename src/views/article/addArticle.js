//react引入
import React,{memo,useState,useEffect} from "react";


import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";


//组件引入
import {AddArticleWrap } from './style.js'

import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

//方法引入
import {
	tagList,
	directoryList
} from '@/api/label'
import {
	addArticle
} from '@/api/article'
import {
	tree
} from '@/utils'

//antd引入
import {
	Select,
	Input,
	Button,
	Tree,
	message
} from 'antd'

import {

} from '@ant-design/icons'

const {Option}=Select

const mdParser = new MarkdownIt()



export default  memo(function AddArticle() {


	//页面数据
	const history = useHistory();
	const [inputValue,setInputValue]=useState(null)
	const titleChange=(e)=>{
		setInputValue(e.target.value)
	}
	const [mdValue, setMdValue] = useState("");
	const [mdHtml,setMdHtml]=useState("")
	const handleEditorChange=({html,text})=>{
		setMdValue(text)
		setMdHtml(html)
	}
	const [btnLoading,setBtnLoading]=useState(false)



	const [directoryData, setDirectoryData] = useState([]);
	const getDirectoryList=()=>{
		directoryList().then(res=>{
			console.log(res)
			let data=tree(res.data)
			console.log(data)
			data.forEach(ee=>{
				ee.title=ee.name
				ee.key=ee.id
				if (ee.children) {
					ee.disabled=true
					ee.children.forEach(eee=>{
						eee.title=eee.name
						eee.key=eee.id
					})
				}
			})
			console.log(data)
			setDirectoryData(data)
		})
	}
	const [selectDirectory, setSelectDirectory] = useState([]);
	const selectSomeDirectory = (checkedKeysValue) => {
		setSelectDirectory(checkedKeysValue)
	}
	const [tagData, setTagData] = useState([]);
	const getTagList=()=>{
		console.log(111)
		tagList().then(res=>{
			console.log(res)
			if (res.success) {
				res.data.forEach(item=>{
					item.key=item.id
				})
				setTagData(res.data)
			}
		})
	}
	const [selectTag, setSelectTag] = useState([]);
	const tagSelectSome = (value) => {
		setSelectTag(value)
	}

	//获取数据
	useEffect(()=>{
		getDirectoryList()
		getTagList()
	},[])
	const userInfo = useSelector(state => state.userInfo)

	const publish=async (value)=>{
		if (!inputValue) {
			message.warning('标题不能为空')
			return
		}
		if (!mdValue) {
			message.warning('请输入内容')
			return
		}
		if (selectDirectory.length === 0) {
			message.warning('请选择分类目录')
			return
		}
		if (selectTag.length === 0) {
			message.warning('请选择标签')
			return
		}
		setBtnLoading(true)
		let params={}
		params.title=inputValue
		params.content=mdValue
		params.content_html=mdHtml
		params.directory=selectDirectory.join(",")
		params.tag=selectTag.join(",")
		params.author=userInfo.user_id
		params.status=value
		let res= await addArticle(params)
		if (res.success) {
			setBtnLoading(false)
			message.success("添加文章成功")
			history.push("/home/article/articleList")
		}else{
			setBtnLoading(false)
		}
	}

	return (
		<AddArticleWrap>
			<div className="name">添加文章</div>
			<div className="content-wrap clearfix">
				<div className="left">
					<div className="title-wrap">
						<div className="title">标题</div>
						<div className="input-wrap">
							<Input placeholder="请输入标题" value={inputValue} onChange={titleChange} />
						</div>
					</div>
					<div className="md">
						<MdEditor
							style={{height: "600px", width: "1050px"}}
							renderHTML={(text) => mdParser.render(text)}
							onChange={handleEditorChange}
						/>
					</div>
				</div>
				<div className="right">
					<div className="btn mb50 tc">
						<Button className="mr20" loading={btnLoading} onClick={()=>publish(1)}>
							存为草稿
						</Button>
						<Button loading={btnLoading} type="primary" onClick={()=>publish(2)}>
							发布
						</Button>
					</div>
					<div className="directory mb50">
						<div className="directory-title">目录</div>
						<div>
							{
								directoryData.length?(
									<Tree checkable defaultExpandAll={true} onCheck={selectSomeDirectory} treeData={directoryData} />
								):null
							}
						</div>
					</div>
					<div className="tag mb50">
						<div className="tag-title">标签</div>
						<div>
							<Select style={{width:"200px"}} mode="tags" placeholder="标签" onChange={tagSelectSome}>
								{
									tagData.length && tagData.map(item=>{
										return (
											<Option key={item.id} value={item.id}>
												{item.name}
											</Option>
										)
									})
								}
							</Select>
						</div>
					</div>
				</div>
			</div>
		</AddArticleWrap>
	)
})
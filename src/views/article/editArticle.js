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
	editArticle,
	getArticleDetailById
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



export default  memo(function EditArticle() {
	const mdEditors = React.useRef(null);
	//页面数据
	const history = useHistory();
	const [inputValue,setInputValue]=useState(null)
	const titleChange=(e)=>{
		setInputValue(e.target.value)
	}
	const [mdValue, setMdValue] = useState("");
	const [contentHtml,setContentHtml]=useState("")
	const handleEditorChange=({html,text})=>{
		setMdValue(text)
		setContentHtml(html)
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
	const [defaultDirectory,setDefaultDirectory]=useState([])
	const selectSomeDirectory = (checkedKeysValue) => {
		setSelectDirectory(checkedKeysValue)
	}
	const [tagData, setTagData] = useState([]);
	const getTagList=()=>{
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
		getDetail()
		getDirectoryList()
		getTagList()
	},[])
	const id=history.location.pathname.split('/').pop()
	const [detail,setDetail]=useState(null)
	const getDetail=async ()=>{
		let params={}
		params.id=id
		let res=await getArticleDetailById(params)
		if (res.success) {
			setDetail(res.data)
			setInputValue(res.data.title)
			setMdValue(res.data.content)
			setContentHtml(res.data.content_html)
			mdEditors.current.setText(res.data.content)
			let directory=res.data.label_data.filter(item=>item.type ===2).map(item=>item.id)
			setDefaultDirectory(directory)
			setSelectDirectory(directory)
			let tag=res.data.label_data.filter(item=>item.type ===1).map(item=>item.id)

			setSelectTag(tag)
		}
	}
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
		params.id=detail.id
		params.title=inputValue
		params.content=mdValue
		params.content_html=contentHtml
		params.directory=selectDirectory.join(",")
		params.tag=selectTag.join(",")
		params.status=value
		let res= await editArticle(params)
		if (res.success) {
			setBtnLoading(false)
			message.success("修改文章成功")
			history.push("/home/article/articleList")
		}else{
			setBtnLoading(false)
		}
	}

	return (
		<AddArticleWrap>
			<div className="name">修改文章</div>
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
							ref={mdEditors}
							style={{height: "600px", width: "1050px"}}
							renderHTML={(text) => mdParser.render(text)}
							onChange={handleEditorChange}
						/>
					</div>
				</div>
				<div className="right">
					<div className="btn mb50 tc">
						<Button loading={btnLoading} type="primary" onClick={()=>publish(2)}>
							保存
						</Button>
					</div>
					<div className="directory mb50">
						<div className="directory-title">目录</div>
						<div>
							{
								directoryData.length?(
									<Tree checkable defaultExpandAll={true} onCheck={selectSomeDirectory} treeData={directoryData} defaultCheckedKeys={defaultDirectory} />
								):null
							}
						</div>
					</div>
					<div className="tag mb50">
						<div className="tag-title">标签</div>
						<div>
							<Select style={{width:"200px"}} mode="tags" placeholder="标签" onChange={tagSelectSome} value={selectTag}>
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
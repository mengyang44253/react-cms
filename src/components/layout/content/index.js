import React from "react";

import { Switch,Route } from "react-router-dom";

import PrivateRouter from '@/components/PrivateRouter'

import AddArticle from '@/views/article/addArticle'
import ArticleList from '@/views/article/articleList'
import EditArticle from '@/views/article/editArticle'
import Tag from '@/views/article/tag'
import Directory from '@/views/article/directory'

import Comment from '@/views/comment/index'

import Friend from '@/views/friend'

import Front from '@/views/home/home'
import User from '@/views/system/user'
import Role from '@/views/system/role'



export default function LayoutContent() {
	return (
		<Switch>
			<PrivateRouter exact path="/home" component={Front} />

			<PrivateRouter exact path="/home/article/addArticle" component={AddArticle} />
			<PrivateRouter exact path="/home/article/articleList" component={ArticleList} />
			<PrivateRouter exact path="/home/article/editArticle/:id" component={EditArticle} />
			<PrivateRouter exact path="/home/article/tag" component={Tag} />
			<PrivateRouter exact path="/home/article/directory" component={Directory} />

			<PrivateRouter exact path="/home/comment" component={Comment} />

			<PrivateRouter exact path="/home/friend" component={Friend} />

			<PrivateRouter exact path="/home/system/user" component={User} />
			<PrivateRouter exact path="/home/system/role" component={Role} />


		</Switch>
	)
}
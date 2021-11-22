const path=require('path')
const CracoLessPlugin = require('craco-less');
const resolve = (dir) => path.resolve(__dirname, dir);
const AntdDayjsWebpackPlugin =require('antd-dayjs-webpack-plugin');

module.exports = {
	webpack: {
		alias: {
			"@": resolve("src"),
			"~": resolve("src")
		},
		plugins: [new AntdDayjsWebpackPlugin()],
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': '#1890ff' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
	babel: {
		plugins: [
			[
				"import",
				{
					libraryName: "antd",
					style: true,
				},
			],
		],
	},
};
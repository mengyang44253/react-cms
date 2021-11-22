import axios from "axios";

const qs = require("qs")

const TIMEOUT = 5000;
const devBaseURL = '/api'
const baseURL = devBaseURL

const Http = axios.create({
	timeout: TIMEOUT,
	baseURL: baseURL
});

Http.interceptors.request.use((config) => {
			// for (let key in config.data) {
			//   if (config.data && !config.data._NOCLEAR) {
			//     if (config.data[key] === '' || config.data[key] === undefined || config.data[key] === null) {
			//       if (config.data._EMPTYITEM && config.data._EMPTYITEM.indexOf(key) !== -1) {
			//
			//       } else {
			//         delete config.data[key]
			//       }
			//     }
			//   }
			// }
			//
			// if (config.data && config.data._DELETEITEM) {
			//   config.data._DELETEITEM.forEach(item => {
			//     delete config.data[item]
			//   })
			//   delete config.data._DELETEITEM
			// }
			// if (config.data && config.data._EMPTYITEM) delete config.data._EMPTYITEM
			// if (config.data && config.data._NOCLEAR) delete config.data._NOCLEAR


			if (config.method === 'post') {
				config.data = qs.stringify(config.params)
				config.params = {}
			}
			// config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			return config;
		},
		(err) => {
			return err;
		}
);

Http.interceptors.response.use(
		(response) => {
			return response.data;
		},
		(err) => {
			if (err & err.message) {
				switch (err.response.status) {
					case 400:
						err.message = "请求错误";
						break;
					case 401:
						err.message = "未授权访问";
						break;
					default:
						break;
				}
			}
			return err
		}
);

export default Http
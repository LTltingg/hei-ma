// 基于axios封装的请求模块
import axios from 'axios'
// 接收axios的返回值
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})
export default request

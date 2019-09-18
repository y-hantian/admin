import axios from 'axios'
import { getStorageItem, setStorageItem } from '@/utils'
const baseURL = 'http://vip.skbanyou.com/api'

// 创建实例
const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(function (config) {
  let url = config.url
  if (url.indexOf('Login') > -1) {
    setStorageItem('token', '')
    config.headers.authorization = ''
  }
  if (url.indexOf('user') > -1 || url.indexOf('pay') > -1) {
    config.headers.authorization = getStorageItem('token')
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
instance.interceptors.response.use(function (res) {
  // console.log(res)
  if (res.headers.token) {
    setStorageItem('token', res.headers.token)
  }
  return res
}, function (err) {
  return err
})
export default instance

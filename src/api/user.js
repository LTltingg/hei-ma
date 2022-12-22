/**
 * 用户相关请求模块
 */

import request from '../utils/request'
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    // Es6中当属性名与属性值同名的时候可以简写
    // data:data
    data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

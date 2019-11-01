import request from '@/utils/request'

export function login(data) {
  data["grant_type"]= 'password'
  return request({
    url: '/api/auth/oauth/token',
    method: 'post',
    data,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/etp/user/info',
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: '/api/auth/oauth/token?access_token='+ token,
    method: 'DELETE'
  })
}

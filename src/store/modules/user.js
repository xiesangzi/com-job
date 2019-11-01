import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const user = {
  state: {
    token: getToken(),
    name: '',
    phone: '',
    openId:'',
    tenantId: '', 
    avatar: '',
	companyId:"",
	meunStatus:1
	
	
  },
  mutations: {
	changeMeunStatus(state,newIndex){
		state.meunStatus=newIndex
	},
	companyInfo(state,v){
		state.companyId=v
	},
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_OPEN_ID: (state, openId) => {
      state.openId = openId
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          if(response.success){
            commit('SET_TOKEN', response.access_token)
            setToken('Bearer ' + response.access_token)
            resolve()
          }else{
              reject(response);
          }
        }).catch(error => {
           reject(error)
        })
      })
    },
  
    // get user info
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if(response.data == undefined){
           reject("你不是企业用户！");
           return;
          }
          commit('SET_NAME', response.data.name)
          commit('SET_PHONE', response.data.phone)
          commit('SET_OPEN_ID', response.data.openId)
          commit('SET_TENANT_ID', response.data.tenantId)
          commit('SET_AVATAR', response.data.avatar)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  
    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
		var token = state.token;
		commit('SET_TOKEN', '')
		removeToken()
        logout(token).then(() => {
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }

  
}
  

export default  user;


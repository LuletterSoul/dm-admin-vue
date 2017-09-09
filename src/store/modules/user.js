import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    lastLoginTime :''
  },

  mutations: {
    SET_CODE:(state,code)=> {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_STATUS: (state,status)=>{
      state.status = status;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_LAST_LOGIN_TIME:(state,lastLoginTime) =>{
      state.lastLoginTime = lastLoginTime;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        login(email, userInfo.password).then(response => {
          const data = response.data;
          setToken(data.token);
          commit('SET_TOKEN', data.token);
          resolve();
        }).catch(error => {
          reject(error);
        })
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const profile = response.userProfile;
          commit('SET_ROLES', profile.role);
          commit('SET_NAME', profile.name);
          commit('SET_AVATAR', profile.avatar);
          commit('SET_INTRODUCTION', profile.introduction);
          commit('SET_LAST_LOGIN_TIME', profile.lastLoginTime);
          commit('SET_STATUS', profile.status);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    }
  }
};


function sleep(delay) {
  return function () {
    return new Promise((resolve, reject) =>{
      console.log("Begin sleep.");
      setTimeout(test(), 4000);
      console.log("Sleep end.");
    });
  };
}
function test() {
  console.log("test");
}
export default user;

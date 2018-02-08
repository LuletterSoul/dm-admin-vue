import { login, logout,getUserInfo,getUserRoles } from '@/api/login';
import { getToken,getPublicSalt } from '@/api/token';
import { removeToken,setUsername,getUsername} from '@/utils/auth';
import { computeEncryptPassword } from "@/utils/compute"

const user = {
  state: {
    username:'',
    password:'',
    user: '',
    status: '',
    code: '',
    token: '',
    name: '',
    birthday:'',
    avatar: '',
    introduction: '',
    roles: [],
    lastLoginTime :'2017-09-29 13:03:55',
    regionCode:'',
    gender:'',
    userProfile: {},
    timeOutToken:{},
  },

  mutations: {
    SET_USERNAME:(state,username)=>{
      state.username = username;
    },
    SET_CODE:(state,code)=> {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_TIME_OUT_TOKEN(state,timeOutToken) {
      state.timeOutToken = timeOutToken;
    },
    SET_PASSWORD(state,password) {
      state.password = password
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
    },
    SET_REGION_CODE:(state,regionCode) =>{
      state.regionCode = regionCode;
    },
    SET_GENDER(state,gender) {
      state.gender = gender;
    },
    SET_USER_PROFILE(state,profile) {
      state.userProfile = profile;
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim();
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response.data;
    //       setToken(data.token);
    //       setUsername(userInfo.username);
    //       commit('SET_TOKEN', data.token);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   });
    // },

    // Login({ commit }, userInfo) {
    //   const email = userInfo.username.trim();
    //   return new Promise((resolve, reject) => {
    //     login(email, userInfo.password).then(response => {
    //       setUsername(userInfo.username);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   });
    // },

    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        commit('SET_USERNAME', username);
        getPublicSalt(username).then(salt => {
          let password =computeEncryptPassword(userInfo.password, salt);
          commit('SET_PASSWORD',password);
          resolve(password);
        }).catch(error => {
          reject(error);
        })
      });
    },


    // GetTimeOutToken({commit},timeOutToken) {
    //   commit('SET_TIME_OUT_TOKEN', timeOutToken);
    // },


    // // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const profile = response.userProfile;
    //       commit('SET_ROLES', profile.roles);
    //       commit('SET_NAME', profile.name);
    //       commit('SET_AVATAR', profile.avatar);
    //       commit('SET_INTRODUCTION', profile.introduction);
    //       commit('SET_LAST_LOGIN_TIME', profile.lastLoginTime);
    //       commit('SET_STATUS', profile.status);
    //       commit('SET_REGION_CODE', profile.regionCode);
    //       commit('SET_GENDER', profile.gender);
    //       commit('SET_USER_PROFILE', profile);
    //       resolve(response);
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },
    GetToken({commit},username){
      return new Promise((resolve,reject) =>{
        getToken(username).then((token) =>{
          commit("SET_TOKEN", token);
          resolve(token);
        }).catch(error =>{
          reject(error);
        })
      })
    },

    // 获取用户信息
    GetInfo({commit},username) {
      return new Promise((resolve, reject) => {
        getUserInfo(username).then(response => {
          // const profile = response.userProfile;
          // commit('SET_ROLES', profile.roles);
          // commit('SET_NAME', profile.name);
          // commit('SET_AVATAR', profile.avatar);
          // commit('SET_INTRODUCTION', profile.introduction);
          // commit('SET_LAST_LOGIN_TIME', profile.lastLoginTime);
          // commit('SET_STATUS', profile.status);
          // commit('SET_REGION_CODE', profile.regionCode);
          // commit('SET_GENDER', profile.gender);
          commit('SET_AVATAR',response.avatar);
          commit('SET_USER_PROFILE', response);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },


    GetUserRoles({commit},username){
       return new Promise((resolve,reject) =>{
         getUserRoles(username).then((result)=>{
           commit('SET_ROLES', result);
           resolve(result);
         }).catch(error =>{
           reject(error);
         });
       })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
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
export default user;

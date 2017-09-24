const getters = {
  sidebar: state => state.app.sidebar,
  status: state => state.user.status,
  token: state => state.user.token,
  password:state => state.user.password,
  timeOutToken:state => state.user.timeOutToken,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userProfile: state =>state.user.userProfile
};
export default getters

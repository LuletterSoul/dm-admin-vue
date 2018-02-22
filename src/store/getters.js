const getters = {
  sidebar: state => state.app.sidebar,
  status: state => state.user.status,
  password:state => state.user.password,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  disposableToken: state => state.user.disposableToken,
  accessToken: state => state.user.accessToken,
  applyCredential:state => state.user.applyCredential,
  avatar: state => state.user.avatar,
  username: state => state.user.userProfile.username,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userProfile: state =>state.user.userProfile
};
export default getters

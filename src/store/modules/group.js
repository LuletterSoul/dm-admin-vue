const group = {
  state:{
    previewGroups:{},
    setting:{}
  },
  mutations:{
    SET_PREVIEW_GROUPS:(state,groups) =>{
      state.previewGroups = groups;
    },
    SET_SETTING: (state,setting) =>{
      state.setting = setting;
    }
  },
  actions:{
    SetPreviewGroups:({commit},groups) =>{
      commit('SET_PREVIEW_GROUPS', groups);
    },
    SetSetting:({commit,setting}) =>{
      commit('SET_SETTING', setting);
    }
  }
};

export default group;

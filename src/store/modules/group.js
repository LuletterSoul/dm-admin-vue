const group = {
  state:{
    divide:{
      previewGroups:{},
      setting:{},
      step:0
    },
  },
  mutations:{
    SET_PREVIEW_GROUPS:(state,groups) =>{
      state.divide.previewGroups = groups;
      console.log("Current previewGroups state:", state.divide.previewGroups);
    },
    SET_SETTING: (state,setting) =>{
      state.divide.setting = setting;
    },
    SET_STEP: (state,step) =>{
      state.divide.step = step;
    }
  },
  actions:{
    SetPreviewGroups:({commit},groups) =>{
      commit('SET_PREVIEW_GROUPS', groups);
    },
    SetSetting:({commit,setting}) =>{
      commit('SET_SETTING', setting);
    },
    SetStep:({commit},step) =>{
      commit('SET_STEP', step);
    }
  }
};

export default group;

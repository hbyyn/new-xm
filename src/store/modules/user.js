import {api, request} from '../../ajax'

const state = {
  user: {},
  role: [],
};
const mutations = {
  setUser(state,param){
    state.user=param
  },
  setRole(state,param){
    state.role=param
  }
}
//
const actions = {
  async getUserAction(context){
    let result= await request.post(api.SETTING_USER_API)
    let data = result.data.data;
    console.log(data)
    context.commit('setUser', data)
    let role=data.role_power.filter(item=>item.visible)
     console.log(role)
     context.commit('setRole', role)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

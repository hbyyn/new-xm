import { api, request } from "../../ajax";
const state = {
  user: ""
};
const mutations = {
  setUser(state, param) {
    state.user = param;
  }
};

const actions = {
  async getUserAction(context) {
    let result = await request.post(api.FORMAT_BASE_API);
    let data = result;
    console.log(data);
    context.commit("setUser", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

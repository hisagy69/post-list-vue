export default {
  namespaced: true,
  state: {
    isLoadData: true,
    users: [],
    user: {}
  },
  mutations: {
    setIsLoadData(state, isLoadData) {
      state.isLoadData = isLoadData;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    fetchUsers({commit}) {
      commit('setIsLoadData', true);
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => commit('setUsers', json))
        .catch(e => console.error(e))
        .finally(() => commit('setIsLoadData', false));
    },
    fetchUser({commit}, userId) {
      commit('setIsLoadData', true);
      return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(json => commit('setUser', json))
        .catch(e => e.message)
        .finally(() => commit('setIsLoadData', false));
    }
  }
}

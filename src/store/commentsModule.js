export default {
  namespaced: true,
  state: {
    comments: [],
    isLoadData: false
  },
  mutations: {
    setComments(state, comments) {
      state.comments = comments;
    },
    setIsLoadData(state, isLoadData) {
      state.isLoadData = isLoadData;
    }
  },
  actions: {
    fetchComments({commit}, postId) {
      commit('setIsLoadData', true);
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(json => commit('setComments', json))
        .catch(e => console.error(e.message))
        .finally(() => commit('setIsLoadData', false));
    }
  }
}

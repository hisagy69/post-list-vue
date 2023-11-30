export default {
  namespaced: true,
  state: {
    posts: [],
    users: [],
    totalPages: 0,
    page: 1,
    limit: 10,
    isLoadData: false,
    activeSortOption: '',
    sortOptions: [
      {
        name: 'По названию',
        value: 'title'
      },
      {
        name: 'По тексту',
        value: 'body'
      }
    ],
    searchQuery: ''
  },
  getters: {
    postsSorted(state) {
      return [...state.posts].sort((post1, post2) => 
        post1[state.activeSortOption]?.localeCompare(post2[state.activeSortOption]));
    },
    postsSortedSearch(state, getters) {
      return getters.postsSorted.filter(post => {
        return post.title.toLowerCase().includes(state.searchQuery.toLowerCase());
      });
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setPage(state, page) {
      state.page = page;
    },
    setLimit(state, limit) {
      state.limit = limit;
    },
    setIsLoadData(state, isLoadData) {
      state.isLoadData = isLoadData;
    },
    setActiveSortOption(state, activeSortOption) {
      state.activeSortOption = activeSortOption;
    },
    setSortOptions(state, sortOptions) {
      state.sortOptions = sortOptions;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPost(state, post) {
      state.posts = [post, ...state.posts]
    },
    removePost(state, id) {
      state.posts = state.posts.filter(post => post.id !== id);
    }
  },
  actions: {
    fetchPosts({state, commit}) {
      commit('setIsLoadData', true);
      return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`)
        .then(response => {
          const totalPages = response.headers.get('x-total-count') / state.limit;
          commit('setTotalPages', totalPages);
          return response.json()
        })
        .then(json => commit('setPosts', [...state.posts, ...json]))
        .catch(e => console.error(e));
    },
    fetchUsers({commit}) {
      commit('setIsLoadData', true);
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => commit('setUsers', json))
        .catch(e => console.error(e));
    },
    createPost({commit}, post) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: post.title,
          body: post.body
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(json => {
          commit('setPost', {...post, id: json.id});
        })
        .catch(e => console.error(e.message));
    },
    deletePost({commit}, id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      })
        .catch(e => console.error(e.message))
        .finally(() => commit('removePost', id));
    }
  }
};

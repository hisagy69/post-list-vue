import {createStore} from 'vuex';
import postModule from '@/store/postModule';
import userModule from '@/store/userModule';
import commentsModule from '@/store/commentsModule';

export default createStore({
  modules: {
    post: postModule,
    user: userModule,
    comments: commentsModule
  }
})

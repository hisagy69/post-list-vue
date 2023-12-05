<template>
  <div class="comments">
    <h3 class="comments__title">Комментарии</h3>
    <comment-item
      v-for="comment in comments"
      :name="comment.name"
      :email="comment.email"
      :body="comment.body"
      :key="comment.id"
    />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import commentItem from '@/components/commentItem';
export default {
  components: {
    commentItem
  },
  methods: {
    ...mapActions({
      fetchComments: 'comments/fetchComments'
    })
  },
  computed: {
    ...mapState({
      comments: state => state.comments.comments
    })
  },
  mounted() {
    this.fetchComments(this.$route.params.id);
  }
};
</script>

<style scoped>
.comments__title {
  font-size: 20px;
  font-family: sans-serif;
  text-align: center;
  margin-bottom: 30px;
}
</style>

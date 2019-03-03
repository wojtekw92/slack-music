<template>
  <div id="app">
    <img id="logo" src="./assets/logo.png"/>
    <div v-if="posts && posts.length">
      <music-line v-for="post in posts"
        :image="post.ogImage"
        :title="post.ogTitle"
        :date="post.createdAt"
        :url="post.link"
        :author="post.userName"
        :description="post.ogDescription"
        :key="post.id"></music-line>
      </div>
  </div>
</template>

<script>
import Musiclink from './components/Link'
import Hello from './components/Hello'
import Description from './components/Description'
import MusicLine from './components/MusicLine'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Hello,
    Musiclink,
    Description,
    MusicLine
  },
  data () {
    return {
      posts: [],
      errors: []
    }
  },
  created () {
    axios.get(`/music/api/links`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
  margin-bottom: 60px;
}
</style>

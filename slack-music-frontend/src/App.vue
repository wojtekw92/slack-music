<template>
  <div id="app">
    <img id="logo" src="./assets/logo.png"/>
    <layout-control @layoutChange='layoutChangeHandler'></layout-control>
    <div v-if="posts && posts.length">
      <music-line :class="layout" v-for="post in posts"
        :image="post.ogImage"
        :title="post.ogTitle"
        :date="post.createdAt"
        :url="post.link"
        :author="post.userName"
        :description="post.ogDescription"
        :key="post.id"
        :layout="layout"></music-line>
      </div>
  </div>
</template>

<script>
import Musiclink from './components/Link'
import Hello from './components/Hello'
import Description from './components/Description'
import MusicLine from './components/MusicLine'
import LayoutControl from './components/LayoutControl'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Hello,
    Musiclink,
    Description,
    MusicLine,
    LayoutControl
  },
  data () {
    return {
      posts: [],
      errors: [],
      layout: 'tiles'
    }
  },
  created () {
    axios.get(`/music/api/links`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data
        this.posts.forEach(element => {
          element.createdAt = new Date(element.createdAt).toLocaleString()
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    layoutChangeHandler(layout) {
      this.layout = layout;
    }
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

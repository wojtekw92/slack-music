<template>
    <div class="track-description">
        <musiclink class='link' :url="url" :title="title"></musiclink>
        <p class="description">{{ description }}</p>
    </div>
</template>

<script>
import Musiclink from './Link'
export default {
  name: 'track-description',
  props: ['url', 'title', 'description'],
  components: {
    Musiclink
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    text-align: left;
    margin: 0;
  }
  .description {
    text-align: left;
    margin-left: 10px;
  }
  .link {
    margin-left: 10px;
  }
</style>

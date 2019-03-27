<template>
<div class= "line">
    <div class="image">
        <img :src="image">
    </div>
    <description class="desc" :url="url" :title="title" :description="description"></description>
    <div class="author">{{ author }}</div>
    <div class="data"> {{ date }} </div>
</div>
</template>

<script>
import Description from './Description'
export default {
  name: 'Music-line',
  props: ['url', 'title', 'description', 'image', 'date', 'author'],
  components: {
    Description
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .line {
    margin-bottom: 10px;
    /* border-bottom: 1px solid #ccc; */
  }
  .line div {
    display: inline-block;
    vertical-align:top
  }
  .image img {
    max-width: 200px;
  }
  .image {
    width: 200px;
  }
  .data {
    padding: 20px;
    width: 10%;
  }
  .author {
    padding: 20px;
    width: 10%;
    text-transform: capitalize;
  }
  .desc {
    width: 40%;
  }
</style>

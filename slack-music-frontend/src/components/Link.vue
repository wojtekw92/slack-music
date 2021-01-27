<template>
    <div class="musiclink">
      <h1>
        <i :class="icon"></i>
        <a :href="url" target="_blank">{{ title }}</a>
      </h1>
    </div>
</template>

<script>
export default {
  name: 'musiclink',
  props: ['url', 'title', 'layout'],
  data: function () {
    const getIcon = function (url) {
      const ytRegExp = /youtu(be|.be)?(\.com)?/gm
      const soundCloud = /soundcloud\.com/gm
      if (url.match(ytRegExp)) {
        return 'fa-youtube'
      } else if (url.match(soundCloud)) {
        return 'fa-soundcloud'
      } else {
        return 'fa-spotify'
      }
    }

    return {
      icon: 'fab ' + getIcon(this.url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fa-youtube {
    color: red;
  }
  .fa-soundcloud {
    color: orangered;
  }
  .fa-spotify {
    color: green;
  }
  .musiclink {
    text-align: left;
  }
  h1 {
    margin-top: 0;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  a:hover {
    color: #0d3db1;
  }
  .musiclink.list h1 {
    font-size: 19px;
  }
</style>

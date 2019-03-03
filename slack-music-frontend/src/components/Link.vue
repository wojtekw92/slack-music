<template>
    <div class="musiclink"><i :class="icon"></i><a :href="url" target="_blank">{{ url }}</a></div>
</template>

<script>
export default {
  name: 'musiclink',
  props: ['url'],
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
</style>

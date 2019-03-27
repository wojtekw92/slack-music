<template>
    <div class='controls'>
        <i v-on:click="changeView('tiles', $event)" class="fas fa-th-list" v-bind:class="[ currentLayout === 'tiles' ? 'active' : '']"></i>
        <i v-on:click="changeView('list', $event)" class="fas fa-bars" v-bind:class="[ currentLayout === 'list' ? 'active' : '']"></i>
    </div>
</template>

<script>
export default {
    name: 'Layout-control',
    props: [],
    data: function () {
        return {
            currentLayout: 'tiles',
            changeView: (layout , evt) => {
                this.currentLayout = layout;
                this.$emit('layoutChange', layout );
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .controls {
        margin-left: 10%;
        text-align: left;
        font-size: 25px;
        margin-bottom: 15px;
    }
    i {
        color: #333;
    }
    i.active {
        color: #2b82d8;
    }
</style>
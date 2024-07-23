<template>
  <Sidebar v-if="this.$store.state.token" />
  <Navbar v-if="this.$store.state.token" />
  <router-view/>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import Sidebar from '@/components/Sidebar.vue'

  export default{
      components:{
          Navbar,
          Sidebar
      }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

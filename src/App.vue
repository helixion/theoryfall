<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" src="./assets/scss/styles.scss"></style>
<style>
#app, html, body, .container {
  min-height: 100%;
  height: 100%;
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body, 
#app, .tf-flex-wrapper {
  height: 100%;
  min-height: 100%;
}

/* html {
  height: 100%;
} */

body {
  margin: 0;
  font-family: 'roboto', sans-serif;
}

*, *:before, *:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
} 
</style>

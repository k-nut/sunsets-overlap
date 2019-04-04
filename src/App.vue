<template>
  <div id="app">
    <SunsetsApp />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SunsetsApp from "./components/SunsetsApp.vue";

@Component({
  components: {
    SunsetsApp
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

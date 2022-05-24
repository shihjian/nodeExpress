<template>
  <div class="home">
    <navbar />
    <div class="section">
      <div class="routerView">
        <router-view />
      </div>
      <div class="information">
        <information />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/homePage/header.vue";
import information from "@/components/postCard/information.vue";
export default {
  name: "HomeView",
  components: {
    navbar,
    information,
  },
};
</script>
<style scoped lang="scss">
.home {
  height: 100vh;
  background-color: #efece7;
}
.section {
  max-width: 1024px;
  margin: 50px auto;
  display: flex;
  /* .information {
    width: 400px;
  } */
  .routerView {
    width: calc(100% - 400px);
  }
}
</style>

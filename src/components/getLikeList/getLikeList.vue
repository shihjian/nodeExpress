<template>
  <div class="getLikeList">
    <div class="title">
      <p>我按讚的貼文</p>
    </div>
  </div>
</template>

<script>
import { apiGetSignIn } from "@/api/index";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref } from "vue";
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.getLikeList {
  margin-right: 25px;
  .title {
    margin-bottom: 11px;
    padding: 18px 0px;
    background-color: #ffffff;
    border: 2px solid #000400;
    p {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>

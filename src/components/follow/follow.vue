<template>
  <div class="follow">
    <div class="title">
      <p>追蹤名單</p>
    </div>
    <div class="followList" v-for="(item, index) in data" :key="index">
      <div class="leftBox">
        <div class="imgBox">
          <img :src="item.user.photo || defaultImg" alt="photo" />
        </div>
        <div class="userContent">
          <p>{{ item.user.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetUserLikePosts, apiGetFollowList } from "@/api/index";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref, onMounted } from "vue";
export default {
  setup() {
    const router = useRouter();
    const defaultImg = ref("https://i.imgur.com/Om3aNlE.png");
    const data = ref();
    const goSelfPostWall = (e) => {
      router.push({ path: `selfPostWall/${e}` });
    };
    const getData = async () => {
      try {
        const item = await apiGetFollowList();
        console.log("追蹤", item.data.data[0].following);
        data.value = item.data.data[0].following;
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      getData();
    });
    return { getData, defaultImg, goSelfPostWall, data };
  },
};
</script>

<style scoped lang="scss">
.follow {
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
  .followList {
    margin-bottom: 16px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 0px #000400;
    border: 2px solid #000400;
    border-radius: 8px;
    opacity: 1;

    .leftBox {
      display: flex;
      align-items: center;
      .imgBox {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        border: 2px solid #000400;
        background-color: #e2edfa;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .userContent {
        margin-left: 20px;
        p:nth-child(1) {
          font: normal normal bold 16px/24px Noto Sans TC;
          letter-spacing: 0px;
          color: #000400;
          opacity: 1;
        }
        p:nth-child(2) {
          font: normal normal normal 14px/20px Noto Sans TC;
          letter-spacing: 0px;
          color: #9b9893;
          opacity: 1;
        }
      }
    }
  }
}
</style>

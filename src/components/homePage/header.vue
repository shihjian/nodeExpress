<template>
  <div class="header">
    <div class="container">
      <div class="logo" @click="goHome()">MetaWall</div>
      <div class="img" v-if="loading">
        <div class="userPhoto">
          <img
            @click.prevent="goSelfPostWall"
            :src="userInfo.photo || defaultImg"
            @error="imgError"
          />
          <!-- <img src="../../assets/img/default.png" alt="user" /> -->
        </div>
        <p @click="changeShow()">{{ userInfo.name }}</p>
        <div class="menu" v-show="showMenu">
          <ul>
            <li @click.prevent="goSelfPostWall">我的貼文牆</li>
            <li @click.prevent="goEdit()">修改個人資料</li>
            <li @click.prevent="SignOut">登出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetSelfInfo } from "@/api/index";
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const defaultImg = ref("https://i.imgur.com/Om3aNlE.png");
    const loading = ref(false);
    const showMenu = ref(false);
    const userInfo = reactive({
      name: null,
      photo: null || "../../assets/img/default.png",
    });
    const getData = async () => {
      const userData = await apiGetSelfInfo();
      const data = userData.data.msg;
      userInfo.name = data.name;
      userInfo.photo = data.photo;
      loading.value = true;
    };

    const changeShow = () => {
      showMenu.value = !showMenu.value;
    };
    const goHome = () => {
      router.push({ name: "postWall" });
    };

    const goEdit = () => {
      router.push({ name: "editUser" });
    };

    const SignOut = () => {
      localStorage.clear();
      router.push({ path: `/` });
    };

    const setUserInfo = () => {
      userInfo.name = localStorage.getItem("user");
      userInfo.photo = localStorage.getItem("photo");
    };

    const imgError = (e) => {
      e.target.src = "https://i.imgur.com/Om3aNlE.png";
    };

    const goSelfPostWall = () => {
      const userId = localStorage.getItem("userId");
      router.push({ path: `selfPostWall/${userId}` });
    };

    onMounted(() => {
      // setUserInfo();
      getData();
    });

    return {
      showMenu,
      changeShow,
      goHome,
      goEdit,
      userInfo,
      imgError,
      goSelfPostWall,
      SignOut,
      loading,
      defaultImg,
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  border-bottom: 2px solid #000;
  background-color: #fff;
  .container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 15px 5px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
    }
    .img {
      display: flex;
      align-items: center;
      position: relative;
      .userPhoto {
        margin-right: 12px;
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
        img {
          width: 100%;
          height: 100%;
        }
      }
      .menu {
        position: absolute;
        top: 55px;
        background-color: #fff;
        ul {
          border: 2px solid;
          li {
            padding: 5px;
            border-bottom: 2px solid;
            cursor: pointer;
          }
          li:hover {
            background-color: #efece7;
          }
        }
      }
      p {
        padding: 0px 20px;
        cursor: pointer;
      }

      img {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>

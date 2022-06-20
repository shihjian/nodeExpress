<template>
  <div class="poseWall">
    <div class="btnGroup">
      <div class="select">
        <select v-model="select.sort">
          <option value="asc">最舊貼文</option>
          <option value="desc">最新貼文</option>
        </select>
      </div>
      <div class="search">
        <div class="searchBox">
          <input
            type="text"
            @keyup.enter="searchKey()"
            v-model="select.q"
            placeholder="搜尋貼文"
          />
          <div @click="searchKey()" class="icon">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="chatContent" v-for="item in data" :key="item.content">
      <div class="userContent">
        <div class="userContentBox">
          <div class="img" @click.prevent="goSelfPostWall(item.user._id)">
            <img :src="item.user.photo || defaultImg" @error="imgError" />
          </div>
          <div class="userInfo">
            <p>{{ item.user.name }}</p>
            <p class="date">{{ item.createdAt }}</p>
          </div>
        </div>
        <div class="message">
          <p>{{ item.content }}</p>
        </div>
        <div class="userImg">
          <img :src="`${item.image}`" v-if="item.image" alt="img" />
        </div>
        <div
          class="likeCount"
          v-if="item.likes.find((item) => item == userInfo.user)"
          @click.prevent="unlike(item.id)"
        >
          <i class="fas fasLike fa-thumbs-up"></i>
          <p>{{ item.likes.length }}</p>
        </div>
        <div
          class="likeCount"
          v-if="!item.likes.find((item) => item == userInfo.user)"
          @click.prevent="like(item.id)"
        >
          <i class="far fa-thumbs-up"></i>
          <p>{{ item.likes.length }}</p>
        </div>
        <div class="userControl">
          <div class="messageArea">
            <div class="img">
              <img :src="userInfo.photo" @error="imgError" />
            </div>
            <div class="btnGroup">
              <input
                type="text"
                placeholder="留言.."
                v-model="messageContent.comment"
                @keyup.enter="message(item.id)"
              />
              <div class="messageBox" @click.prevent="message(item.id)">
                <p>留言</p>
              </div>
            </div>
          </div>
          <div
            class="messageHistory"
            v-for="comments in item.comments"
            :key="comments.content"
          >
            <div class="img">
              <img :src="comments.user.photo" @error="imgError" />
            </div>
            <div class="messageInfo">
              <p>{{ comments.user.name }}</p>
              <p class="date">{{ comments.createdAt }}</p>
              <p class="contentInner">{{ comments.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiGetPosts,
  apiGetSearch,
  apiGetSearchKey,
  apiPostMessage,
  apiGetLike,
  apiGetUnLike,
} from "@/api/index";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const data = ref();
    const likeStatus = ref(false);
    const defaultImg = ref("https://i.imgur.com/Om3aNlE.png");
    const userInfo = reactive({
      photo: localStorage.getItem("photo"),
      user: localStorage.getItem("userId"),
    });
    const messageContent = reactive({
      id: "",
      comment: "",
    });
    const select = reactive({
      sort: "desc",
      q: null,
    });

    const goSelfPostWall = (e) => {
      // const userId = localStorage.getItem("userId");
      router.push({ path: `selfPostWall/${e}` });
    };

    // 取得資料
    const getData = async () => {
      try {
        const item = await apiGetPosts();
        data.value = item.data.data;
      } catch (err) {
        console.error(err);
      }
    };

    // 搜尋
    const searchKey = async () => {
      const item = await apiGetSearchKey(select);
      data.value = item.data.data;
    };

    // 留言
    const message = async (e) => {
      try {
        messageContent.id = e;
        await apiPostMessage(messageContent);
        getData();
        messageContent.comment = "";
        messageContent.id = "";
        // 其他的處理
      } catch (err) {
        console.error(err);
      }
    };

    // 點擊按讚
    const like = async (e) => {
      console.log("點讚");
      try {
        await apiGetLike(e);
        getData();
        // 其他的處理
      } catch (err) {
        console.error(err);
      }
    };

    // 取消按讚
    const unlike = async (e) => {
      console.log("取消");
      try {
        await apiGetUnLike(e);
        getData();
        // 其他的處理
      } catch (err) {
        console.error(err);
      }
    };

    // 大頭貼
    const imgError = (e) => {
      e.target.src = "https://i.imgur.com/Om3aNlE.png";
    };

    watch(
      () => select.sort,
      async (newValue) => {
        const item = await apiGetSearch(select);
        data.value = item.data.data;
      }
    );

    onMounted(() => {
      getData();
    });
    return {
      defaultImg,
      data,
      select,
      searchKey,
      message,
      messageContent,
      imgError,
      userInfo,
      like,
      goSelfPostWall,
      likeStatus,
      unlike,
    };
  },
};
</script>

<style scoped lang="scss">
select {
  height: 100%;
  padding: 16px;
  border: 2px solid #000;
}
input {
  width: 83%;
  padding: 16px;
}

.date {
  font-size: 12px;
  color: #9b9893;
}

.poseWall {
  margin-right: 25px;
  .btnGroup {
    display: flex;
  }
  .search {
    width: 100%;
    margin-left: 16px;
    border: 2px solid #000;
    .searchBox {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      .icon {
        width: 46px;
        height: 49px;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        color: #fff;
        border-left: 2px solid #000;
        background-color: #03438d;
      }
    }
  }

  .chatContent {
    margin: 16px 0;
    padding: 24px 24px 0px 24px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 0px #000400;
    border: 2px solid #000400;
    border-radius: 8px;
    .userContent {
      .userContentBox {
        display: flex;
        .img {
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
          cursor: pointer;
        }
        .userInfo {
          padding-left: 16px;
          display: flex;
          flex-direction: column;
        }
      }
      .userImg img {
        width: 100%;
        margin-bottom: 20px;
      }
      .message {
        margin: 16px 0;
      }
      .likeCount {
        display: flex;
        align-items: center;
        .fasLike {
          color: #03438d;
          cursor: pointer;
        }
        p {
          margin-left: 8px;
        }
      }
      .userControl {
        margin: 10px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        .messageArea {
          margin-bottom: 16px;
          width: 100%;
          display: flex;

          .img {
            margin-right: 12px;
            width: 62px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
            border: 2px solid #000400;
            background-color: #e2edfa;
            border-radius: 50%;
            overflow: hidden;
          }
          .btnGroup {
            width: 100%;
            margin-left: 16px;
            border: 2px solid #000;
            .messageBox {
              width: 50px;
              padding: 12px 45px;
              color: #fff;
              background-color: #03438d;
              border-left: 2px solid #000;
              cursor: pointer;
            }
          }
        }
        .messageHistory {
          margin-bottom: 10px;
          width: 100%;
          padding: 15px;
          display: flex;
          background-color: #efece7;
          border-radius: 12px;
          .img {
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
          }
          .messageInfo {
            display: flex;
            flex-direction: column;
            .contentInner {
              margin: 4px 0px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .poseWall {
    margin: 0;
    padding: 20px;
  }
}
</style>

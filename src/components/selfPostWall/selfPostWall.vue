<template>
  <div class="poseWall" v-if="loading">
    <!-- <div class="btnGroup">
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
    </div> -->
    <div class="follow">
      <div class="imgBox" v-if="status">
        <img
          :src="userInfos.data.photo || defaultImg"
          @error="imgError"
          alt=""
        />
      </div>
      <div class="contentBox">
        <div class="userInfo">
          <p>{{ userInfos.data.name }}</p>
          <p>{{ followLength }}人追蹤</p>
        </div>
        <div class="followBtnBox" v-if="followStatus">
          <div class="followBtn" @click.prevent="unFollow">取消追蹤</div>
        </div>
        <div class="unFollowBtnBox" v-if="!followStatus">
          <div class="unFollowBtn" @click.prevent="follow">追蹤</div>
        </div>
      </div>
    </div>
    <div class="chatContent" v-for="item in data" :key="item.content">
      <div class="userContent">
        <div class="userContentBox">
          <div class="img">
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
        <div class="likeCount">
          <i class="fas fasLike fa-thumbs-up"></i>
          <p>{{ item.likes.length }}</p>
        </div>
        <div class="userControl">
          <div class="messageArea">
            <div class="img">
              <img
                :src="userInfos.data.photo || defaultImg"
                @error="imgError"
              />
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
              <img :src="comments.user.photo || defaultImg" @error="imgError" />
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
  apiGetSelfPosts,
  apiGetSearch,
  apiGetSearchKey,
  apiPostMessage,
  apiGetUserInfos,
  apiDeleteFollow,
  apiPostFollow,
} from "@/api/index";
import { looseIndexOf } from "@vue/shared";
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const data = ref();
    const loading = ref(false);
    const followStatus = ref(false);
    const defaultImg = ref("https://i.imgur.com/Om3aNlE.png");
    const followLength = ref();
    const status = ref(false);
    const userInfos = reactive({
      // photo: localStorage.getItem("photo"),
      data: [],
    });
    const messageContent = reactive({
      id: "",
      comment: "",
    });
    const select = reactive({
      sort: "desc",
      q: null,
    });
    const computedVariable = computed(() => {
      return userInfos.data.followers.length;
    });
    // 取得貼文
    const getData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const id = route.params.id;
        const userInfo = await apiGetUserInfos(id);
        const item = await apiGetSelfPosts(id);
        userInfos.data = userInfo.data.msg[0];
        data.value = item.data.data;
        followLength.value = userInfo.data.msg[0].followers.length;
        const checkFollowing = userInfo.data.msg[0].followers;
        const checkFollowingType = checkFollowing.map((item) =>
          item.user.indexOf(userId)
        );
        if (checkFollowingType == "0") {
          followStatus.value = true;
        } else {
          followStatus.value = false;
        }
        status.value = true;
        loading.value = true;
      } catch (err) {
        console.error(err);
      }
    };

    // 追蹤
    const follow = async () => {
      const id = route.params.id;
      try {
        await apiPostFollow(id);
        getData();
      } catch (err) {
        console.log(err);
      }
    };

    //取消追蹤
    const unFollow = async () => {
      const id = route.params.id;
      try {
        await apiDeleteFollow(id);
        getData();
      } catch (err) {
        console.log(err);
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
      data,
      select,
      searchKey,
      message,
      messageContent,
      imgError,
      userInfos,
      status,
      computedVariable,
      followLength,
      defaultImg,
      follow,
      unFollow,
      followStatus,
      loading,
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

img {
  width: 100%;
  height: 100%;
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

  .imgBox {
    margin-right: 12px;
    width: 60px;
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
  .follow {
    padding: 5px;
    display: flex;
    align-items: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 2px solid #000400;
    border-radius: 8px;
    opacity: 1;
    .contentBox {
      width: 100%;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .followBtnBox {
        background: #eec32a 0% 0% no-repeat padding-box;
        box-shadow: 0px 2px 0px #000400;
        border: 2px solid #000400;
        border-radius: 8px;
        opacity: 1;
        cursor: pointer;
        .followBtn {
          padding: 6px 32px;
        }
      }
      .unFollowBtnBox {
        background: #dddddd 0% 0% no-repeat padding-box;
        box-shadow: 0px 2px 0px #000400;
        border: 2px solid #000400;
        border-radius: 8px;
        opacity: 1;
        cursor: pointer;
        .unFollowBtn {
          padding: 6px 32px;
        }
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
            img {
              width: 100%;
              height: 100%;
            }
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

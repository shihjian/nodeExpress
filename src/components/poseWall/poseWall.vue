<template>
  <div class="poseWall">
    <div class="btnGroup">
      <div class="select">
        <select v-model="select.sort">
          <option value="asc">最新貼文</option>
          <option value="desc">最舊貼文</option>
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
          <div class="img">
            <img src="../../assets/img/default.png" alt="user" />
          </div>
          <div class="userInfo">
            <p>{{ item.user.name }}</p>
            <p class="date">{{ item.createdAt }}</p>
          </div>
        </div>
        <div class="message">
          <p>{{ item.content }}</p>
          <div class="imgBox">
            <img :src="item.image" alt="">
          </div>
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
              <img src="../../assets/img/default.png" alt="photo" />
            </div>
            <div class="btnGroup">
              <input type="text" placeholder="留言.." />
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
              <img src="../../assets/img/default.png" alt="img" />
            </div>
            <div class="messageInfo">
              <p>{{ comments.user.name }}</p>
              <p class="date">2022/05/24</p>
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
} from "@/api/index";
import { onMounted, reactive, ref, watch } from "vue";
export default {
  setup() {
    const data = ref();
    const select = reactive({
      sort: "asc",
      q: null,
    });

    // 取得貼文
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
        await apiPostMessage(e);
        getData();
        // 其他的處理
      } catch (err) {
        console.error(err);
      }
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
    return { data, select, searchKey, message };
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
          img {
            width: 100%;
          }
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
            img {
              width: 100%;
            }
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
            img {
              width: 100%;
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

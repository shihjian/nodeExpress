<template>
  <div class="poseWall">
    <div class="btnGroup">
      <div class="select">
        <select>
          <option value="desc">最新貼文</option>
          <option value="asc">最舊貼文</option>
        </select>
      </div>
      <div class="search">
        <div class="searchBox">
          <input type="text" value="" placeholder="搜尋貼文" />
          <div class="icon"></div>
        </div>
      </div>
    </div>
    <div class="chatContent">
      <div class="userContent">
        <div class="userContentBox">
          <img src="../../assets/img/default.png" alt="user" />
          <div class="userInfo">
            <p>邊緣小杰</p>
            <p class="date">2022/9/10</p>
          </div>
        </div>
        <div class="message"><p>哈囉你好嗎</p></div>
        <div class="userImg">
          <img src="../../assets/img/image.png" alt="img" />
        </div>
        <div class="likeCount">
          <i class="fas fasLike fa-thumbs-up"></i>
          <p>5</p>
        </div>
        <div class="userControl">
          <div class="messageArea">
            <div class="img">
              <img src="../../assets/img/default.png" alt="photo" />
            </div>
            <div class="btnGroup">
              <input type="text" placeholder="留言.." />
              <div class="messageBox"><p>留言</p></div>
            </div>
          </div>
          <div class="messageHistory">
            <div class="img">
              <img src="../../assets/img/default.png" alt="img" />
            </div>
            <div class="messageInfo">
              <p>大俠客</p>
              <p class="date">2022/05/24</p>
              <p class="contentInner">俠客到此一遊</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
select {
  height: 100%;
  padding: 16px;
  border: 2px solid #000;
}
input {
  width: 81%;
  padding: 16px;
}

.date {
  font-size: 12px;
  color: #9b9893;
}

.poseWall {
  margin-right: 25px;
  .btnGroup {
    margin-bottom: 16px;
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
        border-left: 2px solid #000;
        background-color: #03438d;
      }
    }
  }

  .chatContent {
    margin-bottom: 16px;
    padding: 24px 24px 0px 24px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 0px #000400;
    border: 2px solid #000400;
    border-radius: 8px;
    .userContent {
      .userContentBox {
        display: flex;
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
          color: #03438D;
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
          width: 100%;
          display: flex;
          .img {
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
          width: 100%;
          padding: 15px;
          display: flex;
          background-color: #efece7;
          border-radius: 12px;
          .img {
            margin-right: 12px;
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
</style>

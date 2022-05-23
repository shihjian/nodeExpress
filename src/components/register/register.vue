<template>
  <div class="login">
    <div class="login-box">
      <div class="box-left">
        <img src="../../assets/img/img.png" alt="photo" />
      </div>
      <div class="box-right">
        <h1>MetaWall</h1>
        <h2>註冊</h2>
        <div class="input-group">
          <input type="text" placeholder="暱稱" />
          <p>請輸入暱稱</p>
          <input type="text" placeholder="Email" />
          <p>電子信箱重複申請</p>
          <input type="password" placeholder="Password" />
          <p>密碼不須大於8碼</p>
          <input type="password" placeholder="CheckPassword" />
          <p>密碼與確認密碼不符合</p>
          <button>註冊</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
input,
button {
  height: 35px;
  border: 2px solid #000;
  margin: 8px 0;
}

input[placeholder] {
  padding: 5px;
}

button {
  border-radius: 5px;
  background-color: #03438d;
  color: #fff;
}
.login {
  min-width: 375px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efece7;
  .login-box {
    width: 869px;
    padding: 96px 0;
    gap: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #000;
    background-color: #efece7;
    .box-left {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .box-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1 {
        font-size: 60px;
        font-weight: bold;
        font-family: Paytone One;
        color: #03438d;
      }
      h2 {
        margin-bottom: 28px;
        font-size: 18px;
        font-weight: bold;
      }
      .input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .register {
          width: 100%;
          text-align: center;
          cursor: pointer;
        }
        p {
          color: #ce0000;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .box-left {
    display: none;
  }
}
</style>

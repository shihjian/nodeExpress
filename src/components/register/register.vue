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
          <input type="text" placeholder="暱稱" v-model="data.name" />
          <p v-show="dataStatus.name">請輸入暱稱</p>
          <input type="text" placeholder="Email(帳號)" v-model="data.email" />
          <p v-show="dataStatus.email">請輸入電子信箱</p>
          <p v-show="dataStatus.serveCheckEmail">電子信箱重複申請</p>
          <input
            type="password"
            placeholder="Password"
            v-model="data.password"
          />
          <p v-show="dataStatus.password">密碼須大於8碼</p>
          <input
            type="password"
            placeholder="CheckPassword"
            v-model="data.confirmPassword"
          />
          <p v-show="dataStatus.confirmPassword">密碼與確認密碼不符合</p>
          <button @click="register()">註冊</button>
        </div>
      </div>
    </div>
    <div class="success" v-if="dataStatus.success">
      <h1>註冊成功</h1>
      <button @click="goPostWall()">前往登入</button>
    </div>
  </div>
</template>

<script>
import { apiGetSignUp } from "@/api/index";
import { useRouter } from "vue-router";
import { reactive } from "vue";
export default {
  setup() {
    const router = useRouter();
    const data = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const dataStatus = reactive({
      name: false,
      email: false,
      serveCheckEmail: false,
      password: false,
      confirmPassword: false,
      success: false,
    });
    const register = async () => {
      if (!data.name) {
        dataStatus.name = true;
      }
      if (!data.email) {
        dataStatus.email = true;
      }
      if (data.password.length < 8) {
        dataStatus.password = true;
      }
      if (data.password !== data.confirmPassword) {
        dataStatus.confirmPassword = true;
      }
      try {
        const register = await apiGetSignUp(data);
        dataStatus.success = true;
      } catch (err) {
        dataStatus.serveCheckEmail = true;
      }
    };
    const goPostWall = () => {
      router.push({ name: "login" });
    };
    return { data, dataStatus, register, goPostWall };
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
  position: relative;
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
  .success {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #efece7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    button {
      padding: 0 30px;
    }
  }
}

@media screen and (max-width: 768px) {
  .box-left {
    display: none;
  }
}
</style>

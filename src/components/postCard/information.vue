<template>
  <div class="information">
    <button @click="goAddCard">張貼動態</button>
    <div class="btn-group">
      <ul>
        <!-- <li>
          <div class="userImg">
            <img src="@/assets/img/default.png" alt="" />
          </div>
          <p>邊緣小杰</p>
        </li> -->
        <li>
          <div class="imgBox"><i class="far fa-bell"></i></div>
          <p>追蹤名單</p>
        </li>
        <li>
          <div class="imgBox"><i class="far fa-thumbs-up"></i></div>
          <p>我按讚的名單</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const goAddCard = () => {
      router.push({ name: "addCard" });
    };
    return { goAddCard };
  },
};
</script>

<style scoped lang="scss">
button {
  padding: 16px;
  border: 2px solid #000;
  border-radius: 5px;
  background-color: #03438d;
  color: #fff;
  box-shadow: -2px 2px 0px #000400;
  border-radius: 8px;
}

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
}

.information {
  box-sizing: border-box;
  width: 400px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border: 2px solid #000;
  background-color: #fff;
  .btn-group {
    .userImg {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    ul li {
      margin: 20px 0px;
      display: flex;
      align-items: center;
      cursor: pointer;
      p {
        padding: 16px;
      }
    }
  }
}
</style>

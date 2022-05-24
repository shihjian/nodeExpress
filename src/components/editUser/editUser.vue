<template>
  <div class="editUser">
    <div class="title">
      <p>修改個人資訊</p>
    </div>
    <div class="editCard">
      <div class="tab">
        <ul>
          <li @click="changeType(1)">暱稱修改</li>
          <li @click="changeType(2)">重設密碼</li>
        </ul>
      </div>
      <div v-show="checkType == 1" class="changeName"><p>changeName</p></div>
      <div v-show="checkType == 2" class="changePassword"><p>changePassword</p></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const checkType = ref("1");
    const changeType = (e) => {
      console.log(e);
      checkType.value = e;
    };
    return { checkType, changeType };
  },
};
</script>

<style scoped lang="scss">
.editUser {
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
  .editCard {
    .tab {
      ul {
        display: flex;
        li {
          padding: 8px 24px;
          background-color: #fff;
          border: 2px solid #000400;
          border-radius: 8px 8px 0px 0px;
          cursor: pointer;
        }
      }
    }
    .changeName {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px 3px 0px #000400;
      border: 2px solid #000400;
      border-radius: 8px;
    }
    .changePassword {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px 3px 0px #000400;
      border: 2px solid #000400;
      border-radius: 8px;
    }
  }
}
</style>

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
      <div v-show="checkType == 1" class="changeName">
        <div class="changeBox">
          <div class="imgBox">
            <div class="img">
              <img src="" alt="" srcset="" />
            </div>
            <a href="javascript:;" class="a-upload"
              ><input type="file" name="" id="" />上傳大頭照</a
            >
          </div>
          <div class="userInfo">
            <p>暱稱</p>
            <input type="text" placeholder="請輸入暱稱" />
            <div class="checkBox">
              <p>性別</p>
              <input type="radio" id="boy" name="drone" value="男生" checked />
              <label for="boy">男生</label>
              <input
                class="radio"
                type="radio"
                id="girl"
                name="drone"
                value="女生"
              />
              <label for="girl">女生</label>
            </div>
          </div>
          <div class="submit">
            <div class="confirm"><p>送出更新</p></div>
          </div>
        </div>
      </div>
      <div v-show="checkType == 2" class="changePassword">
        <div class="changePasswordGroup">
          <p>輸入新密碼</p>
          <input type="text" value="" placeholder="請輸入新密碼" />
          <p>再次輸入</p>
          <input type="text" value="" placeholder="請再次輸入新密碼" />
        </div>
        <div class="submit">
          <div class="confirm"><p>更新密碼</p></div>
        </div>
      </div>
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
.a-upload {
  margin-bottom: 15px;
  padding: 4px 20px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #fff;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
}

.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}

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
      padding: 20px 115px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px 3px 0px #000400;
      border: 2px solid #000400;
      border-radius: 8px;
      .changeBox {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .imgBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          .img {
            width: 107px;
            height: 107px;
            margin-bottom: 16px;
            border: 2px solid #000400;
            border-radius: 50%;
          }
        }
        .userInfo {
          width: 100%;
          display: flex;
          flex-direction: column;
          p {
            margin-bottom: 6px;
          }
          input {
            padding: 14px 24px;
            border: 2px solid #000400;
          }
          .checkBox {
            margin: 20px 0px;
            .radio {
              margin-left: 15px;
            }
            p {
              margin-bottom: 6px;
            }
          }
        }
        .submit {
          width: 100%;
          .confirm {
            width: 100%;
            padding: 16px 0px;
            text-align: center;
            background-color: #03438d;
            color: #fff;
            border: 2px solid #000400;
            border-radius: 8px;
            cursor: pointer;
          }
        }
      }
    }
    .changePassword {
      padding: 20px 115px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px 3px 0px #000400;
      border: 2px solid #000400;
      border-radius: 8px;
      .changePasswordGroup {
        width: 100%;
        display: flex;
        flex-direction: column;
        p {
          margin-bottom: 6px;
        }
        input {
          margin-bottom: 16px;
          padding: 14px 24px;
          border: 2px solid #000400;
        }
      }
      .submit {
        width: 100%;
        .confirm {
          width: 100%;
          padding: 16px 0px;
          text-align: center;
          background-color: #03438d;
          color: #fff;
          border: 2px solid #000400;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

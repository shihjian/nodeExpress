<template>
  <div class="addCard">
    <div class="title">
      <p>張貼動態</p>
    </div>
    <div class="addCardContent">
      <p>貼文內容</p>
      <div class="textArea">
        <textarea placeholder="請輸入您的貼文內容.." v-model="data.content" />
      </div>
      <a href="javascript:;" class="a-upload"
        ><input @change="fileSelected" type="file" />上傳大頭照</a
      >
      <div class="imgbox">
        <img :src="image" alt="" v-show="image" />
      </div>
      <div @click="submit" class="submit">
        <p>送出貼文</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPostPosts, apiPostPhoto } from "@/api/index";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
export default {
  setup() {
    const image = ref("");
    const postFile = ref(null);
    const data = reactive({
      content: null,
      image: null,
    });

    const fileSelected = (e) => {
      const file = e.target.files.item(0); // 取得File物件
      const reader = new FileReader(); // 建立FileReader 監聽 Load 事件
      reader.addEventListener("load", imageLoader);
      reader.readAsDataURL(file);
      postFile.value = file;
      
    };

    const imageLoader = (event) => {
      image.value = event.target.result;
    };

    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("image", postFile.value);
        const result = await apiPostPhoto(formData);
        data.image = result.data.imgUrl;
      } catch (e) {
        return Promise.reject(e);
      }
    };

    const submit = async () => {
      try {
        await upload();
        const post = await apiPostPosts(data);
        console.log("post", post);
      } catch (err) {
        console.log(err);
      }
    };
    return { fileSelected, imageLoader, image, data, submit, postFile };
  },
};
</script>

<style scoped lang="scss">
.a-upload {
  margin: 15px;
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

.addCard {
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
  .addCardContent {
    padding: 32px;
    border: 2px solid #000400;
    background-color: #fff;
    border-radius: 8px;
    p {
      margin-bottom: 5px;
    }
    .textArea {
      textarea {
        width: 97%;
        height: 169px;
        padding: 5px;
        resize: none;
        border: 2px solid #000400;
      }
    }
  }
  .imgUpdate {
    padding: 4px 32px;
    margin-bottom: 5px;
    background-color: #000;
    color: #fff;
    border-radius: 4px;
  }
  .imgbox {
    width: 100%;
    height: 157px;
    border: 2px solid #000400;
    border-radius: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .submit {
    width: 30%;
    margin: 10px auto;
    text-align: center;
    padding: 16px 120px;
    background-color: #eec32a;
    border: 2px solid #000400;
    box-shadow: -2px 2px 0px #000400;
    border-radius: 8px;
    cursor: pointer;
    p {
      font-weight: bold;
    }
  }
}
</style>

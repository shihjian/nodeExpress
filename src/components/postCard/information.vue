<template>
  <div class="information">
    <button>張貼動態</button>
    <div class="btn-group">
      <ul>
        <li>
          <img src="@/assets/img/default.png" alt="" />
          <p>邊緣小杰</p>
        </li>
        <li>
          <img src="@/assets/img/default.png" alt="" />
          <p>追蹤名單</p>
        </li>
        <li>
          <img src="@/assets/img/default.png" alt="" />
          <p>我按讚的名單</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
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
.information {
  width: 400px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border: 2px solid #000;
  background-color: #fff;
  .btn-group {
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

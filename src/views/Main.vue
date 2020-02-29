<template>
  <div>
    <div class="bg" :style="{backgroundImage:'url('+data.avatar+')'}">
      <div class="box">
        <Row>
          <i-col span="5" class="img">
            <img :src="data.avatar" alt />
          </i-col>
          <i-col span="16" class="name">
            <Row>
              <i-col span="3" class="mgr">
                <img src="../assets/imgs/brand@2x.png" alt />
              </i-col>
              <i-col span="20">
                <h3>{{data.name}}</h3>
              </i-col>
            </Row>
            <h4 class="mg">{{data.description}} / {{data.deliveryTime}}分钟送达</h4>
            <Row>
              <i-col span="2" class="img3">
                <img src="../assets/imgs/decrease_1@2x.png" alt />
              </i-col>
              <i-col span="20">
                <h4>{{data.description}}</h4>
              </i-col>
            </Row>
          </i-col>
        </Row>
      </div>
      <div class="pd">
        <Row>
          <i-col span="3">
            <img src="../assets/imgs/bulletin@2x.png" alt />
          </i-col>
          <i-col span="20">
            <h4>
              <a href="#">></a>
            </h4>
          </i-col>
        </Row>
      </div>
    </div>
    <Menu mode="horizontal" active-key="1" class="router-link-div">
      <Menu-item key="1">
        <router-link to="/Commodity" class="font">商品</router-link>
      </Menu-item>
      <Menu-item key="2">
        <router-link to="/Evaluate" class="font">评价</router-link>
      </Menu-item>
      <Menu-item key="3">
        <router-link to="/Merchant" class="font">商家</router-link>
      </Menu-item>
    </Menu>
    <router-view></router-view>

    <div class="bottom">
      <Row>
        <i-col span="5">
          <div class="border">
            <Icon type="ios-cart" style="font-size:40px"></Icon>
          </div>
        </i-col>
        <i-col span="4" class="font">
          <span :model='price'>￥{{price.num}}</span>
        </i-col>
        <i-col span="9" class="line-height">
          <h3>只需配送费$4元</h3>
        </i-col>
        <i-col span="6" class="btn">
          <button>￥20起送</button>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      price:{
          num:'',
      },
      data: {}
    };
  },
  created() {
    getSeller().then(res => {
      //   console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.bg {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff;
  .pd {
    height: 35px;
    padding-left: 10px;
    padding-top: 10px;
    img {
      width: 30px;
    }
  }
}

.box {
  padding-top: 20px;
  padding-left: 20px;

  .img {
    img {
      width: 70px;
      height: 70px;
    }
    margin-right: 15px;
  }
  .name {
    line-height: 20px;
    .mgr {
      margin-right: 5px;
      img {
        width: 30px;
      }
    }
    .img3 {
      img {
        width: 18px;
      }
    }
    .mg {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
}
.router-link-div {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  .font {
    font-size: 20px;
  }
}
.bottom {
  height: 50px;
  width: 100%;
  color: #ccc;
  background: #000;
  position: fixed;
  bottom: 0;
  .border {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: #000;
    text-align: center;
    line-height: 78px;
    position: relative;
    top: -10px;
    left: 20px;
  }
  .font {
    font-size: 26px;
    line-height: 50px;
  }
  .line-height {
    line-height: 50px;
  }
  .btn {
    button {
      border: 0;
      width: 100%;
      height: 50px;
      color: #ccc;
      background: rgb(48, 47, 47);
    }
  }
}
</style>
<template>
  <div class="man_box">
    <ul class="content">
      <div class="box_top">
        <Row class="top_min">
          <div class="top_left">
            <i-col span="18">
              <h2>{{data.name}}</h2>
              <p>
                <Rate allow-half :value.sync="data.score"></Rate>
                ({{data.ratingCount}})
                <span>月售{{data.sellCount}}单</span>
              </p>
            </i-col>
          </div>
          <div class="top_right">
            <i-col span="6">
              <p>已收藏</p>
            </i-col>
          </div>
        </Row>
        <Row class="bottom_min">
          <i-col span="8" style="border-right:1px solid #ccc">
            <h4>起送价</h4>
            <span>20</span>元
          </i-col>
          <i-col span="8" style="border-right:1px solid #ccc">
            <h4>商家配送</h4>
            <span>4</span>元
          </i-col>
          <i-col span="8">
            <h4>平均配送时间</h4>
            <span>39</span>分钟
          </i-col>
        </Row>
      </div>
      <div class="box"></div>
      <h2>公告与活动</h2>
      <div class="main">
        <div class="main_a">
          <p>{{data.bulletin}}</p>
        </div>
        <div v-for="item in data.supports" :key="item.id" class="main_b">
          <img style="width:20px" v-show="item.type==0" src="../assets/imgs/decrease_1@2x.png" alt />
          <img style="width:20px" v-show="item.type==1" src="../assets/imgs/discount_1@2x.png" alt />
          <img style="width:20px" v-show="item.type==2" src="../assets/imgs/special_4@2x.png" alt />
          {{ item.description }}
        </div>
      </div>
      <div class="box"></div>
      <div class="real">
        <h2>商家实景</h2>
        <div class="flex">
          <div v-for="item in data.pics" :key="item.id" class="img">
            <img :src="item" alt />
          </div>
        </div>
      </div>
      <div class="box"></div>
      <div class="footer">
        <h2>商家信息</h2>
        <div v-for="item in data.infos" :key="item.id">
          <p>{{ item }}</p>
        </div>
      </div>
    </ul>

    <router-view />
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
import BSscroll from "better-scroll";

export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  },
  mounted() {
    new BSscroll(document.querySelector(".man_box"));
  }
};
</script>

<style lang="less" scoped>
.man_box {
  height: 500px;
  overflow: scroll;
  .box_top {
    height: 100%;
    padding: 20px;
    .top_min {
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(228, 228, 228);
      .top_left {
        span {
          margin-left: 20px;
        }
      }
      .top_right {
        p {
          text-align: center;
          line-height: 62px;
        }
      }
    }
    .bottom_min {
      padding: 20px 0 0 0;
      text-align: center;
    }
  }
  .box {
    height: 20px;
    background: rgb(247, 247, 247);
    border-top: 1px solid rgb(228, 228, 228);
    border-bottom: 1px solid rgb(230, 230, 230);
  }
  h2 {
    padding: 10px;
  }
  .main {
      height: 100%;
    padding: 0 20px;
    .main_a {
      color: red;
      line-height: 25px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgb(228, 227, 227);
    }
    .main_b {
      padding: 10px;
      border-bottom: 1px solid rgb(228, 227, 227);
    }
  }
  .real {
    padding-left: 20px;
    .img {
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
    .flex {
      display: flex;
    }
  }
  .footer {
    padding: 0 20px;
    h2 {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    p {
      padding: 20px 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
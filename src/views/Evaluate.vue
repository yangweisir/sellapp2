<template>
  <div class="mian_box">
    <ul class="content">
      <div class="hide">
        <Row>
          <i-col span="8" class="left-box">
            <h2 style="color: #f5a623">3.9</h2>
            <h4>综合评分</h4>
            <h5>高于周边商家69.2%</h5>
          </i-col>
          <i-col span="16" class="right-box">
            <p>
              <span class="padding">服务态度</span>
              <Rate show-text :value.sync="valueText">
                <span style="color: #f5a623">{{ valueText }}</span>
              </Rate>
            </p>
            <p>
              <span class="padding">服务态度</span>
              <Rate show-text :value.sync="valueText">
                <span style="color: #f5a623">{{ valueText }}</span>
              </Rate>
            </p>
            <p>
              <span class="padding">服务态度</span> 44分钟
            </p>
          </i-col>
        </Row>
        <div class="box"></div>
      </div>
      <div class="nav">
        <div class="nav_top">
          <i-button class="mg" type="primary">全部</i-button>
          <i-button class="mg" type="info">满意</i-button>
          <i-button style="background:#ccc;color:#fff">不满意</i-button>
        </div>
        <div>
          <i-button class="mg" style="background:#ccc" shape="circle"></i-button>只看有内容的评价
        </div>
      </div>
      <div>
        <div v-for="item in list" :key="item.id" class="mian">
          <Row>
            <i-col span="3" class="left_box">
              <img :src="item.avatar" alt />
            </i-col>
            <i-col span="19" class="right_box">
              <div class="flex">
                <div>{{item.username}}</div>
                <div>{{item.rateTime | formatDate}}</div>
              </div>
              <div>
                <Rate allow-half :value.sync="item.score"></Rate>
                {{item.deliveryTime}}分钟送达
              </div>
              <p>
                <strong style="color:rgb(49, 49, 49)">{{item.text}}</strong>
              </p>推荐：
              <div
                v-for="a in item.recommend"
                :key="a.id"
                class="recommend"
                style="display:inline-block"
              >
                <div>{{ a }}</div>
              </div>
            </i-col>
          </Row>
        </div>
      </div>

      <router-view />
    </ul>
  </div>
</template>

<script>
import { getEvaluate } from "../api/apis";
import { formatDate } from "../router/formatDate.js";
import BSscroll from "better-scroll";
export default {
  data() {
    return {
      valueText: 4,
      list: []
    };
  },
  created() {
    getEvaluate().then(res => {
      console.log(res.data.data);
      this.list = res.data.data;
    });
  },
  mounted() {
    new BSscroll(document.querySelector(".mian_box"));
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      // console.log(new Date(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.hide {
  height: 123px;
  .left-box {
    text-align: center;
    border-right: 1px solid #ccc;
    margin-top: 10px;
  }
  .right-box {
    padding-left: 5px;
    .padding {
      padding-right: 5px;
    }
  }
  .box {
    height: 20px;
    background: rgb(247, 247, 247);
    margin-top: 20px;
    border-top: 1px solid rgb(228, 228, 228);
    border-bottom: 1px solid rgb(230, 230, 230);
  }
}
.nav {
  height: 126px;
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid #ccc;
  .mg {
    margin-right: 10px;
  }
  .nav_top {
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(240, 240, 240);
    margin-bottom: 10px;
  }
}
.mian_box {
  height:500px;
  overflow: scroll;
  .mian {
    height: 100%;
    padding: 20px;
    border-bottom: 1px solid rgb(235, 235, 235);
    .left_box {
      margin-right: 10px;
      img {
        width: 40px;
        border-radius: 20px;
      }
    }
    .right_box {
      .flex {
        display: flex;
        justify-content: space-between;
      }
      .recommend {
        div {
          border: 1px solid #ccc;
          padding: 0 5px;
          margin: 0 5px 5px 0;
        }
      }
    }
  }
}
</style>
<template>
  <div class="flex">
    <div class="left-box">
      <ul class="content">
        <div
          :class="{leftGoods:true,selected:index==curSelected}"
          @click="leftTitle(index)"
          v-for="(item,index) in list"
          :key="item.name"
        >
          <img style="width:16px" v-show="item.type==1" src="../assets/imgs/decrease_1@2x.png" alt />
          <img style="width:16px" v-show="item.type==2" src="../assets/imgs/discount_1@2x.png" alt />
          {{ item.name }}
        </div>
      </ul>
    </div>

    <div class="right-box">
      <ul class="content">
        <div :id="index" v-for="(item,index) in list" :key="item.name">
          <h5>{{item.name}}</h5>
          <div class="flex" v-for="child in item.foods" :key="child.id">
            <div>
              <img :src="child.icon" alt />
            </div>
            <div>
              <p>{{child.name}}</p>
              <p>{{child.description}}</p>
              <label>月售{{child.sellCount}}份 好评率{{child.rating}}%</label>
              <span class="span">￥{{child.price}}</span>
              <i-button class="width" type="primary" shape="circle" icon="plus"></i-button>
              <span :model="data">{{data.num}}</span>
              <i-button
                class="width"
                @click="add(child.name)"
                type="primary"
                shape="circle"
                icon="plus"
              ></i-button>
            </div>
          </div>
        </div>
      </ul>
    </div>

    <router-view />
  </div>
</template>

<script>
import { getCommodity } from "../api/apis";
import BSscroll from "better-scroll";
export default {
  data() {
    return {
      data: {
        num: ""
      },
      list: [],
      curSelected: 0
    };
  },
  created() {
    getCommodity().then(res => {
      //   console.log(res.data.data);
      this.list = res.data.data;
    });
  },
  mounted() {
    new BSscroll(document.querySelector(".left-box"), {
      click: true
    });
    this.rightDiv = new BSscroll(document.querySelector(".right-box"));
  },
  methods: {
    leftTitle(index) {
      //   console.log(index)
      this.curSelected = index;
      this.rightDiv.scrollToElement(document.getElementById(index), 400);
    },
    add(i) {
      console.log(i);
      //   this.data.num += i;
    }
  }
};
</script>

<style lang="less" scoped>
.selected {
  background: #fff;
}
.flex {
  height: 100%;
  display: flex;
  .left-box {
    background: rgb(247, 245, 245);
    width: 100px;
    height: 430px;
    overflow: scroll;
    .leftGoods {
      height: 50px;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
    }
  }
  .right-box {
    height: 500px;
    flex: 1;
    overflow: scroll;
    img {
      margin-right: 10px;
      width: 80px;
    }
    .flex {
      height: 100%;
      padding: 15px;
      border-bottom: 1px solid #ccc;
      display: flex;
    }
    h5 {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background: rgb(238, 236, 236);
      border-left: 2px solid #ccc;
    }
    .width {
      width: 25px;
      height: 25px;
    }
    .span {
      color: #f00;
      margin-right: 50px;
    }
  }
}
</style>
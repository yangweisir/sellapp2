<template>
  <div class="flex">
    <div class="left-box">
      <ul class="content">
        <div
          :class="{leftGoods:true,selected:index==curSelected}"
          @click="leftTitle(index)"
          v-for="(item,index) in goodslist"
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
        <div :id="index" v-for="(item,index) in goodslist" :key="item.name">
          <h5>{{item.name}}</h5>
          <div class="flex" v-for="child in item.foods" :key="child.name">
            <div>
              <img :src="child.icon" alt />
            </div>
            <div>
              <p style="font-size:16px"><strong>{{child.name}}</strong></p>
              <p>{{child.description}}</p>
              <label>月售{{child.sellCount}}份 好评率{{child.rating}}%</label>
              <span class="span">￥{{child.price}}</span>

              <button class="width" @click="clickNumChange(child.name,-1)">-</button>
              
              <span style="margin:0 5px">{{child.num}}</span>

              <button class="width"  @click="clickNumChange(child.name,1)">+</button>

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
      // list: [],
      curSelected: 0,
    };
  },
  created() {
    getCommodity().then(res => {
        // console.log(res);
      this.$store.commit('initList',res.data.data)
    });
  },
  mounted() {
    new BSscroll(document.querySelector(".left-box"), {
      click: true
    });
    this.rightDiv = new BSscroll(document.querySelector(".right-box"),{
      probeType:3
    });
    this.rightDiv.on('scroll',({y})=>{
      let _y=Math.abs(y)
      // console.log(_y)
      for (let obj of this.getDivMath){
        if(_y>=obj.min && _y<obj.max){
          this.curSelected=obj.index
        }
      }
    }) 
  },
  methods: {
    leftTitle(index) {
        // console.log(index)
      this.curSelected = index;
      this.rightDiv.scrollToElement(document.getElementById(index), 400);
    },
    clickNumChange(name,key) {
      console.log(name,key);
      this.$store.commit('changeGoodsNum',{
        name,
        key
      })      
    },
   
  },
  computed:{
    getDivMath(){
      let arr=[]
      let total=0
      for(let i=0;i<this.goodslist.length;i++){
        let curDivHeight=document.getElementById(i).offsetHeight
        arr.push({min:total,max:total+curDivHeight,index:i})
        total+=curDivHeight
      }
      return arr
    },
    goodslist(){
      return this.$store.state.goodslist
    },
    num(){
      return this.$store.state.num

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
    background: rgb(236, 236, 236);
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
      border-radius: 50%;
      border: 0;
      background:rgb(14, 117, 250);
      color: #fff;
    }
    .span {
      color: #f00;
      margin-right: 30px;
    }
  }
}
</style>
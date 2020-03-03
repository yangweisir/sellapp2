import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodslist:[],
  },
  mutations: {
    initList(state,newArr){
      state.goodslist=newArr
    },
    changeGoodsNum(state,obj){
      for(let typeObj of state.goodslist){
        for(let food of typeObj.foods){
          if(food.name==obj.name){
            food.num+=obj.key
          }
        }
      }
    }
  },
  getters:{
    getShopCarGoods(state){
      let arr=[]
      let names=[]
      for (let typeObj of state.goodslist){
        for(let food of typeObj.foods){
          if(food.num>0){
            if(!names.includes(food.name)){
              arr.push(food)
              names.push(food.name)
            }
          }
        }
      }
      return arr
    }
  }
})

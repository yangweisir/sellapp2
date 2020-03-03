<template>
  <div>
    <div v-for="item in getShopCarGoods" :key="item.name">
      <span style="margin-right:30px;color:#f60">{{ item.name }}</span>
      <div class="inline-block">
        <button class="width" @click="clickNumChange(item.name,-1)">-</button>
        <span style="margin:0 5px">{{item.num}}</span>
        <button class="width" @click="clickNumChange(item.name,1)">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: {},
  computed: {
    getShopCarGoods() {
      return this.$store.getters.getShopCarGoods;
    }
  },
  methods: {
    clickNumChange(name, key) {
      console.log(name, key);
      this.$store.commit("changeGoodsNum", {
        name,
        key
      });
    }
  }
};
</script>

<style lang="less" scoped>
.width {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 0;
  background: rgb(14, 117, 250);
  color: #fff;
}
.inline-block {
  display: inline-block;
}
</style>
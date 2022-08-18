<template>
  <view class="content">
    <view
      class="flex bg-white align-center justify-center"
      style="height: 100rpx"
    >
      <!-- <text style="color: #ff9900; font-size: 28rpx">东坡国际花园户型</text> -->
    </view>
    <view class="flex flex-column p-2">
      <view
        @click="selectHouseType"
        class="flex bg-white align-center p-2"
        style="border-bottom: 1px solid rgba(187, 187, 187, 0.2)"
      >
        <text style="color: #02b1be; font-size: 28rpx">没有我的户型</text>
      </view>
 
      <view
        v-for="(item, index) in List"
        :key="index"
        class="flex flex-column bg-white p-2"
        style="border-bottom: 1px solid rgba(187, 187, 187, 0.2)"
      >
        <text @click="GoBack(item)" style="color: #000000; font-size: 28rpx">{{
          item
        }}</text>
        <!-- <text style="color: #888; font-size: 26rpx">130㎡</text> -->
      </view>
    </view>

    <u-select
      v-model="showSelect"
      mode="mutil-column"
      :list="TypeConfirmList"
      @confirm="HouseTypeConfirm"
    ></u-select>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showSelect: false,
      TypeConfirmList: [
        [
          {
            value: "1",
            label: "1室",
          },
          {
            value: "2",
            label: "2室",
          },
          {
            value: "3",
            label: "3室",
          },
          {
            value: "4",
            label: "4室",
          },
          {
            value: "5",
            label: "5室",
          },
        ],
        [
          {
            value: "6",
            label: "0厅",
          },
          {
            value: "7",
            label: "1厅",
          },
          {
            value: "8",
            label: "2厅",
          },
          {
            value: "9",
            label: "3厅",
          },
          {
            value: "10",
            label: "4厅",
          },
          {
            value: "11",
            label: "5厅",
          },
        ],
        [
          {
            value: "12",
            label: "0厨",
          },
          {
            value: "13",
            label: "1厨",
          },
          {
            value: "14",
            label: "2厨",
          },
          {
            value: "15",
            label: "3厨",
          },
          {
            value: "16",
            label: "4厨",
          },
          {
            value: "17",
            label: "5厨",
          },
        ],
        [
          {
            value: "18",
            label: "0卫",
          },
          {
            value: "19",
            label: "1卫",
          },
          {
            value: "20",
            label: "2卫",
          },
          {
            value: "21",
            label: "3卫",
          },
          {
            value: "22",
            label: "4卫",
          },
        ],
        [
          {
            value: "23",
            label: "0阳台",
          },
          {
            value: "24",
            label: "1阳台",
          },
          {
            value: "25",
            label: "2阳台",
          },
          {
            value: "26",
            label: "3阳台",
          },
          {
            value: "27",
            label: "4阳台",
          },
          {
            value: "28",
            label: "5阳台",
          },
        ],
      ],
      HouseType: "", //户型类型
      CityCode: "",
      CommunityName: "",
      List: [],
    };
  },
  methods: {
    selectHouseType() {
      this.showSelect = true;
    },
    HouseTypeConfirm(e) {
      console.log(e);
      this.HouseType =
        e[0].label + e[1].label + e[2].label + e[3].label + e[4].label;
      console.log(this.HouseType);
      this.GoBack(this.HouseType);
    },
    GoBack(item) {
      console.log(JSON.stringify(item));
      let pages = getCurrentPages(); //获取所有页面栈实例列表
      let nowPage = pages[pages.length - 1]; //当前页页面实例
      let prevPage = pages[pages.length - 2]; //上一页页面实例
      var HouseType = prevPage.$vm.HouseType;
      HouseType = item;
      prevPage.$vm.HouseType = HouseType;
      // 返回上一个界面
      uni.navigateBack({
        delta: 1,
      });
    },
  },
  onLoad(option) {
    this.CityCode = option.CityCode;
    this.CommunityName = option.name;
    console.log(this.CityCode);
    console.log(this.CommunityName);
  },
  onShow() {
    //获取信息
    var _self = this;
    var ProductList =
      _self.AJB.BizUrl + "api/Communication/GetHouseTypeForFitmentCount";
    var ProductListDatas = {
      CommunityName: _self.CommunityName,
      CityCode: _self.CityCode,
    };
    _self.AJB.UniAjax(ProductList, ProductListDatas)
      .then((res) => {
        console.log(JSON.stringify(res));
        if (res.code == 200) {
          _self.List = res.dataList;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
</style>
<template>
  <view class="content position-relative">
    <view class="flex flex-column" style="margin: 20rpx">
      <view
        class="bg-white"
        style="width: 100%; border-radius: 10rpx 10rpx 10rpx 10rpx"
      >
        <view class="flex align-center" style="height: 140rpx">
          <!-- <view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" src="/static/img/head/demo6.jpg" style="width: 100rpx;height: 100rpx;"></image>
					</view> -->
          <view
            class="flex flex-column justify-center px-2"
            style="width: 520rpx; height: 100%"
          >
            <view class="">
              <text style="font-size: 30rpx; color: #101010; font-weight: bold"
                >{{order.ownerName}}</text
              >
            </view>
            <view class="flex align-center">
              <text style="color: #888; font-size: 26rpx"
                >{{order.communityName}}</text
              >
            </view>
          </view>
          <view
            class="flex justify-end align-center pr-2"
            style="height: 100%; width: 200rpx"
          >
          </view>
        </view>
        <view class="px-2 flex align-center" style="height: 60rpx">
          <view class="" style="width: 440rpx">
            <text class="text-title">户型：</text>
            <text class="text-content">{{order.houseType}}</text>
          </view>
          <view class="" style="width: 280rpx">
            <text class="text-title">建筑面积：</text>
            <text class="text-content">{{order.area}}㎡</text>
          </view>
        </view>
        <view class="px-2 flex align-center" style="height: 60rpx">
          <view class="" style="width: 640rpx">
            <text class="iconfont" style="font-size: 28rpx; color: #999"
              >&#xe65e;</text
            >
            <text style="font-size: 24rpx; color: #999"
              >{{order.address}}</text
            >
          </view>
        </view>
      </view>
      <!-- 销售人员 -->
      <view
        class="flex flex-column p-2 bg-white mt-2"
        style="border-radius: 10rpx 10rpx 10rpx 10rpx"
      >
        <text style="color: #888; font-size: 26rpx">销售人员</text>
        <view
          class="flex align-center rounded pl-3"
          style="background-color: #f6f6f7; width: 670rpx; height: 150rpx"
        >
          <image
            :src="order.headPortrait"
            class="rounded"
            style="width: 120rpx; height: 120rpx"
          ></image>
          <view class="flex flex-column ml-2">
            <view class="flex align-center">
              <text
                class="mr-1"
                style="color: #101010; font-size: 32rpx; font-weight: bold"
                >{{order.saleManName}}</text
              >
              <text
                class="font-sm text-white bg-danger px-1 pl-1"
                style="border-radius: 0rpx 8rpx 8rpx 0rpx"
                >销售</text
              >
            </view>
            <view class="flex">
              <text style="font-size: 26rpx; color: #939393">{{order.signature}}</text>
            </view>
            <view class="flex">
              <u-rate
                :disabled="true"
                :current="4"
                :size="28"
                inactive-color="#B2B2B2"
                active-color="#FF9900"
                active-icon="star-fill"
                inactive-icon="star"
              ></u-rate>
              <text style="color: #ff1b1b">3.0分</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 材料清单 -->
      <view
        @click="skipMaterialList"
        class="flex flex-column p-2 bg-white mt-2"
        style="border-radius: 10rpx 10rpx 10rpx 10rpx"
      >
        <view class="flex justify-between">
          <view class="flex">
            <text style="font-size: 26rpx; color: #999">材料清单</text>
          </view>
          <view class="">
            <!-- <text style="font-size: 26rpx;color: #FF9900;">剩余(20天)</text> -->
            <u-icon
              name="arrow-right"
              style="font-size: 28rpx; color: #777"
            ></u-icon>
          </view>
        </view>
        <view class="flex mt-2">
          <text style="color: #02b1be">已取货：0</text>
          <text style="color: #ff9900; margin-left: 50rpx">未取货：{{order.commCount}}</text>
        </view>
      </view>

      <!-- 占位 -->
      <view style="height: 150rpx"></view>
    </view>

    <view
      @click="checkUserToRoom"
      class="position-fixed"
      style="
        bottom: 300rpx;
        right: 50rpx;
        background-color: #dd6666;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        z-index: 999999;
      "
    >
      <view
        class="flex flex-column align-center justify-center"
        style="width: 100%; height: 100%"
      >
        <text
          class="iconfont"
          style="color: #ffffff; font-size: 50rpx; margin-top: 5rpx"
          >&#xe6ad;</text
        >
        <text class="text-white" style="font-size: 22rpx; margin-top: -10rpx"
          >管家</text
        >
      </view>
    </view>

    <!-- <view class="position-fixed bg-white" style="bottom: 0;width: 750rpx;height: 100rpx;">
			<view class="flex justify-between align-center px-3" style="width: 100%;height: 100%;">
				<text style="color: #4D86D7;background-color: #FFFFFF;border: 1px solid #4D86D7;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">联系业主</text>
				<text style="color: #FFFFFF;background-color: #FF9900;border: 1px solid #FF9900;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">订单作废</text>
			</view>
		</view> -->

    <!-- 底部按钮 -->
    <view class="position-fixed" style="height: 100rpx; width: 100%; bottom: 0">
      <view
        class="flex bg-white"
        style="
          width: 100%;
          height: 100%;
          border-top: 1px solid rgba(187, 187, 187, 0.2);
        "
      >
        <view class="flex align-center pl-2" style="width: 100rpx"> </view>
        <view class="flex align-center justify-end pr-2" style="width: 650rpx">
          <text
            style="
              background-color: #ffffff;
              color: #101010;
              font-size: 26rpx;
              padding: 10rpx 40rpx;
              border-radius: 40rpx;
              border: 1px solid #101010;
            "
            >取消</text
          >
          <text
            @click="ShowModalBox"
            class="ml-3"
            style="
              background-color: #ff9900;
              color: #ffffff;
              font-size: 26rpx;
              padding: 10rpx 40rpx;
              border-radius: 40rpx;
              border: 1px solid #ff9900;
            "
            >加入清单</text
          >
        </view>
      </view>
    </view>

    <!-- 模态框 -->
    <u-modal
      :zoom="false"
      title=""
      :content="ModalContent"
      v-model="ModalShow"
      :show-cancel-button="true"
      confirm-color="#FF9900"
      confirm-text="查看订单"
      cancel-text="返回"
      @confirm="ModalConfirm"
      @cancel="ModalCancel"
    >
    </u-modal>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ModalContent: "商品加入成功",
      ModalShow: false,
	  id: 0,
	  CommId:0,
	  order:{}
    };
  },
  onLoad(option) {
	this.id = option.id;
	this.CommId = option.CommId;
    console.log(this.id);
    console.log(this.CommId);
  },  
  onShow() {
    // 第一次接口
    var RequrestUrl = this.AJB.BizUrl + "api/Order/GetOrderById";
    var RequrestDatas = {
		OrderId:this.id
	};
    this.AJB.UniAjax(RequrestUrl, RequrestDatas, false)
      .then((res) => {
        if (res.code == 200) {
			this.order = res.dataList;
			console.log(this.order);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // 跳转到管家聊天
    checkUserToRoom() {},
    // 跳转到材料清单界面
    skipMaterialList() {
      uni.navigateTo({
        url: "/pages/tabBar/my/OrderWork/SalesMaterialList?id="+this.id+"&CommId="+this.CommId,
      });
    },
    // 显示模态框
    ShowModalBox() {
	  var RequrestUrl = this.AJB.BizUrl + "api/Order/AddCommToOrder";
      var RequrestDatas = {
        OrderId: this.id,
        CommId: this.CommId,
      };
      this.AJB.UniAjax(RequrestUrl, RequrestDatas)
        .then((res) => {
          console.log(JSON.stringify(res));
          if (res.code == 200) {
            this.ModalShow = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 模态框确定
    ModalConfirm() {
      console.log("模态框确定");
      // 跳转到订单详情界面
      uni.navigateTo({
        url: "/pages/tabBar/my/OrderWork/SalesOrderDetails?id="+this.id+"&CommId="+this.CommId,
      });
    },
    // 模态框取消
    ModalCancel() {
      console.log("模态框取消");
    },
  }
};
</script>

<style lang="scss" scoped>
.text-title {
  font-size: 26rpx;
  color: #888;
}
.text-content {
  font-size: 28rpx;
  color: #101010;
}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
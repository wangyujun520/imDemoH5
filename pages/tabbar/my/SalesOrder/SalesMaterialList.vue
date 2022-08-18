<template>
	<view class="content">
		<view class="flex flex-column mt-2 bg-white" style="border-bottom: 1px solid rgba(187, 187, 187, 0.2)">
			<view v-for="(item, index) in order.detail" :key="index">
				<view class="flex p-2">
					<text style="color: #000000">{{ item.storeName }}</text>
				</view>
				<view class="" style="border-bottom: 1px solid rgb(187, 187, 187, 0.2)">
					<view class="flex px-2 pt-2">
						<view class="flex" style="width: 150rpx; height: 150rpx">
							<image class="rounded" :src="item.commUrl" style="width: 100%; height: 100%"></image>
						</view>
						<view class="flex flex-column pl-1" style="width: 550rpx">
							<text class="LineBreak" style="color: #101010; font-size: 24rpx">{{ item.commName }}</text>
							<text class="my-1" style="color: #939393; font-size: 24rpx">{{
                item.specifications
              }}</text>
							<view class="flex justify-between">
								<view class="flex">
									<text style="color: #101010; font-size: 26rpx">参考价：{{ item.price }}</text>
								</view>
								<view v-if="IsSale==false" class="">
									<u-number-box v-model="item.count" @change="valChange(item.count, item.commId)"></u-number-box>
								</view>
								<view v-else class="">
									<text>商品数量:{{item.count}}</text>
								</view>
							</view>
						</view>
					</view>

					<view class="flex justify-between p-2">
						<view class="flex">
							<text style="color: #ff0000; font-size: 28rpx">等待客户取货</text>
						</view>
						<view v-if="IsSale==false" class="">
							<text @click="ActionSheetShow(item.commId)" class="iconfont" style="color: #000000; font-size: 40rpx">&#xe61e;</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex flex-column mt-2 bg-white p-2">
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总量</text>
				</view>
				<view class="flex">
					<text>{{ order.commCount }}</text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总额</text>
				</view>
				<view class="flex">
					<text>￥{{ order.origialPrice }}</text>
					<!-- <text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">19898.00</span></text> -->
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商家优惠</text>
				</view>
				<view class="flex">
					<text style="color: #02b1be; font-size: 20rpx">￥<span style="font-size: 30rpx; font-weight: bold">{{
              order.discount
            }}</span></text>
				</view>
			</view>
			<view class="flex justify-end align-center" style="height: 100rpx">
				<text>金额：</text>
				<text style="color: #e51c23; font-size: 30rpx">￥<span style="font-size: 40rpx; font-weight: bold">{{
            order.realPrice
          }}</span></text>
			</view>
		</view>

		<!-- 占位 -->
		<view style="height: 150rpx"></view>

		<view @click="checkUserToRoom" class="position-fixed" style="
        bottom: 300rpx;
        right: 50rpx;
        background-color: #dd6666;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        z-index: 999999;
      ">
			<view class="flex flex-column align-center justify-center" style="width: 100%; height: 100%">
				<text class="iconfont" style="color: #ffffff; font-size: 50rpx; margin-top: 5rpx">&#xe6ad;</text>
				<text class="text-white" style="font-size: 22rpx; margin-top: -10rpx">管家</text>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="position-fixed bg-white" style="bottom: 0;width: 750rpx;height: 100rpx;">
			<view class="flex justify-between align-center px-3" style="width: 100%;height: 100%;">
				<text @click="showModalList" style="color: #4D86D7;background-color: #FFFFFF;border: 1px solid #4D86D7;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">优惠</text>
				<text @click="showModalList" style="color: #FFFFFF;background-color: #02B1BE;border: 1px solid #02B1BE;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">出货</text>
			</view>
		</view>

		<u-modal v-model="showModal" :zoom="false" :show-cancel-button="true" @confirm="OutStockConfirm">
			<view class="flex flex-column">
				<view class="flex mt-2">
					<view style="width: 200rpx" class="flex justify-end">
						<text style="color: #888; font-size: 28rpx">当前金额：</text>
					</view>
					<view style="width: 400rpx" class="flex">
						<text style="color: #000000; font-size: 26rpx">￥{{order.origialPrice}}</text>
					</view>
				</view>

				<view class="flex align-center mt-2">
					<view style="width: 200rpx" class="flex justify-end">
						<text style="color: #888; font-size: 28rpx">优惠金额：</text>
					</view>
					<view style="width: 400rpx" class="flex">
						<input type="number" value="" v-model="Discount" placeholder="录入优惠金额" style="background-color: #f4f4f4; color: #888"
						 class="p-1" />
					</view>
				</view>

				<view class="flex my-2">
					<view style="width: 200rpx" class="flex justify-end">
						<text style="color: #888; font-size: 28rpx">优惠后金额：</text>
					</view>
					<view style="width: 400rpx" class="flex">
						<text style="color: #ff0000; font-size: 26rpx">￥{{order.origialPrice-Discount}}</text>
					</view>
				</view>
			</view>
		</u-modal>
		<u-action-sheet :list="ActionSheetList" @click="SetUpClick" v-model="showActionSheet"></u-action-sheet>

		<!-- 模态框 -->
		<u-modal :zoom="false" title="" :content="ModalContent" v-model="ModalShow" :show-cancel-button="true" confirm-color="#FF9900"
		 confirm-text="查看订单" cancel-text="返回" @confirm="ModalConfirm" @cancel="ModalCancel">
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Discount: 0,
				showModal: false,
				value: 0,
				ActionSheetList: [{
					text: "删除",
					color: "red",
				}, ],
				showActionSheet: false,
				ModalContent: "商品加入成功",
				ModalShow: false,
				id: 0,
				CommId: 0,
				order: {},
				dele: 0,
				IsSale:false
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.CommId = option.CommId;
			if(option.IsSale=='true')
			{
				this.IsSale=true;
			}
			console.log(this.id);
			console.log(this.CommId);
		},
		onShow() {
			// 第一次接口
			this.GetData();
		},
		methods: {
			// 跳转到管家聊天界面
			checkUserToRoom() {},
			GetData() {
				var RequrestUrl = this.AJB.BizUrl + "api/Order/GetOrderDetail";
				var RequrestDatas = {
					OrderId: this.id,
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
			// 弹出模态框
			showModalList() {
				this.showModal = true;
			},
			OutStockConfirm() {
				var RequrestUrl = this.AJB.BizUrl + "api/Order/OutStockConfirm";
				var RequrestDatas = {
					OrderId: this.id,
					Discount: this.Discount,
				}
				this.AJB.UniAjax(RequrestUrl, RequrestDatas, false)
					.then((res) => {
						if (res.code == 200) {
							uni.showToast({
								duration: 2000,
								title: '出货完成!'
							})
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 数量变化
			valChange(value, commId) {
				var RequrestUrl = this.AJB.BizUrl + "api/Order/ChangeCount";
				var RequrestDatas = {
					OrderId: this.id,
					CommId: commId,
					Count: value,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas, false)
					.then((res) => {
						if (res.code == 200) {
							this.GetData();
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 显示删除
			ActionSheetShow(commId) {
				this.dele = commId;
				this.showActionSheet = true;
			},
			//删除按钮点击事件
			SetUpClick() {
				console.log(this.dele);
				var RequrestUrl = this.AJB.BizUrl + "api/Order/DeleOrderComm";
				var RequrestDatas = {
					OrderId: this.id,
					CommId: this.dele,
					Count: 0,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas, false)
					.then((res) => {
						if (res.code == 200) {
							this.GetData();
						}
					})
					.catch((err) => {
						console.log(err);
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
					url: "/pages/tabBar/my/OrderWork/SalesOrderDetails?id=" +
						this.id +
						"&CommId=" +
						this.CommId,
				});
			},
			// 模态框取消
			ModalCancel() {
				console.log("模态框取消");
			},
		},
	};
</script>

<style lang="scss">
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>

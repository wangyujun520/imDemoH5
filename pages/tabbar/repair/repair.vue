<template>
	<view class="content">
		<view v-for="(item,index) in DataList" class="flex flex-column mt-2 bg-white"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex p-2">
				<!-- <text style="color: #000000;">兔宝宝木材</text> -->
				<text style="color: #000000;">{{item.store_title}}</text>
			</view>
			<view @click="skipOrderInformation(good)" class="" style="border-bottom: 1px solid rgb(187,187,187,0.2);"
				v-for="(good,gindex) in item.goods_list">
				<view class="flex px-2 pt-2">
					<view class="flex" style="width: 150rpx;height: 150rpx;">
						<image class="rounded" :src="good.cover" @error="imgerror($event, index,gindex )"
							style="width: 100%;height: 100%;"></image>
					</view>
					<view class="flex flex-column pl-1" style="width: 550rpx;">
						<text class="LineBreak" style="color: #101010;font-size: 24rpx;">{{good.title}}</text>
						<text class="my-1" style="color: #939393;font-size: 24rpx;">{{good.tags}}</text>
						<text style="color: #101010;font-size: 26rpx;">参考价：{{good.price}}</text>
					</view>
				</view>
				<view class="flex justify-between p-2">
					<text style="color: #FF9900;font-size: 28rpx;">{{good.status_text}}</text>
				</view>
			</view>
		</view>

		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 90vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>

		<!-- <view class="flex flex-column mt-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex p-2">
				<text style="color: #000000;">品牌墙纸墙布专卖店</text>
			</view>
			<view class="" style="border-bottom: 1px solid rgb(187,187,187,0.2);" v-for="i in 2">
				<view class="flex px-2 pt-2">
					<view class="flex" style="width: 150rpx;height: 150rpx;">
						<image class="rounded"
							src="//img14.360buyimg.com/n2/s270x270_jfs/t1/168015/25/7494/284999/60345567Ee31ecc59/182d28bbd94bfd17.jpg!q70.dpg"
							style="width: 100%;height: 100%;"></image>
					</view>
					<view class="flex flex-column pl-1" style="width: 550rpx;">
						<text class="LineBreak" style="color: #101010;font-size: 24rpx;">兔宝宝儿童床女孩粉色公主床女孩粉红色儿童单人套房儿童床1.5米
							单床 150cm*200cm</text>
						<text class="my-1" style="color: #939393;font-size: 24rpx;">数量：1 颜色：粉红色 尺寸：150cm*200cm</text>
						<text style="color: #101010;font-size: 26rpx;">参考价：2999</text>
					</view>
				</view>
				<view class="flex justify-between p-2">
					<text style="color: #939393;font-size: 28rpx;">已到期</text>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMUserSig: "",
				LoginPhone: "",
				DataList: []
			}
		},
		onShow() {
			// this.LoginPhone = uni.getStorageSync('LoginPhone');
			// this.IMUserSig = uni.getStorageSync('IMUserSig');
			// if (this.IMUserSig == null && this.IMUserSig.length <= 0 || this.IMUserSig == '') {

			// } else {}

			// 获取商品明细
			this.$post(this.$url.Service.GetOrders, {
				page_no: 1,
				page_size: 10
			}, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data.list;
				}
			})


		},
		methods: {
			GoToLogin() {
				uni.navigateTo({
					url: '/pages/login/login?url="/pages/tabBar/repair/repair"'
				})
			},
			// 跳转到订单信息界面
			skipOrderInformation(good) {
				uni.navigateTo({
					url: '/pages/tabbar/repair/OrderInformation?id=' + good.order_material_list_id
				})
			},
			imgerror(e, img_index, index) {
				this.DataList[img_index].goods_list[index].cover = 'http://oss.anjubang.cn/nopic.png'
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}

	.column {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.center {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.mix-empty {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		animation: show .5s 1;
	}

	@keyframes show {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.default {
		padding-top: 26vh;
		/* #ifdef H5 */
		padding-top: 30vh;
		/* #endif */

		.icon {
			width: 460rpx;
			height: 342rpx;
		}

		.text {
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #999;
		}
	}

	.cart {
		padding-top: 14vh;
		/* #ifdef H5 */
		padding-top: 18vh;
		/* #endif */

		.icon {
			width: 320rpx;
			height: 320rpx;
		}

		.title {
			margin: 50rpx 0 26rpx;
			font-size: 34rpx;
			color: #333;
		}

		.text {
			font-size: 28rpx;
			color: #aaa;
		}

		.btn {
			width: 320rpx;
			height: 80rpx;
			margin-top: 80rpx;
			text-indent: 2rpx;
			letter-spacing: 2rpx;
			font-size: 32rpx;
			color: #fff;
			border-radius: 100rpx;
			background: linear-gradient(to bottom right, #FFCC99, #FF9900);
		}
	}
</style>

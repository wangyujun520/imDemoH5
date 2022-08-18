<template>

	<view v-else class="content">

		<!-- 内容开始 -->
		<view v-for="(sitem, sindex) in DataList" :key="sindex" class="FindInfo px-2 py-2"
			style="border-bottom: 1px solid rgb(187, 187, 187, 0.5)">
			<view class="flex">
				<view class="flex align-center" @click="JumpHomePage(sitem)">
					<image :src="sitem.headPhoto" style="width: 110rpx; height: 110rpx" class="rounded"></image>
				</view>
				<view class="flex flex-column pl-2" style="width: 490rpx">
					<view class="UserInfo pt-1">
						<text class="mr-1"
							style="color: #101010; font-size: 32rpx; font-weight: bold">{{ sitem.name }}</text>
						<text class="font-sm text-white bg-danger px-1 pl-1"
							style="border-radius: 0rpx 8rpx 8rpx 0rpx">{{ sitem.professions }}</text>
					</view>
					<view class="Describe">
						<text style="font-size: 26rpx; color: #939393">{{ sitem.signature }}</text>
					</view>
					<view class="Scoring">
						<u-rate :disabled="true" :current="sitem.score" :size="28" inactive-color="#B2B2B2"
							active-color="#FF9900" active-icon="star-fill" inactive-icon="star"></u-rate>
						<text style="color: #ff1b1b">{{ sitem.score }}分</text>
					</view>
				</view>
				<view class="flex justify-end align-center" style="width: 110rpx">
					<text v-if="!sitem.attention && !sitem.isSelf" class="rounded px-1" @click="attention(sitem)"
						style="color: #ff9900;border: 1px solid #ff9900;padding-top: 5rpx;padding-bottom: 5rpx;">
						+关注
					</text>
					<text v-if="sitem.attention && !sitem.isSelf" @click="attention(sitem)" class="rounded px-1"
						style="color: #939393;border: 1px solid #939393;padding-top: 5rpx;padding-bottom: 5rpx;">
						已关注
					</text>
				</view>
			</view>
			<!-- 顶部结束 -->
			<!-- 内容开始 -->
			<view class="Content-Text mt-1">
				<!-- 展开收起效果 -->
				<u-read-more :toggle="toggle" :show-height="showHeight" ref="uReadMore">
					<rich-text :nodes="sitem.content" style="line-height: 45rpx"></rich-text>
				</u-read-more>
			</view>
			<!-- 图片显示 -->
			<view v-if="sitem.communicationType == 'image'" class="Pic-Box flex flex-wrap mt-1">
				<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in sitem.photos" :key="imgindex"
					style="width: 235rpx; height: 235rpx">
					<!-- <image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" style="width: 100%; height: 100%"></image> -->
					<!-- 处理图片压缩，显示缩略图 -->
					<image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" mode="aspectFill"
						style="width: 100%; height: 100%"></image>
				</view>
			</view>
			<!-- 视频显示 -->
			<view v-if="sitem.communicationType == 'video'" @click="openVideo(sitem.video)"
				class="position-relative mt-2">
				<image @load="loadImage"
					:src="sitem.video + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
				<text class="iconfont text-white position-absolute"
					style="font-size: 80rpx; width: 80rpx; height: 80rpx" :style="posterIconStyle">&#xe99a;</text>
			</view>
			<!-- 定位信息开始 -->
			<view class="flex pt-2">
				<i class="iconfont pr-1" style="color: #398fff; font-weight: bold; font-size: 30rpx">&#xe659;</i>
				<text style="font-size: 26rpx; color: #666666">{{ sitem.address }}</text>
			</view>
			<!-- 定位信息结束 -->
			<!-- 点赞评论开始 -->
			<view class="LikeBox flex px-1 pt-2">
				<view class="flex flex-1 justify-end align-center">
					<text :style="{ color: sitem.support ? '#ff9900' : '#939393' }" class="iconfont"
						style="font-size: 36rpx; margin-right: 5rpx" @click="support(sitem)">
						&#xe641;
					</text>
					<text :style="{ color: sitem.support ? '#ff9900' : '#939393' }"
						style="font-size: 26rpx">{{ sitem.supportNumber }}</text>
				</view>
			</view>
		</view>

		<u-loadmore v-if="DataList.length>0" bg-color="rgb(240, 240, 240)" :status="loadStatus"
			@loadmore="addRandomData"></u-loadmore>


		<!-- 弹出框样式结束 -->

	</view>
</template>

<script>
	import $T from '@/common/free-lib/time.js';
	export default {
		// 监听用户下拉动作
		onPullDownRefresh() {
			this.RefreshData();
		},
		onReachBottom() {
			this.loadStatus = "loading"; //加载中
			this.addRandomData();
		},
		data() {
			return {
				follow: false, //是否关注
				isCreate: false,
				triggered: false,
				IMUserSig: "",
				LoginPhone: "",
				loadStatus: "loadmore",
				page: 0, //分页数据
				totalCount: 0, //总共条数
				current: 0, //当前选中的下标
				activeColor: this.$u.color['warning'],
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				list: [],
				DataList: [],
				// 点赞评论
				showHeight: 200,
				toggle: true,
				// 展开收起
				w: 100, //视频宽度
				h: 100, //视频高度
				// 横屏
				VideoImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606210247755&di=61b378fa5ceac7885a1c6724e8e4d75c&imgtype=0&src=http%3A%2F%2Fwww.itbear.com.cn%2Fupload%2F2020-10%2F201027122153461.png', //视频封面图片
				ActionSheetList: [{
						text: '发布图文'
					},
					{
						text: '发布视频'
					}
				],
				showActionSheet: false
			}
		},
		computed: {
			// 短视频封面图标
			posterIconStyle() {
				let w = this.w / 2 - uni.upx2px(80) / 2;
				let h = this.h / 2 - uni.upx2px(80) / 2;
				return `left:${w}px;top:${h}px;`;
			}
		},
		watch: {
			current(Value) {
				this.page = 0;
				this.DataList = [];
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/GetCommunicationList';
				var RequrestDatas = {
					type: this.list[this.current].name,
					maxResultCount: 5,
					skipCount: 0
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					console.log(JSON.stringify(res));
					this.DataList = res.dataList.items;
					this.totalCount = res.dataList.totalCount;
				}).catch(err => {
					console.log(err);
				});
			}
		},
		methods: {
			GoToLogin() {
				uni.navigateTo({
					url: '/pages/login/login?url="/pages/tabBar/find/find"'
				})
			},
			// 上拉加载
			addRandomData() {
				// console.log(222222222)
				console.log(this.page);
				this.page += 5;
				if (this.page >= this.totalCount) {
					this.loadStatus = "nomore"; //加载完成
					return;
				}
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/GetCommunicationList';
				var RequrestDatas = {
					type: "关注",
					maxResultCount: 5,
					skipCount: this.page
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					res.dataList.items.forEach((items) => {
						this.DataList.push(items);
					});
					this.totalCount = res.dataList.totalCount;
					this.loadStatus = "loadmore"; //加载完成
				}).catch(err => {
					console.log(err);
				});


			},
			// 下拉刷新
			RefreshData() {
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/GetCommunicationList';
				var RequrestDatas = {
					type: "关注",
					maxResultCount: 5,
					skipCount: 0
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					uni.stopPullDownRefresh(); //停止当前页面下拉刷新
					this.DataList = res.dataList.items;
					this.totalCount = res.dataList.totalCount;
				}).catch(err => {
					console.log(err);
				});
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			// 加载图片
			loadImage(e) {
				// 拿到图片的宽高
				let w = e.detail.width;
				let h = e.detail.height;
				// 最大宽度 px
				let maxW = uni.upx2px(500);
				// 最大高度 px
				let maxH = uni.upx2px(350);
				if (h <= maxH) {
					// 用原来的宽高
					this.w = w <= maxW ? w : maxW;
					this.h = h;
					return;
				}
				this.h = maxH;
				let w2 = maxH * (w / h);
				this.w = w2 <= maxW ? w2 : maxW;
			},
			// 预览图片
			previewImage(url, list) {
				uni.previewImage({
					current: url,
					urls: list,
					indicator: 'number'
				});
			},
			// 打开视频
			openVideo(url) {
				// 跳转页面
				uni.navigateTo({
					url: '/pages/chat/video/video?url=' + url
				});
			},
			// 跳转到个人详情页面
			JumpHomePage(item) {
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage?id=' + item.mobileUserId
				});
			},
			// 点赞
			support(item) {
				if (!item.support) {
					var RequrestUrl = this.AJB.BizUrl + 'api/Communication/SupportCommunication';
					var RequrestDatas = {
						communicationId: item.id
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then(res => {
							console.log(JSON.stringify(res));
							if (res.code == 200) {
								//成功
								item.support = true;
								item.supportNumber++;
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			// 关注
			attention(item) {
				this.follow = !this.follow;
				//if (!item.attention) {
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/Attention';
				var RequrestDatas = {
					mobileUserId: item.mobileUserId
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then(res => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							console.log(JSON.stringify(item));
							//item.isSelf = this.follow;
							//成功
							item.attention = !item.attention;
							console.log(JSON.stringify(item));
						}
					})
					.catch(err => {
						console.log(err);
					});
				//}
			},
			// 格式化日期开始
			FormateTime(timestamp) {
				return $T.getDateDiff(timestamp); //时差结果
			},
			firstInterFace() {
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/GetCommunicationList';
				var RequrestDatas = {
					type: "关注",
					maxResultCount: 5,
					skipCount: 0
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					console.log(JSON.stringify(res));
					this.DataList = res.dataList.items;
					this.totalCount = res.dataList.totalCount;
				}).catch(err => {
					console.log(err);
				});
			}
		},
		onShow() {
			this.LoginPhone = uni.getStorageSync('LoginPhone');
			this.IMUserSig = uni.getStorageSync('IMUserSig');
			this.firstInterFace();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
	}

	// 通过/deep/样式穿透去控制组件的内容
	.wrap /deep/ .u-content {
		color: #666 !important;
	}

	// 点赞评论样式开始
	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
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

	// 点赞评论结束
</style>

<template>
	<view class="content" style="padding-bottom: 100rpx;">
		<!-- <image :src="dataList.cover" style="width: 750rpx;height: 400rpx;"></image> -->
		<view style="background-size: 100% 100%;height: 400rpx;" :style="{backgroundImage:'url('+dataList.cover+')'}">
		  <view class="flex flex-column align-center justify-center"
		    style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);">
		    <text style="color: #ffffff; font-size: 40rpx; font-weight: bold">{{dataList.conternt}}</text>
		    <text style="color: #ffffff; font-size: 28rpx; font-weight: bold" class="mt-3">{{dataList.createTime}}</text>
		  </view>
		</view>
		<view class="bg-white flex flex-column position-absolute p-3" style="top: 380rpx;width: 750rpx;border-radius: 10rpx 10rpx 0 0;">
			
			
			<view class="flex align-center mt-1">
				<text class="iconfont" style="font-size: 40rpx;">&#xe68b;</text>
				<text style="font-size: 34rpx;color: #000;font-weight: bold;">{{dataList.title}}</text>
			</view>
			
			<!-- 个人信息 -->
		<!-- 	<view class="flex align-center justify-between mt-4 rounded px-3" style="background-color: #f7f7f7;height: 160rpx;">
				<view class="flex align-center">
					<view class="flex">
						<image class="rounded" :src="item.headPortrait" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="flex flex-column">
						<view class="">
							<text class="ml-1" style="color: #6B8EB5;font-size: 28rpx;">{{ item.name }}</text>
							<text style="color: #FFFFFF;background-color: #8A2BE2;font-size: 22rpx;margin-left: 5rpx;">{{ item.TypeWork }}</text>
						</view>
						<view class="">
							<text style="font-size: 26rpx;color: #888;" class="mt-1 ml-1">2020-11-11 12:12</text>
						</view>
					</view>
				</view>
				<view class="flex align-center">
					<text v-if="!doYouCare" class="rounded px-1" @click="attention(doYouCare)" style="color: #ff9900;border: 1px solid #ff9900;padding-top: 5rpx;padding-bottom: 5rpx;">
						+关注
					</text>
					<text v-else class="rounded px-1" style="color: #939393;border: 1px solid #939393;padding-top: 5rpx;padding-bottom: 5rpx;">
						已关注
					</text>
				</view>
			</view> -->
			<!-- 房屋资料 -->
			<view class="flex justify-between bg-white mt-3 rounded" style="height: 150rpx;border: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view>
						<text style="color: #888;font-size: 26rpx;">户型</text>
					</view>
					<view class="mt-1">
						<!-- 系统 -->
						<text style="font-size: 28rpx;">{{dataList.houseType}}</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view>
						<text style="color: #888;font-size: 26rpx;">风格</text>
					</view>
					<view class="mt-1">
						<!-- 系统 -->
						<text style="font-size: 28rpx;">{{dataList.houseStyle}}</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view>
						<text style="color: #888;font-size: 26rpx;">面积</text>
					</view>
					<view class="mt-1">
						<!-- 系统 -->
						<text style="font-size: 28rpx;">{{dataList.houseArea}}㎡</text>
					</view>
				</view>
					
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view>
						<text style="color: #888;font-size: 26rpx;">方式</text>
					</view>
					<view class="mt-1">
						<!-- 系统 -->
						<text style="font-size: 28rpx;">{{dataList.mode=0?'半包':'全包'}}</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view>
						<text style="color: #888;font-size: 26rpx;">方式</text>
					</view>
					<view class="mt-1">
						<!-- 系统 -->
						<text style="font-size: 28rpx;">{{dataList.mode=0?'半包':'全包'}}</text>
					</view>
				</view>
					
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view>
						<text style="color: #888;font-size: 26rpx;">位置</text>
					</view>
					<view class="mt-1">
						<!-- 系统 -->
						<text style="font-size: 28rpx;">{{dataList.address}}</text>
					</view>
				</view>
			</view>
			
			<!-- <view class="flex justify-between p-2 mt-4" style="background-color: #F6F6F7;">
				<view class="flex">
					<text class="iconfont" style="font-size: 30rpx; color: #777">&#xe65e;</text>
					<text class="text-content">四川省成都市武侯区G213辅路</text>
				</view>
				<view class="flex">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view> -->
			
			
			<view v-for="(sitem,sindex) in dataList.space" :key="sindex">
				<view style="height: 10rpx;"></view>
				<view class="flex py-3">
					<text style="color: #000000;font-size: 30rpx;">{{sitem.name}}</text>
				</view>
				<view class="flex flex-column" v-for="(sditem,sdindex) in sitem.spaceDetails" :key="sdindex">
					<image mode="widthFix" v-if="sditem.img!=null" :src="sditem.img" style="width: 100%;"></image>
					<view style="height: 10rpx;"></view>
					<text style="color: #888;font-size: 26rpx;">{{sditem.content}}</text>
				</view>
			</view>
		</view>

		<view v-if="dataList.effectLink!=null" @click="skipThreeDimensional(dataList.effectLink)" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #3291F8;width: 120rpx;height: 120rpx;border-radius: 50%;">
			<view class="flex flex-column align-center justify-center" style="color: #FFFFFF;width: 100%;height: 100%;">
				<text class="iconfont" style="font-size: 50rpx;">&#xe6a9;</text>
				<text style="font-size: 22rpx;">3D效果</text>
			</view>
		</view>
		


		

		<view @click="skipCatalog" class="position-fixed bg-white" style="bottom: 150rpx;right: 50rpx;width: 120rpx;height: 120rpx;border-radius: 50%;border: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center justify-center" style="color: #101010;width: 100%;height: 100%;">
				<text class="iconfont" style="font-size: 50rpx;">&#xe66c;</text>
			</view>
		</view>

		<view  class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="checkUserToRoom" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">联系设计师</text>
				</view>
				<view v-if="isShow" class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="Confirm(1)" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">拒绝</text>
					<text @click="Confirm(2)" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">接受</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: e => {
			if (e.float == 'right') {
				console.log('右上角按钮点击事件');
			}
		},
		data() {
			return {
				isShow:true,
				url:"https://yun.kujiale.com/design/3FO47BN7MV8F/airoaming?kpm=qkWL.2cb8345b43ebbd16.41605b6.1611307888958",
				item: {
					"isOver": false,
					"headPortrait": "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg",
					"name": "掌上明珠",
					"TypeWork": "商家",
					"releaseTime": "2020-12-26 03:27",
					"coverMap": "/static/img/test111.png",
					"title": "品牌周年庆“全场9折”",
					"content": "冰箱、洗衣机、空调家电全场优惠，最高单件优惠可减1999元，抢完及止！！！"
				},
				doYouCare: false,
				dataList: {},
				id: 0				
			};
		},
		computed: {},
		watch: {},
		onLoad(Option) {
			console.log(Option)
			this.id = Option.id;
			//Option.id	
			var RequrestUrl = this.AJB.BizUrl + "api/Design/GetDesingCaseInfo";
			var RequrestDatas = {
				id: Option.id
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					if (res.code == 200) {
						console.log(JSON.stringify(res.dataList))
						this.dataList = res.dataList;
						if(	this.dataList.isConfirm)
						{
							this.isShow = false;
						}
						//this.dataList.effectLink = this.url;
						
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		methods: {
			// 跳转到3D效果
			skipThreeDimensional(Option) {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/EffectPreview?url=' +Option
				})
			},
			Confirm(item) {
				var RequrestUrl =
					this.AJB.BizUrl + "api/Design/DesingnConfirm";
				var RequrestDatas = {
					id: this.id,
					type: item
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						if (res.code == 200) {
							this.$refs.uToast.show({
								title: '设计方案确认成功!',
								type: 'success'
							})
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			checkUserToRoom() {
				// console.log(JSON.stringify(toUserInfo));
				var toUserInfo = {
					"UserID": this.dataList.tel,
					"NickName": this.dataList.name
				}
			console.log(JSON.stringify(this.dataList));
				this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				});
			},
			// 跳转到目录界面
			skipCatalog() {
				uni.removeStorageSync('SpaceDetaileCatalog');
				// 同步缓存
				uni.setStorage({
					key: 'SpaceDetaileCatalog',
					data: this.dataList.space,
					success: function() {
						console.log('success');
					}
				});
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/Catalog'
				})
			},
			attention(item) {
				console.log(item)
			},
			AddCommodity(item) {
				console.log(JSON.stringify(item))

			}
		}
	};
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.text-title {
		font-size: 26rpx;
		color: #999;
	}

	.text-content {
		font-size: 26rpx;
		color: #999;
	}

	.u-content {
		padding: 24rpx;
		font-size: 32rpx;
		color: $u-content-color;
		line-height: 1.6;
	}
</style>

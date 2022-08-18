<template>
	<view class="content">
		<view class="p-3">
			<view class="flex justify-center align-center flex-column bg-white py-6 rounded">
				<!-- <image src="../../../static/img/head/demo5.jpg" style="width: 180rpx;height: 180rpx;"></image> -->
				<image class="rounded" v-if="DataList.headPortrait == null" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1608299331&di=a7976fd7c35b9dc3a793d94ab378cca8&src=http://hbimg.b0.upaiyun.com/0cd238587a0984d24b8688ad35c187da3ace5314317c-KPcKiS_fw658" style="width: 180rpx;height: 180rpx;"></image>
				<image @click="previewImage(DataList.headPortrait)" class="rounded" v-else :src="DataList.headPortrait" style="width: 180rpx;height: 180rpx;"></image>
				<text class="mt-3" style="color: #0072FF;font-size: 26rpx;">房产经纪人</text>
			</view>
			<view class="flex flex-column bg-white mt-2 rounded">
				<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text class="" style="color: #101010;font-size: 28rpx;">姓名</text>
					<view class="flex align-center pr-2">
						<image v-if="IsAuthentication" src="/static/img/authentication.png" style="width: 30rpx;height: 30rpx;"></image>
						<text v-if="IsAuthentication" style="color: #777;font-size: 28rpx;">{{DataList.name}}</text>
						<text v-else style="color: #777;font-size: 28rpx;">请实名认证</text>
						<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
					</view>
				</view>
				
				<view class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text class="" style="color: #101010;font-size: 28rpx;">性别</text>
					<view class="flex align-center">
						<text style="color: #777;font-size: 28rpx;" v-text="DataList.gender == 0 ? '女':'男'"></text>
					</view>
				</view>
				<view class="flex justify-between align-center pl-2 py-3">
					<text class="" style="color: #101010;font-size: 28rpx;">个性签名</text>
					<view class="flex align-center justify-end pr-2" style="width: 500rpx;">
						<text style="color: #777;font-size: 28rpx;">{{DataList.personalSignature}}</text>
						<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
					</view>
				</view>
			</view>
			
			<view class="flex flex-column bg-white mt-2 rounded">
				<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text class="" style="color: #101010;font-size: 28rpx;">邮箱</text>
					<view class="flex align-center pr-2">
						<text style="color: #777;font-size: 28rpx;">{{DataList.email}}</text>
					</view>
				</view>
				<view class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text class="" style="color: #101010;font-size: 28rpx;">手机号</text>
					<view class="flex align-center">
						<text style="color: #777;font-size: 28rpx;">{{DataList.phone}}</text>
					</view>
				</view>
			</view>
			
			<view class="flex flex-column bg-white mt-2 rounded">
				<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text class="" style="color: #101010;font-size: 28rpx;">加入时间</text>
					<view class="flex align-center pr-2">
						<text style="color: #777;font-size: 28rpx;">2020-11-11</text>
					</view>
				</view>
				<view class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text class="" style="color: #101010;font-size: 28rpx;">查看房产</text>
					<view class="flex align-center">
						<text style="color: #777;font-size: 28rpx;">10套</text>
						<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
					</view>
				</view>
			</view>
			
			<view @click="KickOut" class="bg-white mt-2 flex align-center justify-center rounded" style="height: 110rpx;">
				<text style="color: red;font-size: 30rpx;font-weight: bold;">踢出企业</text>
			</view>
			<!-- 占位 -->
			<view style="height: 150rpx;"></view>
		</view>
		
		<view @click="checkUserToRoom" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #FF9900;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;">&#xe6ab;</text>
			</view>
		</view>
		
		<view class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text style="color: #FF0000;font-size: 26rpx;">待审核(2020-11-11)</text>
					<!-- <text style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">联系客户</text> -->
				</view>
				<view class="flex align-center justify-center" style="width: 350rpx;">
					<text style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">拒绝</text>
					<text class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">通过</text>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				DataList:'',//Mock数据
				IsAuthentication:true,
				avatar: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1606385504&di=93bd6dc6d53c036f23affbf5cdc7518b&src=http://imgo173.gda086.com/img2020/11/19/9/2020111965723567.jpg',
			}
		},
		onShow() {
			var DataLists = {
				"code": 200,
				"msg": "ok",
				"dataList": {
					"headPortrait": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1606385504&di=93bd6dc6d53c036f23affbf5cdc7518b&src=http://imgo173.gda086.com/img2020/11/19/9/2020111965723567.jpg",
					"name": "马保国",
					"nickName": "过往年少",
					"gender": 1,
					"personalSignature": "抽烟只抽炫赫门，一生只爱一个人",
					"email": "admin@ebao.vip",
					"phone": "15882182484",
					"bankCard": "654564****4564",
					"serviceArea": "四川省-成都市-高新区",
					"residentArea": "天府大道中段500号1栋43楼4313号"
				}
			};
			this.DataList = DataLists.dataList;
		},
		methods: {
			// 预览图片
			previewImage(url) {
				var imgArr = [];
				imgArr.push(url);
				uni.previewImage({
					current: url,
					urls: imgArr,
					indicator: 'number'
				});
			},
			KickOut(){
				console.log("踢出企业")
			},
			checkUserToRoom() {
				// console.log(JSON.stringify(toUserInfo));
				// var toUserInfo = {
				// 	"UserID":this.user.tel,
				// 	"NickName":this.user.name
				// }
				// this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					// url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
					url: '/pages/chat/chat/chat?'
				});
			},
		}
	}
</script>


<style>
</style>

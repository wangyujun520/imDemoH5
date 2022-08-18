<template>
	<view class="content">
		<!-- <view class="px-3 py-2 bg-white" v-if="chatList.length != 0">
			<u-search placeholder="输入搜索内容" v-model="search" shape="square" height="80" bg-color="#F5F5F5" :iconSize="iconSize" :show-action="false" searchIconColor="#18B566"></u-search>
		</view> -->
		
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="flex justify-between bg-white px-5" style="height: 150rpx;width: 750rpx;">
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;" @tap="skipSystem">
					<view class="position-relative">
						<text style="color:#FF9900;" class="iconfont tab-iconfont">&#xe67d;</text>
						<u-badge v-show="true" :is-dot="true" type="error" :offset="[0, 0]"></u-badge>
					</view>
					<view class="">
						<text style="font-size: 26rpx;">系统</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;" @tap="skipActivity">
					<view class="position-relative">
						<text style="color:#E08F8C;" class="iconfont tab-iconfont">&#xe68f;</text>
						<u-badge v-show="true" :is-dot="true" type="error" :offset="[0, 0]"></u-badge>
					</view>
					<view class="">
						<text style="font-size: 26rpx;">活动</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;" @tap="skipDemand">
					<view class="position-relative">
						<text style="color:#78BD90;" class="iconfont tab-iconfont">&#xe674;</text>
						<u-badge v-show="true" :is-dot="true" type="error" :offset="[0, 0]"></u-badge>
					</view>
					<view class="">
						<text style="font-size: 26rpx;">需求</text>
					</view>
				</view>
				<view v-if="rankno=='1'" class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;" @tap="skipTask">
					<view class="position-relative">
						<text style="color:#41C4CE;" class="iconfont tab-iconfont">&#xe67a;</text>
						<u-badge v-show="true" :is-dot="true" type="error" :offset="[0, 0]"></u-badge>
					</view>
					<view class="">
						<text style="font-size: 26rpx;">任务</text>
					</view>
				</view>
				<view v-if="rankno=='3'" class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;" @tap="skipCoordinationtask">
					<view class="position-relative">
						<text style="color:#6EAAFF;" class="iconfont tab-iconfont">&#xe85b;</text>
						<u-badge v-show="true" :is-dot="true" type="error" :offset="[0, 0]"></u-badge>
					</view>
					<view class="">
						<text style="font-size: 26rpx;">协同</text>
					</view>
				</view>
			</view>
		</u-sticky>
		
		<view class="px-2 bg-white" v-if="chatList.length != 0">
			
			<view @tap="gotoIM(item)" class="flex align-center py-2 border-bottom" v-for="(item,index) in chatList" :key="index">
				<!-- 聊天头像 -->
				<view v-if="item.UserID!='SystemMessage'&&item.UserID!='OrderMessage'" class="flex align-center justify-center">
					<image class="avatar" :src="item.avatar|img" mode="widthFix"></image>
				</view>
				<!-- 系统消息头像 -->
				<view v-if="item.UserID=='SystemMessage'" class="flex align-center justify-center rounded-50" style="background-color: #6BC661;width: 90rpx;height: 90rpx;">
					<text class="iconfont text-white" style="font-size: 60rpx;">&#xe703;</text>
				</view>
				<!-- 订单消息头像 -->
				<view v-if="item.UserID=='OrderMessage'" class="flex align-center justify-center rounded-50" style="background-color: #FF9900;width: 90rpx;height: 90rpx;">
					<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6ea;</text>
				</view>
				
				<view class="flex flex-column justify-between pl-2" style="width: 480rpx;height: 100rpx;">
					<view class="flex align-center">
						<text class="name" v-if="item.UserID!='SystemMessage'&&item.UserID!='OrderMessage'">{{item.nick}}</text>
						<text class="name" v-if="item.UserID=='SystemMessage'">系统消息</text>
						<text class="name" v-if="item.UserID=='OrderMessage'">订单消息</text>
						<view v-if="item.UserID!='SystemMessage'&&item.UserID!='OrderMessage'" class="rounded flex align-center ml-1" style="background-color: #FFE4D7;padding: 5rpx 10rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #F7B03D;margin-right: 5rpx;">&#xe634;</text>
							<text style="color:#F7B03D;font-size: 24rpx;">{{item.RankName}}</text>
						</view>
						<!-- <view v-if="item.UserID!='SystemMessage'&&item.UserID!='OrderMessage'" class="rounded flex align-center ml-1" style="background-color: #DDF1F9;padding: 5rpx 10rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #55A8C6;margin-right: 5rpx;">&#xe634;</text>
							<text style="color:#55A8C6;font-size: 24rpx;">开发商</text>
						</view> -->
					</view>
					<text class="content-text LineBreak1">{{item.Msg}}</text>
				</view>
				<view class="flex flex-column align-end" style="width: 140rpx;height: 100rpx;">
					<text class="time-text">{{ DateConvert(item.lastTime) }}</text>
					<view class="position-relative">
						<!-- 角标 -->
						<u-badge :count="item.UnreadCount" size="default" :offset="[30, 0]"></u-badge>
					</view>
				</view>
			</view>
			
			
			<!-- <view @tap="gotoIM" class="flex align-center bg-white py-2 border-bottom">
				<view class="flex align-center justify-center">
					<image class="avatar" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=378385285,2077996368&fm=26&gp=0.jpg" mode="widthFix"></image>
				</view>
				<view class="flex flex-column justify-between pl-2" style="width: 480rpx;height: 100rpx;">
					<view class="flex align-center">
						<text class="name">张三</text>
						<view class="rounded flex align-center ml-1" style="background-color: #FFE4D7;padding: 5rpx 10rpx;">
							<text style="color:#F7B03D;font-size: 24rpx;">销售</text>
							<u-icon name="level" color="#F7B03D" size="24"></u-icon>
						</view>
					</view>
					<text class="content-text LineBreak1">哈哈哈</text>
				</view>
				<view class="flex flex-column align-end" style="width: 140rpx;height: 100rpx;">
					<text class="time-text">2021-01-02</text>
					<view class="position-relative">
						<u-badge :count="10" size="default" :offset="[30, 0]"></u-badge>
					</view>
				</view>
			</view>
			<view class="flex align-center bg-white py-2 border-bottom">
				<view class="flex align-center justify-center">
					<image class="avatar" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201711%2F04%2F20171104043209_tsKiU.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626663164&t=6516b5088695081b739e42fa81b52061" mode="widthFix"></image>
				</view>
				<view class="flex flex-column justify-between pl-2" style="width: 480rpx;height: 100rpx;">
					<view class="flex align-center">
						<text class="name">李四</text>
						<view class="rounded flex align-center ml-1" style="background-color: #DDF1F9;padding: 5rpx 10rpx;">
							<text style="color:#55A8C6;font-size: 24rpx;">开发商</text>
							<u-icon name="level" color="#55A8C6" size="24"></u-icon>
						</view>
					</view>
					<text class="content-text LineBreak1">哈哈哈</text>
				</view>
				<view class="flex flex-column align-end" style="width: 140rpx;height: 100rpx;">
					<text class="time-text">2021-01-02</text>
					<view class="position-relative">
						<u-badge :count="10" size="default" :offset="[30, 0]"></u-badge>
					</view>
				</view>
			</view>
			<view class="flex align-center bg-white py-2 border-bottom">
				<view class="flex align-center justify-center rounded-50" style="background-color: #6BC661;width: 90rpx;height: 90rpx;">
					<text class="iconfont text-white" style="font-size: 60rpx;">&#xe60c;</text>
				</view>
				<view class="flex flex-column justify-between pl-2" style="width: 480rpx;height: 100rpx;">
					<view class="flex align-center">
						<text class="name">系统消息</text>
					</view>
					<text class="content-text LineBreak1">哈哈哈</text>
				</view>
				<view class="flex flex-column align-end" style="width: 140rpx;height: 100rpx;">
					<text class="time-text">2021-01-02</text>
					<view class="position-relative">
						<u-badge :count="10" size="default" :offset="[30, 0]"></u-badge>
					</view>
				</view>
			</view>
			<view class="flex align-center bg-white py-2 border-bottom">
				<view class="flex align-center justify-center rounded-50" style="background-color: #FF9900;width: 90rpx;height: 90rpx;">
					<text class="iconfont text-white" style="font-size: 60rpx;">&#xe695;</text>
				</view>
				<view class="flex flex-column justify-between pl-2" style="width: 480rpx;height: 100rpx;">
					<view class="flex align-center">
						<text class="name">订单消息</text>
					</view>
					<text class="content-text LineBreak1">哈哈哈</text>
				</view>
				<view class="flex flex-column align-end" style="width: 140rpx;height: 100rpx;">
					<text class="time-text">2021-01-02</text>
					<view class="position-relative">
						<u-badge :count="10" size="default" :offset="[30, 0]"></u-badge>
					</view>
				</view>
			</view> -->
		
		
		</view>
		
		
		<view v-if="chatList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无消息" mode="message"></u-empty>
		</view>
		
		<u-modal v-model="showScanCode" :zoom="false" :show-cancel-button="true" confirm-text="同意" confirm-color="#18B566" cancel-text="稍后" title=""
			@cancel="cancelScanCode" @confirm="confirmScanCode">
			<view class="px-5 pb-3 flex flex-column align-center justify-center bg-white">
				<view class="flex align-center justify-center mb-2 mt-3" style="width: 140rpx;height: 140rpx;border-radius: 50%;background-color: #F7F7F7;">
					<image src="/static/img/camera.png" style="width: 70rpx;height: 60rpx;"></image>
				</view>
				<text class="my-3" style="color: #888;font-size: 30rpx;">需要获取您的相机及相册权限，访问您的摄像头扫码及相册信息。</text>
			</view>
		</u-modal>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default{
		// 监听用户下拉动作
		onPullDownRefresh() {
			this.InitData(); //初始化界面数据
		},
		onNavigationBarButtonTap: function(e) {
			// console.log("右上角点击事件");
			if (e.float == 'right') {
				if(uni.getStorageSync("CameraState")){
					this.scanCode();
				}else{
					this.showScanCode = true;
				}
			}
		},
		computed: {
			...mapState({
				isSDKReady: state => state.im.isSDKReady,
				conversationList: state => state.im.conversationList
			})
		},
		onLoad() {
			//监听已读
			uni.$on('MsgRead', data => {
				// console.log('监听到了');
				//刷新好友列表
				this.getConversationList();
			});
		},
		onShow() {
			if(!this.isSDKReady){
				console.log("掉线重连");
				// 腾讯云IM登录
				// 用户1
				let promise = getApp().$tim.login({
					userID: uni.getStorageSync('phone'),
					userSig:uni.getStorageSync('sign')
				});
				promise.then(res => {
					//登录成功后 更新登录状态
					this.$store.commit('toggleIsLogin', true);
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: err,
						duration: 1500
					});
				});
			}
		},
		watch: {
			isSDKReady(val) {
				console.log(val);
				//isSDKReady == true 请求会话列表
				if (val) {
					// this.UpdateCID(); //更新CID
					// this.UpdateUserInfo(); //更新自己的资料 测试用
					this.getConversationList(); //更新会话列表
					//查询自己的资料更新UserId
					let promise = this.$tim.getMyProfile();
					promise.then(imResponse => {
						this.$store.commit('UpdateMyUserID', imResponse.data.userID);
						// console.log(JSON.stringify(imResponse.data)); // 个人资料 - Profile 实例
					})
					.catch(imError => {
						console.warn('getMyProfile error:', imError); // 获取个人资料失败的相关信息
					});
				}
			},
			conversationList(val) {
				this.getUserInfo(val);
			},
			Count(val) {
				console.log(val);
				this.setTabBarBadge(val);
			}
		},
		data(){
			return{
				rankno: uni.getStorageSync('rankno'),//职级编号
				showScanCode:false,
				search:'',
				iconSize:40,
				chatList:[],//聊天列表
				Count:0//消息记数
			}
		},
		methods:{
			InitData(){
				setTimeout(()=>{
					uni.stopPullDownRefresh(); //停止当前页面下拉刷新
				},1000)
			},
			// 跳转到系统消息
			skipSystem(){
				uni.navigateTo({
					url:'/pages/tabbar/message/NavMenu/system'
				})
			},
			// 跳转到活动页面
			skipActivity(){
				let module = '';
				if(this.rankno == '0'){
					module = 'user'
				}
				if(this.rankno == '1'){
					module = 'designer'
				}
				if(this.rankno == '2'){
					module = 'mall'
				}
				if(this.rankno == '3'){
					module = 'sale'
				}
				if(this.rankno == '4'){
					module = 'surveyor'
				}
				if(this.rankno == '5'){
					module = 'worker'
				}
				// if(this.rankno == '6'){
				// 	module = 'user'
				// }
				// if(this.rankno == '10'){
				// 	module = 'user'
				// }
				
				uni.navigateTo({
					url:'/pages/tabbar/message/NavMenu/activity?module='+module
				})
			},
			// 跳转到我的需求
			skipDemand(){
				uni.navigateTo({
					url:'/pages/tabbar/message/NavMenu/demand?module=user'
				})
			},
			// 跳转到任务大厅
			skipTask(){
				uni.navigateTo({
					url:'/pages/tabbar/message/NavMenu/task?module=designer'
				})
			},
			// 跳转到协同
			skipCoordinationtask(){
				uni.navigateTo({
					url:'/pages/tabbar/message/NavMenu/coordinationtask?module=sale'
				})
			},
			// 取消
			cancelScanCode(){
				uni.setStorageSync("CameraState",false);
			},
			// 确认
			confirmScanCode(){
				uni.setStorageSync("CameraState",true);
				this.scanCode();
			},
			scanCode(){
				// 允许从相机和相册扫码
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						let obj = JSON.parse(res.result);
						// 员工邀请
						if(obj.type=='join'){
							// console.log(obj.id)
							// 跳转到员工加入界面
							uni.navigateTo({
								url:'/pages/Public/EmployeeParticipation?id='+obj.id
							})
						}
				    }
				});
			},
			setTabBarBadge(num) {
				console.log(num);
				if (num > 0) {
					var MsgNumber = num > 99 ? '99+' : '' + num + '';
					//设置 显示数字 消息图标
					uni.setTabBarBadge({
						index: 0,
						// index: 3,
						text: '' + MsgNumber + ''
					});
					// #ifdef APP
						// 手机桌面应用消息角标 APP图标
						plus.runtime.setBadgeNumber(num);
					// #endif
				} else {
					// 移除数字 消息图标
					uni.removeTabBarBadge({
						index: 0
						// index: 2
					});
					// #ifdef APP
						// 手机桌面应用消息角标 APP图标
						plus.runtime.setBadgeNumber(0);
					// #endif
				}
			},
			DateConvert(time) {
				var date = new Date(time * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				return h + m;
			},
			// 测试用
			UpdateUserInfo() {
				// // 修改个人标配资料
				// let promise1 = getApp().$tim.updateMyProfile({
				// 	nick:'吕布',
				// 	avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.5guo.com%2Fd%2Ffile%2F2019%2F0509%2F14a64b993c0b3a58368dc233c192da48.png&refer=http%3A%2F%2Fwww.5guo.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629525254&t=eee50216425780a98da48915669706b8'//更换IM头像
				// });
				// promise1.then(imResponse => {
				//   console.log(imResponse.data); // 更新资料成功
				// }).catch(imError => {
				//   console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				// });
				
				// // 修改个人标配资料
				// let promise1 = getApp().$tim.updateMyProfile({
				// 	nick:'貂蝉',
				// 	avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp212700827.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629525363&t=467186ab42f06e71dc751edc7c6fa9e9'//更换IM头像
				// });
				// promise1.then(imResponse => {
				//   console.log(imResponse.data); // 更新资料成功
				// }).catch(imError => {
				//   console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				// });
				
				// 修改个人自定义资料
				// 自定义资料字段需要预先在控制台配置，详细请参考：https://cloud.tencent.com/document/product/269/1500#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.B5.84.E6.96.99.E5.AD.97.E6.AE.B5
				// let promise = getApp().$tim.updateMyProfile({
				// 	// 这里要求您已在即时通信 IM 控制台>【应用配置】>【功能配置】 申请了自定义资料字段 Tag_Profile_Custom_Test1
				// 	// 注意：即使只有一个自定义资料字段，profileCustomField 也需要用数组类型
				// 	profileCustomField: [{
				// 		key: 'Tag_Profile_Custom_identity',
				// 		value: '1'//1、销售2、开发商
				// 	}]
				// });
				// promise.then(function(imResponse) {
				// 	// console.log("更新CID成功");
				// 	//  console.log(JSON.stringify(imResponse.data)); // 更新资料成功
				// })
				// .catch(function(imError) {
				// 	console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				// });
				
				
			},
			// 跳转到聊天页面
			gotoIM(item) {
				// console.log(JSON.stringify(item));
				// return
				// if(item.UserID=='SystemMessage){
				// 	console.log("系统消息");
				// }else if(item.UserID=='OrderMessage){
				// 	console.log("订单消息");
				// }
				// console.log(JSON.stringify(item));
				
				if(item.UserID==='SystemMessage'){
					// 跳转到系统消息
					uni.navigateTo({
						url:'/pages/tabbar/message/system'
					})
				}else if(item.UserID==='OrderMessage'){
					// 跳转到订单消息
					uni.navigateTo({
						url:'/pages/tabbar/message/order'
					})
				}else{
					// console.log(JSON.stringify(item))
					this.$store.commit('createConversationActive', item.UserID);
					uni.navigateTo({
						url: '/pages/chat/chat/chat?name='+item.nick+ '&cid=' + item.ClientID
					});
				}
			},
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.$tim.getConversationList();
				promise.then(imResponse => {
					
					const conversationLists = [];
					imResponse.data.conversationList.forEach(item => {
						conversationLists.push(item);
					});
					// console.log(JSON.stringify(conversationLists));
					// console.log(conversationLists.length);
					if (conversationLists.length) {
						//将返回的会话列表拼接上 用户的基本资料
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						this.$store.commit('updateConversationList', conversationLists);
					}
				})
				.catch(imError => {
					console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
				});
			},
			//根据消息列表请求聊天对象的用户信息 并完成数据拼接
			getUserInfo(conversationList) {
				
				// console.log(JSON.stringify(conversationList));
				
				//获取消息列表
				var UserLists = [];
				conversationList.forEach(item => {
					if (item.type == 'C2C') {
						UserLists.push(item.userProfile.userID);
					}
				});
				// getUserProfile userIDList 不能为空数组。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#getUserProfile
				if (UserLists.length == 0) {
					return;
				}
				// console.log(JSON.stringify(UserLists))
				let promise = getApp().$tim.getUserProfile({
					// userIDList: ['user1', 'user2'] // 请注意：即使只拉取一个用户的资料，也需要用数组类型，例如：userIDList: ['user1']
					userIDList: UserLists // 请注意：即使只拉取一个用户的资料，也需要用数组类型，例如：userIDList: ['user1']
				});
				promise.then(imResponse => {
					// console.log(JSON.stringify(imResponse)); // 存储用户资料的数组 - [Profile]
					this.UpdateChatList(conversationList, imResponse.data);
				})
				.catch(function(imError) {
					console.warn('getUserProfile error:', imError); // 获取其他用户资料失败的相关信息
				});
			},
			// 更新好友列表
			UpdateChatList(sessionList, imUserInfoList) {
				//会话列表，IM用户资料
				// console.log(JSON.stringify(imUserInfoList));
				//获取个人资料
				let promise = getApp().$tim.getMyProfile();
				promise.then(imResponse => {
					imUserInfoList.push(imResponse.data);
					uni.setStorageSync('imUserInfoList', imUserInfoList);
					// console.log(JSON.stringify(imResponse.data)); // 个人资料 - Profile 实例
				})
				.catch(imError => {
					console.warn('getMyProfile error:', imError); // 获取个人资料失败的相关信息
				});
				// console.log(JSON.stringify(imUserInfoList));
				//更新会话列表
				this.chatList = []; //清空
				sessionList.forEach(item => {
					// console.log('聊天类型',item.type)
					// 单聊消息
					if (item.type == 'C2C') {
						imUserInfoList.forEach(item1 => {
							if (item1.userID === item.userProfile.userID) {
								var RankName, ClientID;
								item1.profileCustomField.forEach(item2 => {
									if (item2.key == 'Tag_Profile_Custom_Rank') {
										RankName = item2.value;
									}
									if (item2.key == 'Tag_Profile_Custom_ClientID') {
										ClientID = item2.value;
									}
								});
								var MsgText = '';
								if (item.lastMessage.type === 'TIMCustomElem') {
									if (item.lastMessage.payload.data === 'location') {
										MsgText = '[位置]';
									}
									if (item.lastMessage.payload.data === 'audio') {
										MsgText = '[语音]';
									}
									if (item.lastMessage.payload.data === 'video') {
										MsgText = '[视频]';
									}
									if (item.lastMessage.payload.data === 'image') {
										MsgText = '[图片]';
									}
									if (item.lastMessage.payload.data === 'emoticon') {
										MsgText = '[表情]';
									}
								} else {
									MsgText = item.lastMessage.messageForShow;
								}
								//消息列表
								var chatitem = {
									Type: 'C2C',
									UserID: item1.userID,
									avatar: item1.avatar,
									UnreadCount: item.unreadCount,
									nick: item1.nick,
									Msg: MsgText,
									lastTime: item.lastMessage.lastTime,
									RankName: RankName,
									ClientID:ClientID
								};
								this.chatList.push(chatitem);
							}
						});
					}
				});
				//消息未读计数
				var ChatCount = 0;
				// console.log(JSON.stringify(this.chatList))
				this.chatList.forEach(item => {
					ChatCount += item.UnreadCount;
				});
				this.Count = ChatCount;
			},
			
		}
	}
</script>

<style lang="scss">
	
	page{
		background-color: #F7F7F7;
	}
	.tab-iconfont {
		font-size: 56rpx;
	}
	.avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}
	
	.name {
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.content-text {
		font-size: 28rpx;
		color: #999;
	}
	
	.time-text {
		font-size: 24rpx;
		color: #999;
	}
</style>
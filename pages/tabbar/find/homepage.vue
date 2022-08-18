<template>
	<view class="content">
		<view class="position-relative" style="height: 1060rpx">
			<view class="w-100" style="height: 520rpx">
				 <image :src="DataList.cover" class="w-100" style="height: 100%"></image>
			</view>
			<view class="position-absolute" style="width: 150rpx;height: 150rpx;left: 40rpx;top: 430rpx;z-index: 3;">
				<image :src="DataList.header" style="width: 100%; height: 100%" class="rounded"></image>
			</view>
			<view class="position-absolute" style="width: 150rpx;height: 150rpx;left: 260rpx;top: 520rpx;z-index: 3;">
				<u-button v-if="DataList.is_favorite==0" type="warning" style="width: 400rpx; height: 60rpx" @click="attention">关注</u-button>
				<u-button v-else type="default" @click="attention" style="width: 400rpx; height: 60rpx">已关注</u-button>
			</view>
			<view class="bg-white position-absolute w-100 flex flex-column px-3 pb-2" style="z-index: 2;border-radius: 20rpx 20rpx 0 0;top: 500rpx;padding-top: 100rpx;">
				<view class="flex align-center">
					<text style="font-size: 50rpx; font-weight: bold">{{DataList.name}}</text>
					<text class="font-md text-white bg-danger px-1 pl-1 ml-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx">{{ DataList.catalog[0] }}</text>
				</view>
				<view class="flex align-center">
					<view class="flex align-center">
						<text style="font-size: 32rpx; color: #101010; font-weight: bold">{{DataList.favorite_count}}</text>
						<text style="font-size: 24rpx; color: #888; margin-left: 5rpx">人被关注</text>
					</view>
					<view class="flex align-center ml-2">
						<text style="font-size: 32rpx; color: #101010; font-weight: bold">{{DataList.point}}</text>
						<text style="font-size: 24rpx; color: #888; margin-left: 5rpx">分</text>
					</view>
				</view>
				<view class="flex flex-wrap my-2">
					<view @click="skipDesignerInformation" class="mr-2">
						<text style="color: #101010; font-size: 26rpx">{{ DataList.slogan }}</text>
					</view>
				</view>
				
				<view class="flex flex-wrap" v-if="DataList.tags">
					<view @click="skipDesignerInformation" v-for="tag in DataList.tags" class="mr-2 mb-1" style="background-color: #eeeeee; padding: 5rpx 30rpx" >
						<text style="color: #888; font-size: 26rpx">{{tag}}</text>
					</view>
				</view>
				
				<view @click="skipServiceInformation" class="flex flex-column rounded p-2 my-2" style="border: 1px solid rgba(187, 187, 187, 0.2)">
					<view class="flex align-center">
						<text style="color: #888; font-size: 26rpx">服务区域</text>
						<text class="ml-2" style="color: #101010; font-size: 28rpx">{{DataList.service_area||'暂无'}}</text>
					</view>
					<view class="flex align-center mt-1">
						<text style="color: #888; font-size: 26rpx">擅长风格</text>
						<text class="ml-2" style="color: #101010; font-size: 28rpx">{{skills||'暂无'}}</text>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 选项卡 -->
		<!-- <view class="w-100 bg-white" :style="setNavMenusStyle">
			<u-tabs inactive-color="#B2B2B2" active-color="#FF9900" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view> -->
		
		<view class="w-100 bg-white" :style="setNavMenusStyle">
			<u-tabs inactive-color="#B2B2B2" active-color="#FF9900" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		
		
		<!-- 动态 -->
		<view v-if="current == 0" class="w-100 mt-2 bg-white" :style="setContentMenusStyle">
			<view v-for="(sitem, sindex) in DataList.news" :key="sindex" class="FindInfo px-2 py-2" style="border-bottom: 1px solid rgb(187, 187, 187, 0.5)">
				<!-- 顶部开始 -->
				<view class="flex">
					<view class="flex align-center" @click="JumpHomePage(sitem)">
						<image :src="sitem.header" style="width: 110rpx; height: 110rpx" class="rounded"></image>
					</view>
					<view class="flex flex-column pl-2" style="width: 490rpx">
						<view class="UserInfo pt-1">
							<text class="mr-1" style="color: #101010; font-size: 32rpx; font-weight: bold">{{ sitem.name }}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx">{{ sitem.catalog[0] }}</text>
						</view>
						<view class="Describe">
							<text style="font-size: 26rpx; color: #939393">{{ sitem.slogan }}</text>
						</view>
						<view class="Scoring">
							<u-rate :disabled="true" :current="sitem.point" :size="28" inactive-color="#B2B2B2" active-color="#FF9900"
							 active-icon="star-fill" inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b">{{ sitem.point }}分</text>
						</view>
					</view>
				</view>
				<!-- 顶部结束 -->
				<!-- 内容开始 -->
				<view class="Content-Text mt-1">
					<!-- 展开收起效果 -->
					<!-- <u-read-more :toggle="toggle" :show-height="showHeight" ref="uReadMore">
						<rich-text :nodes="sitem.content" style="line-height: 45rpx"></rich-text>
					</u-read-more> -->
					<text>
						{{sitem.content}}
					</text>
				</view>
				
				<!-- 1=纯文字、2=图+文、3=视频+文 -->
				<!-- 图片显示 -->
				<view v-if="sitem.type == 2" class="Pic-Box flex flex-wrap mt-1">
					<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in sitem.files" :key="imgindex" style="width: 235rpx; height: 235rpx">
						<!-- <image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" style="width: 100%; height: 100%"></image> -->
						<!-- 处理图片压缩，显示缩略图 -->
						<image @click="previewImage(imgitem.url, sitem.files)" :src="imgitem.thumbnail" mode="aspectFill" style="width: 100%; height: 100%"></image>
					</view>
				</view>
				<!-- 视频显示 -->
				<view v-if="sitem.type == 3" @click="openVideo(sitem.files[0].url)" class="position-relative mt-2">
					<image @load="loadImage" :src="sitem.files[0].url + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					 lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
					<text class="iconfont text-white position-absolute" style="font-size: 80rpx; width: 80rpx; height: 80rpx" :style="posterIconStyle">&#xe99a;</text>
				</view>
				<!-- 图文链接显示 -->
				<!-- <view @click="TextLinkPage()" class="TextLink mt-1 flex" style="height: 150rpx;background-color: #F7F7F7;">
						<view class="p-1" style="width: 150rpx;height: 150rpx;">
							<image src="/static/img/head/demo6.jpg" class="rounded" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="pr-1 flex align-center" style="width: 560rpx;">
							<text style="color: #101010;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式</text>
						</view>
					</view> -->
				<!-- 商品链接显示 -->
				<!-- <view @click="CommodityLinkPage()" class="CommodityLink mt-1 flex" style="height: 180rpx;background-color: #F7F7F7;">
						<view class="p-1" style="width: 180rpx;height: 180rpx;">
							<image src="/static/img/head/demo6.jpg" class="rounded" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="pr-1 flex flex-column justify-between p-2" style="width: 560rpx;">
							<text style="color: #101010;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: 28rpx;">付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式</text>
							<text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">899.00</span></text>
						</view>
					</view> -->

				<!-- 内容结束 -->

				<!-- 定位信息开始 -->
				<!-- <view class="flex pt-2">
					<i class="iconfont pr-1" style="color: #398fff; font-weight: bold; font-size: 30rpx">&#xe659;</i>
					<text style="font-size: 26rpx; color: #666666">{{ sitem.address }}</text>
				</view> -->
				<!-- 定位信息结束 -->

				<!-- 点赞评论开始 -->
				<view class="LikeBox flex px-1 pt-2">
					<text style="color: #666;font-size: 26rpx;">{{sitem.add_date}}</text>
					<view class="flex flex-1 justify-end align-center">
						<text :style="{ color: sitem.is_like==0 ? '#ff9900' : '#939393' }" class="iconfont" style="font-size: 36rpx; margin-right: 5rpx"
						 @click="support(sitem)">
							&#xe641;
						</text>
						<text :style="{ color: sitem.is_like==0 ? '#ff9900' : '#939393' }" style="font-size: 26rpx">{{ sitem.like_count }}</text>
						<!-- <view @click="toggleMask()" class="ml-2">
								<text class="iconfont" style="font-size: 36rpx;color: #939393;margin-right:5rpx;">&#xe642;</text>
								<text style="font-size: 26rpx;color:#939393;">评论</text>
							</view> -->
					</view>
				</view>
				<!-- <view class="comment" v-for="(res, index) in commentList" :key="res.id">
						<view class="left">
							<image :src="res.url" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="top">
								<view class="name">{{ res.name }}</view>
							</view>
							<view class="content">{{ res.contentText }}</view>
							<view class="reply-box">
								<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
									<view class="username">{{ item.name }}</view>
									<view class="text">{{ item.contentStr }}</view>
								</view>
								<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
									共{{ res.allReply }}条回复
									<u-icon class="more" name="arrow-right" :size="26"></u-icon>
								</view>
							</view>
							<view class="bottom">
								{{ res.date }}
								<view class="reply">回复</view>
							</view>
						</view>
					</view> -->
				<!-- 点赞评论结束 -->
			</view>
			<view v-if="DataList.news.length==0" class="flex justify-center align-center" style="height: 25vh">
				<u-empty text="暂未发布动态" mode="list"></u-empty>
			</view>
		</view>
		<!-- 成功项目 -->
		<view v-if="current == 1" class="w-100 mt-2 px-2" :style="setContentMenusStyle">
			<view class="py-2 bg-white mb-2"  v-for="(sitem,sindex) in DataList.designs">
				<view class="py-2 bg-white rounded">
					<view class="px-2 flex align-center" style="height: 60rpx;">
						<text>{{sitem.title}}</text>
					</view>
					<view class="px-2 flex flex-wrap align-center">
						<view class="" style="width: 335rpx;" v-for="(tagitem,tindex) in sitem.tags">
							<text class="text-title">{{tagitem.key}}：</text>
							<text class="text-content">{{tagitem.value}}</text>
						</view>
					</view>
					<view class="px-2 flex align-center" style="height: 60rpx;">
						<view class="flex align-center" style="width: 720rpx;">
							<text class="iconfont" style="font-size: 30rpx;color: #777;">&#xe65e;</text>
							<text class="text-content">{{sitem.address}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="DataList.designs.length==0" class="flex justify-center align-center" style="height: 25vh">
				<u-empty text="暂无项目" mode="list"></u-empty>
			</view>
		</view>
		<!-- 案例展示 -->
		<view v-if="current == 2" class="w-100 mt-1" :style="setContentMenusStyle">
			<view class="wrap">
				<u-waterfall v-model="DataList.cases" ref="uWaterfall">
					<template v-slot:left="{ leftList }">
						<view @click="skipCommodity(item)" class="demo-warter" v-for="(item, index) in leftList" :key="index">
							<u-lazy-load threshold="0" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
							<view class="demo-title LineBreak">{{ item.title }}</view>
							<view class="flex justify-between align-center mt-1">
								<view class="flex align-center">
									<image :src="item.header" class="rounded" style="width: 45rpx; height: 45rpx"></image>
									<text style="font-size: 28rpx; color: #999; margin-left: 5rpx">{{ item.name }}</text>
								</view>
								<view class="flex align-center">
									<!-- 暂时不做点赞 -->
									<u-icon name="heart" color="#939393" size="34"></u-icon>
									<text style="font-size: 26rpx;color:#939393;">{{item.favorite_count}}</text>
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{ rightList }">
						<view @click="skipCommodity(item)" class="demo-warter" v-for="(item, index) in rightList" :key="index">
							<u-lazy-load threshold="0" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
							<view class="demo-title LineBreak">{{ item.title }}</view>
							<view class="flex justify-between align-center mt-1">
								<view class="flex align-center">
									<image :src="item.header" class="rounded" style="width: 45rpx; height: 45rpx"></image>
									<text style="font-size: 28rpx; color: #999; margin-left: 5rpx">{{ item.name }}</text>
								</view>
								<view class="flex align-center">
									<!-- 暂时不做点赞 -->
									<!-- <text class="iconfont" style="font-size: 36rpx;color: #939393;margin-right:5rpx;">&#xe641;</text>
									<text style="font-size: 26rpx;color:#939393;">{{item.favorite_count}}</text> -->
									<u-icon name="heart" color="#939393" size="34"></u-icon>
									<text style="font-size: 26rpx;color:#939393;">{{item.favorite_count}}</text>
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
				<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
			</view>
			<view v-if="DataList.cases.length==0" class="flex justify-center align-center" style="height: 25vh">
				<u-empty text="暂无案例" mode="list"></u-empty>
			</view>
		</view>

		<view v-if="ChatIco" @click="checkUserToRoom" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #FF9900;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;">&#xe6ab;</text>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: (e) => {
			if (e.float == "right") {
				console.log("右上角按钮点击事件");
			}
		},
		onPageScroll(e) {
			this.onPageScroll = e.scrollTop;
		},
		data() {
			return {
				skills:'',//擅长风格
				id:'',
				follow: false, //是否关注
				Platform: uni.getSystemInfoSync().platform, //客户端平台，值域为：ios、android
				statusBarHeight: 0, //状态栏高度
				onPageScroll: 0,
				Imbibition: false,
				list: [{
						name: "动态",
					},
					{
						name: "成功项目",
					},
					{
						name: "案例展示",
					},
				],
				current: 0,
				// 瀑布流
				loadStatus: "loadmore",
				flowList: [], //商品列表数据
				totalCount: 0, //总共条数
				page: 0, //分页数据
				mobildUserId: "",
				user: {},
				tel: '', //当前用户的手机号码
				ChatIco: false,
				DataList: {
					    id: "",
					    cover: "",
					    header: "",
					    name: "",
					    mobile: "",
					    catalog: [],
					    slogan: "",
					    skills: [],
					    favorite_count: '',
					    is_favorite: '',
					    point: '',
					    service_area: "",
					    cases: [],
					    news: [],
					    designs: []
					},
				w: 100, //视频宽度
				h: 100, //视频高度
				MyDesignDataList: []
			};
		},
		computed: {

			// 短视频封面图标
			posterIconStyle() {
				let w = this.w / 2 - uni.upx2px(80) / 2;
				let h = this.h / 2 - uni.upx2px(80) / 2;
				return `left:${w}px;top:${h}px;`;
			},
			// 获取菜单的样式
			setNavMenusStyle() {
				if (this.Imbibition) {
					return `height: 80rpx;position: fixed;top: ${this.statusBarHeight + 20 + uni.upx2px(48)}px;z-index: 5;`;
				} else {
					return `height: 80rpx;margin-top: 48rpx;`;
				}
			},
			setContentMenusStyle() {
				if (this.Imbibition) {
					if (this.Platform === "android") {
						return `margin-top:${this.statusBarHeight + uni.upx2px(90)}px`;
					} else {
						// ios
						const getinfo = uni.getSystemInfoSync();
						if (getinfo.model == "iPhoneXSMax") {
							return `margin-top:${this.statusBarHeight + uni.upx2px(65)}px`;
						} else {
							return `margin-top:${this.statusBarHeight + uni.upx2px(110)}px`;
						}
					}
				} else {
					return ``;
				}
			}
		},
		onLoad(options) {
			this.skills='';
			this.id = options.id;
			this.$post(this.$url.Design.GetDesigner, {
				id: options.id
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data;
					res.data.skills.forEach(item=>{
						if(this.skills==''){
							this.skills = item
						}else{
							this.skills = this.skills + ' | ' + item
						}
					})
					uni.setNavigationBarTitle({
						title: res.data.name
					});
				}
			})
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.brand);
					this.statusBarHeight = res.statusBarHeight; //状态栏的高度
					// this.Brand = res.brand;
				},
			});
		},
		// onReachBottom() {
		// 	this.loadStatus = "loading"; //加载中
		// 	// this.addRandomData();
		// },
		methods: {
			// //选择用户聊天
			checkUserToRoom() {
				var toUserInfo = {
					"UserID": this.user.tel,
					"NickName": this.user.name
				}
				this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				});
			},
			// checkUserToRoom() {
			// 	// console.log(JSON.stringify(toUserInfo));


			// 	// 跳转到聊天界面之前 给对方发送一条消息
			// 	// 发送文字
			// 	var time = new Date().getTime(); //获取当前时间戳
			// 	var obj = {
			// 		ID: '', //编号
			// 		avatar: uni.getStorageSync('userInfo').headPortrait,
			// 		// avatar:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1735490596,2760195857&fm=26&gp=0.jpg',
			// 		user_id: getApp().$store.state.im.MyUserId, //自己的UserID
			// 		nickname: uni.getStorageSync('userInfo').name,
			// 		type: 'commodity', //text,image,audio,video,emoticon, file,share
			// 		data: '跳转页面之前发送的消息',
			// 		options: {},
			// 		create_time: time, //创建时间
			// 		isremove: false, //是否撤回消息
			// 		isPeerRead: false //是否已读
			// 	};
			// 	// 1. 创建消息实例，接口返回的实例可以上屏
			// 	let message = getApp().$tim.createTextMessage({
			// 		to: this.user.tel,
			// 		conversationType: getApp().$TIM.TYPES.CONV_C2C,
			// 		payload: {
			// 			text: obj.data
			// 		}
			// 	});
			// 	console.log(this.user.tel);
			// 	console.log(getApp().$store.state.im.MyUserId);
			// 	// 2. 发送消息
			// 	let promise = getApp().$tim.sendMessage(message);
			// 	promise.then(imResponse => {
			// 			// 发送成功
			// 			// console.log(imResponse);
			// 			// this.TencentMessageList.push(imResponse.data.message); //同步腾讯云消息列表
			// 			// obj.ID = imResponse.data.message.ID;
			// 			console.log('发送成功');
			// 			this.skipChat();
			// 			// console.log(JSON.stringify(obj));
			// 			// this.PushMsg(obj.nickname,obj.data);
			// 		})
			// 		.catch(imError => {
			// 			// 发送失败
			// 			console.warn('sendMessage error:', imError);
			// 		});



			// },

			skipChat() {
				var toUserInfo = {
					"UserID": this.user.tel,
					"NickName": this.user.name
				}
				// console.log(JSON.stringify(toUserInfo))
				this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				});
			},
			change(index) {
				this.current = index;
				// if (index == 0) {
				// 	this.getMyfind()
				// }
				// if (index == 1) {
				// 	this.getMyDesign()
				// }
				// if (index == 2) {
				// 	this.getMyCase()
				// }
			},
			getMyCase() {
				//获取案例展示
				var ProductList = this.AJB.BizUrl + "api/Communication/GetPageDesignScheme";
				var ProductListDatas = {
					maxResultCount: 5,
					skipCount: this.page,
					MobileUserId: this.mobildUserId
				};
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						console.log(JSON.stringify(res));
						this.totalCount = res.dataList.totalCount; //总条数
						this.flowList = res.dataList.items;
					})
					.catch((err) => {
						console.log(err);
					});
			},

			getMyfind(page) {
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/GetCommunicationList';
				var RequrestDatas = {
					type: "",
					mobildUserId: this.mobildUserId,
					maxResultCount: 10,
					skipCount: 0
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then(res => {
						if (res.code == 200) {
							this.DataList = res.dataList.items;
							console.log(this.DataList);

						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			getMyDesign() {
				var RequrestUrl = this.AJB.BizUrl + "api/Design/GetMyJoinList";
				var RequrestDatas = {
					maxResultCount: 5,
					skipCount: 0,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						this.MyDesignDataList = res.dataList.items;
						this.totalCount = res.dataList.totalCount;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getUser() {
				//获取用户信息
				var _self = this;
				var ProductList = _self.AJB.BizUrl + "api/Communication/GetPersonPage";
				var ProductListDatas = {
					MobileUserId: _self.mobildUserId,
				};
				console.log(JSON.stringify(ProductListDatas))
				_self.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							_self.user = res.dataList;

							uni.setNavigationBarTitle({
								// title: "马保国"
								title: "" + res.dataList.name + ""
							});

							if (res.dataList.tel === getApp().$store.state.im.MyUserId) {
								this.ChatIco = false;
							} else {
								this.ChatIco = true;
							}

							if (!_self.user.designerModelDto) {
								_self.list = [{
									name: "动态"
								}]
							}
							// this.user.userSig
							// this.user.isSelf
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 瀑布流分页加载数据
			addRandomData() {
				// console.log("执行了");
				// this.page += 5;
				// if (this.page >= this.totalCount) {
				// 	this.loadStatus = "nomore"; //加载完成
				// 	return;
				// }
				// //获取商品列表
				// var ProductList =
				// 	this.AJB.BizUrl + "api/Communication/GetPageDesignScheme";
				// var ProductListDatas = {
				// 	maxResultCount: 5,
				// 	skipCount: this.page,
				// };
				// this.AJB.UniAjax(ProductList, ProductListDatas)
				// 	.then((res) => {
				// 		res.dataList.items.forEach((items) => {
				// 			this.flowList.push(items);
				// 		});
				// 		this.loadStatus = "loadmore"; //加载完成
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
			},
			skipCommodity(item) {
				console.log(JSON.stringify(item));
				uni.navigateTo({
					// url: "/pages/TaskOrder/MyCase/CaseDetails?id=" + item.id,
					url:'/pages/tabbar/settle/case-details?id='+item.id
				});
			},
			// 跳转到服务信息界面
			skipServiceInformation() {
				uni.navigateTo({
					url: "/pages/tabBar/find/ServiceInformation",
				});
			},
			// 跳转到设计师信息界面
			skipDesignerInformation() {
				uni.navigateTo({
					url: "/pages/tabBar/find/DesignerInformation",
				});
			},
			// 关注/取消关注
			attention() {
				this.$post(this.$url.User.Favorite, {
					id: this.id, //关注对象的id
					catalog: 1 //类型；1=设计师；2=案例；3=发现；4=商品；5=百科；
				},{
					isLoading:true
				}).then(res => {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success'
					});
					this.InitData();//刷新数据
				});
			},
			toggleMask() {
				//显示隐藏评论框
				this.$refs.ygcComment.content = ''; //清空输入框
				this.$refs.ygcComment.toggleMask('show');
			},
			pubComment(commentContent1) {
				this.$refs.ygcComment.toggleMask(); //隐藏评论框
				console.log(commentContent1); //打印值
			},
			// 跳转到详情页面
			JumpHomePage(item) {
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage?id=' + item.mobileUserId
				});
			},
			// 图文链接跳转
			TextLinkPage() {
				console.log('图文跳转');
			},
			// 商品链接跳转
			CommodityLinkPage() {
				console.log('商品跳转');
			},
			// 预览图片
			previewImage(url, list) {
				console.log(url);
				console.log(list);
				let listArr = [];
				list.forEach(item=>{
					listArr.push(item.url)
				})

				uni.previewImage({
					current: url,
					// urls: this.imageList,
					urls: listArr,
					indicator: 'number'
				});
			},
			open() {
				// console.log('open');
			},
			close() {
				// console.log('close');
			},
			// 点赞评论开始
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/tabBar/find/reply'
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
			// 评论列表
			getComment() {
				this.commentList = [{
						id: 1,
						name: '叶轻眉',
						date: '12-25 18:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 12,
						likeNum: 33,
						isLike: false,
						replyList: [{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '粘粘',
								contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
							}
						]
					},
					{
						id: 2,
						name: '叶轻眉1',
						date: '01-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 11,
						isLike: false,
						url: 'https://cdn.uviewui.com/uview/template/niannian.jpg'
					},
					{
						id: 3,
						name: '叶轻眉2',
						date: '03-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 21,
						isLike: false,
						allReply: 2,
						url: '/static/logo.png',
						replyList: [{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '豆包',
								contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
							}
						]
					},
					{
						id: 4,
						name: '叶轻眉3',
						date: '06-20 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 0,
						likeNum: 150,
						isLike: false
					}
				];
			},
			// 点赞评论结束
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
			// 打开视频
			openVideo(url) {
				// 跳转页面
				uni.navigateTo({
					url: '/pages/chat/video/video?url=' + url
				});
			},
		},
		watch: {
			onPageScroll(val) {
				// console.log(val);
				if (val >= uni.upx2px(1020)) {
					this.Imbibition = true;
				} else {
					this.Imbibition = false;
				}
				// if (this.Platform === "android") {
				// 	if (val >= uni.upx2px(1000)) {
				// 		this.Imbibition = true;
				// 	} else {
				// 		this.Imbibition = false;
				// 	}
				// } else {
				// 	// ios
				// 	try {
				// 		const getinfo = uni.getSystemInfoSync();
				// 		if (getinfo.model == "iPhoneXSMax") {
				// 			if (val >= uni.upx2px(1130)) {
				// 				this.Imbibition = true;
				// 			} else {
				// 				this.Imbibition = false;
				// 			}
				// 		} else {
				// 			if (val >= uni.upx2px(1020)) {
				// 				this.Imbibition = true;
				// 			} else {
				// 				this.Imbibition = false;
				// 			}
				// 		}
				// 	} catch (e) {
				// 		console.log(e);
				// 	}
				// }
			},
		},
	};
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.text-title {
		font-size: 26rpx;
		color: #999;
	}

	.text-content {
		font-size: 26rpx;
		color: #999;
	}

	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
</style>

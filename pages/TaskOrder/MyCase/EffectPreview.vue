<template>
	<view class="content">
		<!-- <web-view :src="PreviewPath"></web-view> -->
		<iframe class="Effect" :src="PreviewPath" frameborder="0"></iframe>
		<!-- <view style="height: 140rpx;"></view> -->
		<!-- 客户第一步 -->
		<view v-if="DataList.type == 1 && rankno==0 && node_code == 'design-1' &&node_status==1" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;z-index: 9999999999999;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 300rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view v-if="DataList.design_status==1" class="flex align-center justify-end pr-2" style="width: 450rpx;">
					<text @click="Confirm('-2')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="Confirm('2')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
			</view>
		</view>
		
		<!-- 客户第二步 -->
		<view v-if="DataList.type == 1 && rankno==0 && node_code == 'design-5'" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 300rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view v-if="DataList.design_status==1&&node_status!=1" class="flex align-center justify-end pr-2" style="width: 450rpx;">
					<text @click="Confirm('-2')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="Confirm('2')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
				<view v-else class="flex align-center justify-end pr-2" style="width: 450rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node.node_user_content}}</text>
				</view>
			</view>
		</view>
		
		<!-- 设计师接受成功 -->
		<view v-if="module=='designer' && (DataList.node.node_status == 0 || DataList.node.node_status == 2) " class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 300rpx;">
					<text @click="gotoIM2" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系客户
					</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 450rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node.node_designer_content}}</text>
				</view>
			</view>
		</view>
		
		<!-- 客户接受成功 -->
		<view v-if="rankno==0 && DataList.node.node_status == 0" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 300rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 450rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node.node_user_content}}</text>
				</view>
			</view>
		</view>
		
		<!-- <view v-if="DataList.node.node_status == 0" class="flex align-center justify-end pr-2" style="width: 450rpx;border: 0px solid red;">
			<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node.node_user_content}}</text>
		</view> -->
		
		<view v-if="node_code == 'design-5' && node_status==2 && rankno==0" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view  class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text @click="ArgDesignDrawing('-1')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="ArgDesignDrawing('0')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
			</view>
		</view>
		
		<view v-if="node_code == 'design-7' && node_status==2 && rankno==0" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view  class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text @click="ArgWorkDrawing('-1')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="ArgWorkDrawing('0')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
			</view>
		</view>
		
		<view v-if="DataList.node.node_status==1&&rankno==1&&node_status==1&&DataList.is_self==0&&node_status!=0" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex justify-end bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 450rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node.node_designer_content}}</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 300rpx;">
					<text @click="skipConceptualdesign" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						我要发布
					</text>
				</view>
			</view>
		</view>
		
		<view v-if="rankno==0&&DataList.node.node_status==1&&node_code=='design-7'" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 300rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view v-if="DataList.node.node_status == 1" class="flex align-center justify-end pr-2" style="width: 450rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node.node_user_content}}</text>
				</view>
			</view>
		</view>
		
		<view v-if="rankno==1&&DataList.node.node_status==2&&node_code=='design-7'" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 300rpx;">
					<text @click="gotoIM2" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系客户
					</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 450rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node.node_designer_content}}</text>
				</view>
			</view>
		</view>
		
		<view v-if="rankno==1&&DataList.design_status==2&&node_code=='design-5'&&DataList.node.node_status!=1" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 300rpx;">
					<text @click="gotoIM2" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系客户
					</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 450rpx;">
					<text style="color: #ff9900;font-size: 28rpx;">{{DataList.node.node_designer_content}}</text>
				</view>
			</view>
		</view>

		<view v-if="DataList.type == 2" class="position-fixed flex justify-between align-center bg-white px-3"
			style="width: 750rpx;height: 120rpx;bottom: 0;border-top: 1px solid rgba(187,187,187,0.2);">
			<view @click="gotoIM" class="flex align-center justify-center"
				style="border: 1px solid #FF9900;width: 180rpx;height: 70rpx;border-radius: 40rpx;">
				<text style="color: #FF9900;">联系设计师</text>
			</view>
			<view class="flex">
				<view class="flex align-center mr-3" @click="Like">
					<u-icon :name="DataList.is_like == 0 ? 'thumb-up-fill':'thumb-up' "
						:color="DataList.is_like == 0?'#ff9900':'#939393'" size="35"></u-icon>
					<text style="font-size: 26rpx;"
						:style="{ color: DataList.is_like == 0 ? '#ff9900':'#939393'}">{{DataList.like_count}}</text>
				</view>
				<view class="flex align-center" @click="Favorite">
					<u-icon :name="DataList.is_favorite == 0 ? 'heart-fill':'heart' "
						:color="DataList.is_favorite == 0?'#ff9900':'#939393'" size="35"></u-icon>
					<text style="font-size: 26rpx;"
						:style="{ color: DataList.is_favorite == 0 ? '#ff9900':'#939393'}">{{DataList.favorite_count}}</text>
				</view>
			</view>
		</view>
		
		<view v-if="DataList.type == 1 && status==1" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="Confirm('-2')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="Confirm('2')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
			</view>
		</view>
		
		<u-popup v-model="showpopup" mode="bottom" border-radius="20">
			<view class="" style="height: 50rpx;"></view>
			<u-row gutter="16" justify="center">
				<!-- <u-col span="3">
					<view class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #FF9900;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6ab;</text>
						</view>
						<text class="font-sm text-muted mt-2">分享IM</text>
					</view>
				</u-col>
				<u-col span="3">
					<view class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #02B1BE;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe670;</text>
						</view>
						<text class="font-sm text-muted mt-2">发现</text>
					</view>
				</u-col> -->
				<u-col span="3">
					<view @click="weixin" class="flex align-center justify-center"
						style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #04BE02;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6e5;</text>
						</view>
						<text class="font-sm text-muted mt-2">微信</text>
					</view>
				</u-col>
				<u-col span="3">
					<view @click="pengyouquan" class="flex align-center justify-center"
						style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #04BE02;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6e6;</text>
						</view>
						<text class="font-sm text-muted mt-2">朋友圈</text>
					</view>
				</u-col>
			</u-row>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		// computed: {
		// 	imageStyle() {
		// 		return `width:${this.w}px;height:${this.h}px;`
		// 	}
		// },
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				this.showpopup = true;
			}
		},
		onLoad(options) {
			this.PreviewPath = options.url;
			if(options.node_title!=undefined){
				uni.setNavigationBarTitle({
					title: options.node_title
				});
			}
			if(options.module!=undefined){
				this.module = options.module;
			}
			this.id = options.id;
			
			this.order_id = options.order_id;
			this.title = options.title;
			// this.from = options.from;
			// if((options.status??'')!=''){
			// 	this.status = options.status;
			// }
			if((options.node_status??'')!=''){
				this.node_status = options.node_status;
			}
			if((options.node_code??'')!=''){
				this.node_code = options.node_code;
			}
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				PreviewPath:'',
				module:'',
				node_status: '',//状态 已完成0 进行中2
				node_code: '',//流程节点状态 设计图是【design-5】 施工图是【design-7】
				rankno:uni.getStorageSync('rankno'),
				id: '',
				order_id: '',
				title:'',
				from:'',
				status:'',
				showpopup: false,
				w: 100, //图片宽度
				h: 100, //图片高度
				doYouCare: false,
				DataList: {
					node:{
						node_status:""
					},
					goods_list:[],
					contents:[],
					designer: [],
					id: 0,
					houseType: '0',
					houseStyle: '0',
					houseArea: 0,
					cost: 0,
					address: '',
					addressKey: '',
					mode: 0,
					state: 1,
					cover: '',
					title: '',
					conternt: '',
					threeurl: '',
					stylePicture: '',
					space: [{
						name: '',
						number: 0,
						spaceDetails: [{
							sort: '1',
							content: '',
							img: ''
						}]
					}]
				}
			};
		},
		computed: {
			AddressToCity() {
				if (this.DataList.address != null) {
					var index = this.DataList.address.lastIndexOf('\-');
					return this.DataList.address.substring(index + 1, this.DataList.address.length);
				} else {
					return '无定位';
				}
			}
		},
		methods: {
			ArgDesignDrawing(state){
				uni.showModal({
					title: '提示',
					content: `真的要${state==0?'接受':'拒绝'}吗？`,
					success: (res)=> {
						if (res.confirm) {
							//0=同意；-1=拒绝
							this.$post(this.$url.Task.ArgDesignDrawing, {
								order_id: this.order_id,
								status:state
							}, {}).then(res => {
								// 成功
								this.$refs.uToast.show({
									title: `${state==0?'接受':'拒绝'}成功`,
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
				// //状态；0=同意；-1=拒绝
				// this.$post(this.$url.Task.ArgDesignDrawing, {
				// 	order_id: this.order_id,
				// 	status:state
				// }, {}).then(res => {
				// 	// 任务发布成功
				// 	this.$refs.uToast.show({
				// 		title: '成功',
				// 		type: 'success'
				// 	});
				// 	setTimeout(() => {
				// 		// 两秒之后返回上一个界面
				// 		uni.navigateBack({
				// 			delta: 1
				// 		});
				// 	}, 2000);
				// });
			},
			ArgWorkDrawing(state){
				uni.showModal({
					title: '提示',
					content: `真的要${state==0?'接受':'拒绝'}吗？`,
					success: (res)=> {
						if (res.confirm) {
							//0=同意；-1=拒绝
							this.$post(this.$url.Task.ArgWorkDrawing, {
								order_id: this.order_id,
								status:state
							}, {}).then(res => {
								// 成功
								this.$refs.uToast.show({
									title: `${state==0?'接受':'拒绝'}成功`,
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
				// //状态；0=同意；-1=拒绝
				// this.$post(this.$url.Task.ArgWorkDrawing, {
				// 	order_id: this.order_id,
				// 	status:state
				// }, {}).then(res => {
				// 	// 任务发布成功
				// 	this.$refs.uToast.show({
				// 		title: '成功',
				// 		type: 'success'
				// 	});
				// 	setTimeout(() => {
				// 		// 两秒之后返回上一个界面
				// 		uni.navigateBack({
				// 			delta: 1
				// 		});
				// 	}, 2000);
				// });
			},
			// 跳转到我要发布
			skipConceptualdesign(){
				uni.navigateTo({
					url:'/pages/tabbar/message/NavMenu/conceptualdesign?order_id='+this.order_id+'&module='+this.node_code+'&title='+this.title+'&node_code='+this.node_code+'&id='+this.id
				})
			},
			// 联系设计师
			gotoIM(){
				this.$store.commit('createConversationActive', this.DataList.designer.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.designer.name
				});
			},
			// 联系客户
			gotoIM2(){
				this.$store.commit('createConversationActive', this.DataList.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.name
				});
			},
			// 接受拒绝
			Confirm(state){
				console.log(state)
				uni.showModal({
					title: '提示',
					content: `真的要${state==2?'接受':'拒绝'}吗？`,
					success: (res)=> {
						if (res.confirm) {
							//2=接受；-2=拒绝
							this.$post(this.$url.Task.DealOrderDesign, {
								case_id: this.DataList.id,
								status:state
							}, {}).then(res => {
								// 成功
								this.$refs.uToast.show({
									title: `${state==2?'接受':'拒绝'}成功`,
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
				// //2=接受；-2=拒绝
				// this.$post(this.$url.Task.DealOrderDesign, {
				// 	case_id: this.DataList.id,
				// 	status:state
				// }, {}).then(res => {
				// 	// 任务发布成功
				// 	this.$refs.uToast.show({
				// 		title: '成功',
				// 		type: 'success'
				// 	});
				// 	setTimeout(() => {
				// 		// 两秒之后返回上一个界面
				// 		uni.navigateBack({
				// 			delta: 2
				// 		});
				// 	}, 2000);
				// });
			},
			//点赞
			Like() {
				this.$post(this.$url.User.Like, {
					id: this.id,
					catalog: 2
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						// this.DataList = res.data;
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success'
						});
						this.InitData(); //刷新数据
					}
				})
			},
			//收藏
			Favorite() {
				this.$post(this.$url.User.Favorite, {
					id: this.id,
					catalog: 2
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						// this.DataList = res.data;
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success'
						});
						this.InitData(); //刷新数据
					}
				})
			},
			// 初始化数据
			InitData() {
				// 获取案例详情
				this.$post(this.$url.Case.GetCase, {
					id: this.id,
					order_id:this.order_id,
					node_code:this.node_code
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.DataList = res.data;
					}
				})
			},
			weixin() {
				// let ShareUrl = "http://m.anjubang.cn/#/pages/CaseInfo/CaseInfo?tel=" + uni.getStorageSync("LoginPhone") +
				// 	"&id=" + this.id + "";
				let ShareUrl = `
					http://h5.pe.anjubang.cn/#/pages/TaskOrder/MyCase/EffectPreview?id=${this.id}&from=1&token=${uni.getStorageSync("token")}
				`;
				console.log(ShareUrl)
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: ShareUrl,
					title: "案例详情",
					summary: this.DataList.title,
					imageUrl: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/icon/192.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			pengyouquan() {
				// let ShareUrl = "http://m.anjubang.cn/#/pages/CaseInfo/CaseInfo?tel=" + uni.getStorageSync("LoginPhone") +
				// 	"&id=" + this.id + "";
				let ShareUrl = `
					http://h5.pe.anjubang.cn/#/pages/TaskOrder/MyCase/EffectPreview?id=${this.id}&from=1&token=${uni.getStorageSync("token")}
				`;
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 0,
					href: ShareUrl,
					title: "案例详情",
					summary: this.DataList.title,
					imageUrl: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/icon/192.png",
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			skiphomepage(item) {
				// 跳转到个人信息界面
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage?id=' + item.mobileUserId
				});
			},
			// 加载图片
			loadImage(e){
				let w = e.detail.width
				let h = e.detail.height
				// // 最大宽度 px
				let maxW = uni.upx2px(500)
				// 最大高度
				let maxH = uni.upx2px(350)
				if (h <= maxH) {
					// 用原来的宽高
					this.w = w <= maxW ? w : maxW
					this.h = h
					// this.$emit('load',{
					// 	w:this.w,
					// 	h:this.h
					// })
					return;
				}
				this.h = maxH
				let w2 = maxH * (w / h)
				this.w = w2 <= maxW ? w2 : maxW
				// this.$emit('load',{
				// 	w:this.w,
				// 	h:this.h
				// })
			},
			// 加载图片
			// loadImage(e) {
			// 	console.log(JSON.stringify(e))
			// 	// console.log(JSON.stringify(e.detail.width))
			// 	// // 拿到图片的宽高
			// 	// let w = e.detail.width;
			// 	// let h = e.detail.height;
			// 	// // 最大宽度 px
			// 	// let maxW = uni.upx2px(680);
			// 	// // 最大高度 px
			// 	// let maxH = uni.upx2px(500);
			// 	// if (h <= maxH) {
			// 	// 	// 用原来的宽高
			// 	// 	this.w = w <= maxW ? w : maxW;
			// 	// 	this.h = h;
			// 	// 	return;
			// 	// }
			// 	// this.h = maxH;
			// 	// let w2 = maxH * (w / h);
			// 	// this.w = w2 <= maxW ? w2 : maxW;
				
			// 	let w = e.detail.width;
			// 	let h = e.detail.height;
			// 	// 最大宽度 px
			// 	let maxW = uni.upx2px(750);
			// 	// 最大高度 px
			// 	let maxH = uni.upx2px(1000);
			// 	if (h <= maxH) {
			// 		// 用原来的宽高
			// 		this.w = w <= maxW ? w : maxW;
			// 		this.h = h;
			// 		return;
			// 	}
			// 	this.h = maxH;
			// 	let w2 = maxH * (w / h);
			// 	this.w = w2 <= maxW ? w2 : maxW;
			// },
			// 跳转到3D效果
			skipThreeDimensional() {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/EffectPreview?url=' +
						'https://www.kujiale.com/xiaoguotu/pano/3FO3B14JOSXL?kpm=Nnw.a4590563ceec856e.2141e62.1555990136900'
				});
			},
			// 跳转到目录界面
			skipCatalog() {
				// uni.removeStorageSync('SpaceDetaileCatalog');
				// // 同步缓存
				// uni.setStorage({
				// 	key: 'SpaceDetaileCatalog',
				// 	data: this.DataList.space,
				// 	success: function() {
				// 		console.log('success');
				// 	}
				// });
				uni.navigateTo({
					// url: '/pages/TaskOrder/MyCase/Catalog',
					url: '/pages/tabbar/settle/catalog?id=' + this.id
				});
			},
			// 关注 取消关注
			attention() {
				this.$post(this.$url.User.Favorite, {
					id: this.DataList.designer.id,
					catalog: 1
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success'
						});
						// 刷新数据
						this.InitData();
					}
				})
				// this.follow = !this.follow;
				// //if (!item.attention) {
				// var RequrestUrl = this.AJB.BizUrl + 'api/Communication/Attention';
				// var RequrestDatas = {
				// 	mobileUserId: item.mobileUserId
				// };
				// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				// 	.then(res => {
				// 		console.log(JSON.stringify(res));
				// 		if (res.code == 200) {
				// 			//成功
				// 			item.attention = !item.attention;
				// 		}
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 	});
				// //}
			},
			AddCommodity(item) {
				console.log(JSON.stringify(item));
			}
		}
	};
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	/* #ifdef APP-PLUS */
	.Effect{
		width: 750rpx;
		height: calc(100vh - 100rpx);
	}
	/* #endif */
	/* #ifdef H5 */
	.Effect{
		width: 750rpx;
		height: calc(100vh - 180rpx);
	}
	/* #endif */
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>

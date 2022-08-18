<template>
	<view class="content">
		<view v-if="DataList.list.length>0">
			<view v-for="(item,index) in DataList.list" class="flex flex-column mt-2 bg-white"
				style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex justify-between align-center p-2">
					<text style="color: #000000;font-weight: bold;">{{item.title}}</text>
					<!-- <text style="color: #939393;font-size: 24rpx;">2022-10-11 12:00</text> -->
				</view>
				<view class="" style="border-bottom: 1px solid rgb(187,187,187,0.2);"
					v-for="(item2,index2) in item.list">
					<view class="flex px-2 pt-2">
						<view class="flex" style="width: 150rpx;height: 150rpx;">
							<image class="rounded" :src="item2.cover" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="flex flex-column pl-1" style="width: 550rpx;">
							<text class="LineBreak" style="color: #101010;font-size: 24rpx;">{{item2.title}}</text>
							<text class="my-1" style="color: #939393;font-size: 24rpx;">{{item2.tags}}</text>
							<text style="color: #101010;font-size: 26rpx;">参考价：{{item2.price}}</text>
						</view>
					</view>
					<view class="flex justify-between align-end p-2">
						<view class="flex flex-column">
							<text style="color: #FF0000;font-size: 28rpx;">{{item2.status_text}}</text>
							<text style="color: #939393;font-size: 24rpx;">{{item2.create_time}}</text>
						</view>
						<text v-if="node_status!=0 && DataList.status == 1 &&module!='user'" @tap="ActionSheetShow(item2)" class="iconfont" style="color: #000000;font-size: 40rpx;">&#xe61e;</text>
						
						<text v-if="node_status!=0 && DataList.status == 1 &&module=='user'" @tap="ActionSheetShow2(item2)" class="iconfont" style="color: #000000;font-size: 40rpx;">&#xe61e;</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="DataList.list.length>0" class="flex flex-column mt-2 bg-white p-2">
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总量</text>
				</view>
				<view class="flex">
					<text>{{DataList.all_count}}</text>
				</view>
			</view>
			<view v-if="module == 'designer'|| module == 'sale'" class="flex justify-between mt-1">
				<view class="flex">
					<text>销售佣金</text>
				</view>
				<view class="flex">
					<text style="color: #FF9900;font-size: 20rpx;">￥<span
							style="font-size: 30rpx;font-weight: bold;">{{DataList.all_fee}}</span></text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总额</text>
				</view>
				<view class="flex">
					<text style="color: #E51C23;font-size: 20rpx;">￥<span
							style="font-size: 30rpx;font-weight: bold;">{{DataList.all_money}}</span></text>
				</view>
			</view>

		</view>

		<view v-if="DataList.list.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		<view style="height: 100rpx"></view>
		
		<view v-if="module=='user'" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @tap="skipDesigner" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius:40rpx;border: 1px solid #2979FF;">联系设计师</text>
				</view>
				<view v-if="node_status==2" class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="Confirm('-1')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">拒绝</text>
					<text @click="Confirm('0')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">接受</text>
				</view>
				<view v-else class="flex align-center justify-end pr-2" style="width: 400rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.user_content}}</text>
				</view>
			</view>
		</view>

		<view v-if="module=='designer'" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex justify-between bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @tap="skipUser" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius:40rpx;border: 1px solid #2979FF;">联系客户</text>
				</view>
				<view v-if="node_status==1&&DataList.list.length != 0" class="flex align-center justify-center" style="width: 300rpx;">
					<text @click="SendList" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">发送材料清单</text>
				</view>
				<view v-else class="flex align-center justify-end pr-2" style="width: 400rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.designer_content}}</text>
				</view>
			</view>
		</view>

		<u-action-sheet :list="ActionSheetList" @click="SetUpClick" v-model="showActionSheet"></u-action-sheet>
		
		<u-action-sheet :list="ActionSheetList2" @click="SetUpClick2" v-model="showActionSheet2"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				// this.showActionSheet = true;

				// if(this.DataList.sta)
				if (this.rankno == 0 || this.DataList.status == 0 || this.DataList.status == 2) {
					return;
				}
				uni.navigateTo({
					url: '/pages/tabbar/settle/HomeShoppingMall?order_id=' + this.order_id
				})
			}
		},
		data() {
			return {
				module:'',
				order_id: '',
				rankno: uni.getStorageSync('rankno'),
				node_status: '',
				imgUrl: 'https://img0.baidu.com/it/u=2862534777,914942650&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
				taskid: 0,
				ActionSheetList: [
					{
						text: '替换'
					},
					{
						text: '删除',
						color: 'red'
					}
				],
				ActionSheetList2: [
					{
						text: '要求设计师替换'
					},
					{
						text: '要求设计师删除',
						color: 'red'
					}
				],
				showActionSheet: false,
				showActionSheet2: false,
				value: 0,
				DataList: {
					name: "",
					mobile: "",
					designer_name: "",
					designer_mobile: "",
					order_id: "",
					all_count: '',
					all_money: '',
					all_fee: '',
					list: []
				},
				isShow: true,
				State: 0,
				toUser: "",
				tempData: {},
				tempData2: {}
			};
		},
		onLoad(options) {
			if ((options.node_status ?? '') != '') {
				this.node_status = options.node_status;
			}
			if ((options.order_id ?? '') != '') {
				this.order_id = options.order_id;
			}
			if ((options.module ?? '') != '') {
				this.module = options.module;
			}
		},
		onShow() {
			this.InitData();
		},
		methods: {
			// 联系设计师
			skipDesigner() {
				this.$store.commit('createConversationActive', this.DataList.designer_mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.designer_name
				});
			},
			// 联系客户
			skipUser() {
				this.$store.commit('createConversationActive', this.DataList.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.name
				});
			},
			// 发送清单
			SendList() {
				// 发起耗材、材料方案状态
				this.$post(this.$url.Task.SetMaterial, {
					order_id: this.order_id
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '发送成功',
						type: 'success'
					});
					setTimeout(() => {
						//返回上一个界面
						uni.navigateBack({
							delta: 1
						})
					}, 2000);
				});
			},
			InitData() {
				this.$post(this.$url.Task.GetMaterial, {
					order_id: this.order_id
				}, {
					isLoading: false
				}).then(res => {
					this.DataList = res.data;
					
					if (this.rankno == 0 || this.DataList.status == 0|| this.DataList.status == 2) {
						//#ifdef H5
						setTimeout(() => {
							document.querySelectorAll('.uni-page-head .uni-page-head-ft .uni-page-head-btn')[0]
								.querySelector('.uni-btn-icon').innerText = ' ';
						}, 10)
						//#endif
						// #ifdef APP-PLUS
						var currentWebview = this.$mp.page.$getAppWebview();
						currentWebview.setTitleNViewButtonStyle(0, { //h5端会报错
							text: ' '
						});
						// #endif
					}
				});
			},
			ActionSheetShow(item) {
				this.showActionSheet = true;
				console.log(JSON.stringify(item))
				this.tempData = item;
			},
			ActionSheetShow2(item) {
				this.showActionSheet2 = true;
				console.log(JSON.stringify(item))
				this.tempData2 = item;
			},
			SetUpClick(index) {
				// 替换
				if(index == 0){
					uni.navigateTo({
						url:`/pages/tabbar/settle/HomeShoppingMall?order_id=${this.order_id}&del_id=${this.tempData.id}`
					})
				}
				// 删除
				if(index == 1){
					// 调用删除接口
					this.$post(this.$url.Task.DelMaterialItem, {
						id: this.tempData.id
					}, {}).then(res => {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success'
						});
						this.InitData(); //刷新数据
					})
				}
				
			},
			SetUpClick2(index) {
				// console.log(JSON.stringify(this.tempData2))
				// 要求设计师替换
				if(index == 0){
					this.$post(this.$url.Task.UpdateMaterialStatus, {
						order_material_id: this.tempData2.id, //材料项id
						status: "3" //0=已确定;1=商家待审核;-1=已拒绝；2=销售待审核;3=要求替换;4=要求删除
					}, {}).then(res => {
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						});
						this.InitData(); //刷新数据
					})
				}
				// 要求设计师删除
				if(index == 1){
					this.$post(this.$url.Task.UpdateMaterialStatus, {
						order_material_id: this.tempData2.id, //材料项id
						status: "4" //0=已确定;1=商家待审核;-1=已拒绝；2=销售待审核;3=要求替换;4=要求删除
					}, {}).then(res => {
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						});
						this.InitData(); //刷新数据
					})
				}
			},
			Confirm(state) {
				// 同意、拒绝耗材推荐方案
				uni.showModal({
					title: '提示',
					content: `是否确定${state==0?'接受':'拒绝'}材料清单推荐？`,
					success: (res)=> {
						if (res.confirm) {
							//0=同意；-1=拒绝
							this.$post(this.$url.Task.ArgMaterial, {
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
				// this.$post(this.$url.Task.ArgMaterial, {
				// 	order_id: this.order_id,
				// 	status: state
				// }, {}).then(res => {
				// 	this.$refs.uToast.show({
				// 		title: '成功',
				// 		type: 'success'
				// 	});
				// 	setTimeout(() => {
				// 		//返回上一个界面
				// 		uni.navigateBack({
				// 			delta: 1
				// 		})
				// 	}, 2000);
				// })

			}
		}
	};
</script>

<style>
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
</style>

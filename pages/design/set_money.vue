<template>
	<view class="content">
		<view v-if="DataList.status!=0&&rankno==1&&showMenu" class="flex flex-column bg-white mt-3 p-3" style="width: 750rpx;">
			<text>设计费用</text>
			<!-- <input type="number" class="ml-3" v-model="fee" style="border: 1px solid #888;"> -->
			<u-input placeholder="请输入设计费用" v-model="fee" type="number" class="my-3" :border="true" width="300" />
			<u-button size="medium" type="primary" @click="yulan">预览</u-button>
		</view>
		
		<view class="bg-white flex flex-column my-2 px-3 rounded" v-if="DataList.fee_list.length>0">
			<view v-for="(item,index) in DataList.fee_list" :key="index" @click="skipPaid" class="flex flex-column">
				<view class="flex flex-column justify-between py-3" :class="DataList.fee_list.length-1>index?'border-bottom':''">
					<view class="flex align-center justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{item.title}}</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥{{item.fee}}</text>
					</view>
					<view class="flex align-center mt-2">
						<text style="color: #FF0000;font-size: 26rpx;">{{item.status_text}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="DataList.status==1&&rankno==0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="费用方案未设置" mode="list"></u-empty>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;" v-if="DataList.status!=0&&rankno=='1'&&isSet==true">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">设置</u-button>
		</view>
		
		
		<view v-if="rankno==0" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view v-if="DataList.status==2" class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text @click="Confirm('1')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="Confirm('0')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
			</view>
		</view>
		
		<view v-if="rankno==1" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoUser" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系客户
					</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			this.order_id = options.order_id
			// 获取费用明细
			this.$post(this.$url.Task.GetMoneys, {
				order_id: this.order_id
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				this.DataList = res.data;
				if(res.data.status == 1){
					this.showMenu = true;
				}
			});
		},
		data(){
			return{
				showMenu:false,
				isSet:false,
				rankno: uni.getStorageSync('rankno'),
				order_id:'',
				fee:'',
				DataList:{
					fee_list:[]
				}
			}
		},
		methods:{
			// 联系设计师
			gotoIM(){
				this.$store.commit('createConversationActive', this.DataList.designer_mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.designer_name
				});
			},
			// 联系客户
			gotoUser(){
				this.$store.commit('createConversationActive', this.DataList.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.name
				});
			},
			Confirm(state){
				uni.showModal({
					title: '提示',
					content: `真的要${state==0?'接受':'拒绝'}吗？`,
					success: (res)=> {
						if (res.confirm) {
							//0=接受；1=拒绝
							this.$post(this.$url.Task.ArgMoney, {
								order_id: this.DataList.order_id,
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
			},
			yulan(){
				if((this.fee??'')==''){
					this.$refs.uToast.show({
						title: '请输入设计费用',
						type: 'warning'
					});
					return false
				}
				// 获取显示费用明细
				this.$post(this.$url.Task.GetDesignMoneys, {
					fee: this.fee
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList.fee_list = res.data;
					this.isSet = true;
					this.showMenu = false;
				});
			},
			Submit(){
				
				// 设置费用明细
				this.$post(this.$url.Task.SetMoney, {
					order_id: this.order_id,
					fee: this.fee
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					// 成功
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success'
					});
					setTimeout(() => {
						// 两秒之后返回上一个界面
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				});
				
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
<template>
	<view class="content">
		<view class="flex flex-column m-3 bg-white p-3" style="border-radius: 20rpx;" v-for="(item,index) in DataList.list">
			<view class="flex align-center justify-between">
				<text>{{item.title}}</text>
				<text v-if="module!='user'&&DataList.status!=4&&DataList.status!=5&&DataList.status!=0" @tap="skipPersonnelAddition(item)" class="iconfont" style="color: #101010;font-size: 35rpx;font-weight: bold;">&#xe81b;</text>
			</view>
			<view class="p-3 mt-2 flex flex-column" v-for="(workitem,workindex) in item.workers" style="border-radius: 20rpx;background-color: #f7f7f7;">
				<view class="flex align-center">
					<img :src="workitem.header" class="rounded" style="width: 90rpx;height: 90rpx;">
					<view class="flex flex-column ml-3" style="width: 450rpx;border: 0px solid red;">
						<view class="flex align-center justify-between" >
							<view class="flex align-center">
								<text class="mr-1" style="color: #101010;font-size: 32rpx;font-weight: bold;">{{workitem.name}}</text>
								<text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">工人</text>
							</view>
							
							<text v-if="(module=='user'&&workitem.status==2&&DataList.status==1) || (module=='user'&&workitem.status==2&&DataList.status==4)" @tap="SelectWorker(workitem)" style="color: #FFFFFF;background-color: #3F9B55;border-radius: 20rpx;padding: 5rpx 20rpx;font-size: 24rpx;">选择</text>
							<text v-if="module=='surveyor'&&workitem.status!=3" @tap="showMenu(workitem)" class="iconfont" style="font-size: 50rpx;">&#xe6f3;</text>
						</view>
						<view class="flex" style="margin-top: 10rpx;">
							<text v-for="tag in workitem.tags"
								style="color: #FF0000;background-color: #F9C0C0;padding: 3rpx 20rpx;font-size: 24rpx;"
								class="mr-1 rounded">{{tag}}</text>
						</view>
					</view>
				</view>
				<text style="font-size: 24rpx;color: #939393;"  class="my-1">{{workitem.slogan}}</text>
				<text style="color: #ff9900;font-size: 24rpx;">{{workitem.status_text}}</text>
			</view>
		</view>
		
		<view class="" style="height: 120rpx;"></view>
		
		<view v-if="module == 'surveyor'" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系客户
					</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<!-- <text @click="Confirm('-2')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text> -->
					<text v-if="DataList.status == 1&&showSend" @click="SetWorker" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						发送给客户确定
					</text>
					<text v-if="DataList.status == 100" class="ml-3" style="color: red;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;">
						{{DataList.status_text}}
					</text>
				</view>
			</view>
		</view>
		
		<view v-if="module == 'user' && DataList.status == 100" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<!-- <text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系客户
					</text> -->
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text class="ml-3" style="color: red;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;">
						等待工人接单
					</text>
				</view>
			</view>
		</view>
		
		
		<u-toast ref="uToast"></u-toast>
		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetPersonne"></u-action-sheet>
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			this.order_id = options.order_id;
			if(options.module!='undefined'){
				this.module = options.module
			}
			
		},
		onShow() {
			this.InitData();
		},
		data(){
			return{
				order_id:'',
				module:'',
				DataList:{},
				tempData:{},//临时数据
				imgSrc:'https://img0.baidu.com/it/u=1942253063,3807598283&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
				ActionSheetListShow: false,
				ActionSheetList: [{
					text: '联系人员'
				},{
					text: '删除人员',
					color: 'red'
				}],
				showSend:true
			}
		},
		methods:{
			// 选择工人
			SelectWorker(item){
				uni.showModal({
					title: '提示',
					content: '真的要选择吗？',
					success: (res)=> {
						if (res.confirm) {
							this.$post(this.$url.Work.SelectWorker, {
								id: item.id
							}, {}).then(res => {
								this.$refs.uToast.show({
									title: '选择成功',
									type: 'success'
								});
								this.InitData();//刷新数据
								// setTimeout(()=>{
								// 	//返回上一个界面
								// 	uni.navigateBack({
								// 		delta:1
								// 	})
								// },2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 发送给客户确定
			SetWorker(){
				uni.showModal({
					title: '提示',
					content: '真的要发送给客户吗？',
					success: (res)=> {
						if (res.confirm) {
							this.$post(this.$url.Work.SetWorker, {
								order_id: this.order_id
							}, {}).then(res => {
								this.$refs.uToast.show({
									title: '发送成功',
									type: 'success'
								});
								setTimeout(()=>{
									//返回上一个界面
									uni.navigateBack({
										delta:1
									})
								},2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 联系客户
			gotoIM(){
				this.$store.commit('createConversationActive', this.DataList.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.name
				});
			},
			// 跳转到人员添加
			skipPersonnelAddition(item){
				uni.navigateTo({
					url:'/pages/tabbar/my/OrderWork/PersonnelAddition?order_id='+this.order_id+'&catalog_id='+item.id
				})
			},
			InitData(){
				// 获取项目的工人清单
				this.$post(this.$url.Work.GetTaskWorkers, {
					order_id: this.order_id
				}, {}).then(res => {
					this.DataList = res.data;
					res.data.list.forEach(item=>{
						if(item.workers.length == 0){
							this.showSend = false;
						}
					})
				});
			},
			showMenu(item){
				this.tempData = item;
				this.ActionSheetListShow = true;
			},
			SetPersonne(index){
				// 联系人员 跳转IM
				if (index == 0) {
					this.$store.commit('createConversationActive', this.tempData.mobile);
					uni.navigateTo({
						url: '/pages/chat/chat/chat?name=' + this.tempData.name
					});
				}
				// 删除
				if (index == 1) {
					// 删除人员
					this.$post(this.$url.Work.DelWorker, {
						id:this.tempData.id
					}, {
						isLoading: false
					}).then(res => {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success'
						})
						this.InitData();//刷新当前页面
					});
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
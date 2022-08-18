<template>
	<view class="content">
		<u-sticky>
			<view class="flex" style="height: 80rpx;width: 750rpx;">
				<view class="" style="width: 650rpx">
					<u-tabs bgColor="#FFFFFF" :list="tabsList" active-color="#ff9900" :is-scroll="true" :current="current" @change="change"></u-tabs>
				</view>
				<view @tap="MenuShow" class="flex align-center justify-center bg-white" style="width: 100rpx;height: 88rpx;">
					<text class="iconfont" style="font-size: 40rpx;color: #101010;">&#xe6f2;</text>
				</view>
			</view>
		</u-sticky>
		<!-- 弹出框样式 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
				:close-icon-pos="closeIconPos">
				<!-- 系统栏高度 -->
				<view class="status_bar"></view>
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in tabsList" :key="index">
						<text @click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#ff9900' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		
		<view class="flex flex-column" style="margin: 20rpx;" @tap="skipConstructionTask(item)" v-for="(item,sindex) in DataList">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="item.header" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 480rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{item.name}}</text>
						</view>
						<view class="mt-1">
							<text style="font-size: 26rpx;color: #666;">{{item.estate_title}}</text>
						</view>
						
						<!-- <view class="flex align-center">
							<text style="color: #777;font-size: 26rpx;">预算金额：</text>
							<text style="color: #FF0000;font-weight: bold;"><span
									style="font-size: 26rpx;">￥</span><span
									style="font-size: 30rpx;">{{item.money}}</span></text>
									
							<view v-if="item.fee_status == 0" class="flex align-center justify-center ml-1"
								style="width: 200rpx;height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;">
								<text>悬赏:￥{{item.fee}}</text>
							</view>
							
						</view> -->
					</view>
					<view class="flex justify-end align-center pr-2" style="height: 100%;width: 100rpx;">
						<view class="" v-if="item.fee_status==0">
							<text class="text-white"
								style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
						</view>
					</view>
				</view>
				<view class="px-2">
					<text style="color: #02B1BE;font-size: 28rpx;">{{item.tags}}</text>
				</view>
				<view class="px-2 my-2">
					<view v-if="item.content!=''&&item.content!=undefined" class="p-1"
						style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">{{item.content}}</text>
					</view>
					<view v-else class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
					</view>
				</view>
				<!-- <view v-if="item.fee_status == 0" class="position-absolute flex align-center justify-center"
					style="right: 0;top: 0;width: 200rpx;height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;">
					<text>悬赏:￥{{item.fee}}</text>
				</view> -->
			</view>
			<view class="flex bg-white"
				style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;">{{item.create_time}}</text>
				</view>
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text v-if="item.status == 0" style="font-size: 24rpx;color: #777;">{{item.status_text}}</text>
					<text v-else style="font-size: 24rpx;color: red;">{{item.status_text}}</text>
					
				</view>
				<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #777;">{{item.end_day}}天到期</text>
				</view>
			</view>
		</view>
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		
	</view>
</template>

<script>
		import $T from '@/common/free-lib/time.js';
	export default {
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},2000)
		},
		data() {
			return {
				status:'',
				tabsList:[
					{
						name:'全部',
						id:''
					},
					{
						name:'已完成',
						id:'0'
					},
					{
						name:'未上传',
						id:'1'
					},
					{
						name:'待确认',
						id:'2'
					},
					{
						name:'进行中',
						id:'5'
					},
					{
						name:'工人待确认',
						id:'4'
					},
					{
						name:'用户拒绝',
						id:'-1'
					},
					{
						name:'监理拒绝',
						id:'-2'
					}
				],
				current: 0,//当前选中下标
				show:false,//显示菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				DataList:[],
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.InitData();
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			// 切换菜单
			SwitchMenu(index) {
				this.show = false;
				this.current = index;
				this.InitData();
			},
			InitData(){
				let requestData = {
					status: this.tabsList[this.current].id, //状态，空=全部，已完成0、待签订1、施工中2、已到期-2、已拒绝-1
					page_no: 1 ,//页码
					page_size: 1000 //每一页数量
				}
				this.$post(this.$url.User.GetOrderWorks, requestData, {
					isLoading: false
				}).then(res => {
					this.DataList = res.data.list;
				});
			},
			// 跳转到施工任务
			skipConstructionTask(item) {
				uni.navigateTo({
					url: '/pages/tabbar/my/OrderWork/ConstructionTask?order_id='+ item.order_id+'&module=user'
				})
			},
			vFormateTime(datetime) {
				var timestamps = (new Date(datetime)).getTime();
				return $T.getDateDiffv1(timestamps); //时差结果
			}
		},
		onLoad(options) {
			this.status = options.status;
		},
		onShow() {
			this.InitData();
		}
	}
</script>

<style>
	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
	}
	page{
		background-color: #f7f7f7;
	}
</style>

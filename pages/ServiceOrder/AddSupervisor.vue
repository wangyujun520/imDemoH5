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
		
		<u-checkbox-group>
			<view  class="flex flex-column bg-white m-2 p-2 rounded" v-for="(item,index) in DataList" :key="index">
				<view class="flex justify-between">
					<!-- 左 -->
					<view @tap="skipHomePage(item)" class="flex" style="width: 520rpx;">
						<view class="" style="width: 100rpx;height: 100rpx;">
							<image :src="item.header" style="width: 100%;height: 100%;" class="rounded"></image>
						</view>

						<view class="flex flex-column justify-center ml-2">
							<view class="flex align-center">
								<text style="color: #000000;font-size: 32rpx;font-weight: bold;">{{item.name}}</text>
								<text
									style="color: #FFFFFF;background-color: #307BC6;font-size: 26rpx;padding: 0rpx 20rpx;"
									class="ml-1 rounded">监理</text>
							</view>
							<view class="flex" style="margin-top: 10rpx;">
								<!-- <text style="color: #02B1BE;background-color: #BEFAFF;padding: 3rpx 20rpx;font-size: 24rpx;" class="rounded">监理</text> -->
								<text v-for="tag in item.tags"
									style="color: #FF0000;background-color: #F9C0C0;padding: 3rpx 20rpx;font-size: 24rpx;"
									class="ml-1 rounded">{{tag}}</text>
								<!-- 				<text style="color: #FF9900;background-color: #F9E2C0;padding: 3rpx 20rpx;font-size: 24rpx;" class="ml-1 rounded">1.8km</text> -->
							</view>
						</view>
					</view>
					<!-- 右 -->
					<view class="flex justify-end align-center" style="width: 150rpx;">
						<u-checkbox size="40" active-color="#02B1BE" shape="circle" :disabled="item.status == 0"
							@change="checkboxChange($event,item,index)" v-model="item.isChecked" :name="item.vip_id">
						</u-checkbox>
					</view>
				</view>
				<view class="flex flex-column mt-1">
					<text style="color: #888;font-size: 26rpx;">{{item.slogan}}</text>
					<text :class="item.status=='-1'?'red':''"
						style="color: #888;font-size: 26rpx;">{{item.status_text}}</text>
				</view>
			</view>
		</u-checkbox-group>

		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>

		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetPersonne"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				// console.log(JSON.stringify(this.SelectValue))

				let id = '';
				this.SelectValue.forEach(item => {
					if (id == '') {
						id = item
					} else {
						id += id + '|' + item
					}
				})
				console.log(id)
				if ((id ?? '') == '') {
					this.$refs.uToast.show({
						title: '请至少选择一个监理',
						type: 'warning'
					})
					return
				}
				let requestData = {
					order_id: this.order_id, //订单id
					vip_id: id //会员id
				}
				// 增加监理
				this.$post(this.$url.Task.AddSurveyor, requestData, {
					isLoading: false
				}).then(res => {
					uni.navigateBack({
						delta: 1
					});
					// this.$refs.uToast.show({
					// 	title: '新增成功',
					// 	type: 'success'
					// });
					// setTimeout(() => {
					// 	// 两秒之后返回上一个界面

					// }, 2000);
				});


			}
		},
		data() {
			return {
				tabsList:[
					{
						name:'全部',
						id:''
					},
					{
						name:'评分',
						id:'point'
					},
					{
						name:'距离项目最近',
						id:'position'
					}
				],
				current: 0,//当前选中下标
				show:false,//显示菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				DataList:[],
				SelectValue: [],
				ActionSheetListShow: false,
				ActionSheetList: [{
					text: '删除人员',
					color: 'red'
				}],
				tempData: {},
				rankno: uni.getStorageSync('rankno'),
				order_id: '',
				imgUrl: 'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400',
				taskid: 0,
				value: 0, //默认选中第一条数据
				//列表数据
				list: [{
						name: '关注'
					},
					{
						name: '评分'
					},
					{
						name: '距离项目最近'
					},
					{
						name: '合作过的'
					}
				],
				activeColor: this.$u.color['warning'],
				// 弹出菜单参数
				isShow: true,
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度
				joinId: 0,
				CheckboxList: [{
					name: 'apple',
					checked: false,
					disabled: false
				}]

			};
		},
		onLoad(options) {
			if ((options ?? '') != '') {
				this.order_id = options.order_id;
			}
			this.InitData();
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - 40 - uni.upx2px(62);
				} else {
					this.swiperHeight = res.windowHeight - 40;
				}
			} catch (e) {
				console.log(e);
			}
		},
		methods: {
			skipHomePage(item){
				uni.navigateTo({
					url: '/pages/tabbar/find/homepage?id=' + item.vip_id
				})
			},
			checkboxChange(e, item, index) {
				console.log(e)
				if (e.value) {
					this.SelectValue.push(e.name)
				} else {
					// this.SelectValue.pop(e.name);
					// this.SelectValue.splice(index,1);
					this.SelectValue.splice(this.SelectValue.indexOf(e.name), 1)
				}
				console.log(this.SelectValue);
			},
			MoreMenu(item) {
				console.log(JSON.stringify(item))
				this.tempData = item;
				this.ActionSheetListShow = true;
			},
			SetPersonne(index) {
				// 删除
				if (index == 0) {
					// 删除监理
					this.$post(this.$url.Task.DelSurveyor, {
						id: this.tempData.id
					}, {
						isLoading: false
					}).then(res => {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success'
						})
						this.InitData(); //刷新当前页面
					});
				}
			},
			NoSelect() {
				// 设置任务的监理、选择监理
				this.$post(this.$url.Task.SetSurveyor, {
					order_id: this.order_id,
					// vip_id:item.vip_id,
					status: '-1'
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				});
			},
			Select(item) {
				// 设置任务的监理、选择监理
				this.$post(this.$url.Task.SetSurveyor, {
					order_id: this.order_id,
					vip_id: item.vip_id,
					status: 0
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				});
			},
			InitData() {
				// 获取任务的监理明细
				this.$post(this.$url.Task.GetSurveyors, {
					order_id: this.order_id,
					sort_by:this.tabsList[this.current].id
				}, {
					isLoading: false
				}).then(res => {
					res.data.forEach(item => {
						item.isChecked = false;
					})
					this.DataList = res.data;
				});
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				this.InitData();
			},
			// 菜单改变
			change(index) {
				this.current = index;
				this.InitData();
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				// console.log(JSON.stringify(event))
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			checkedAll() {
				this.list.map(val => {
					val.checked = true;
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.red {
		color: red;
	}

	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		// width: 180rpx;
		padding: 15rpx 30rpx;
		text-align: center;
	}

	// 通过/deep/样式穿透去控制组件的内容
	.wrap /deep/ .u-content {
		color: #666 !important;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>

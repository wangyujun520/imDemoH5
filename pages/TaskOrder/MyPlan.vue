<template>
	<view class="content">
		<u-sticky>
			<view class="flex" style="height: 80rpx;width: 750rpx;">
				<view class="" style="width: 650rpx">
					<u-tabs bgColor="#FFFFFF" :list="tabsList" active-color="#FF9900" :is-scroll="true"
						:current="current" @change="change"></u-tabs>
				</view>
				<view @tap="MenuShow" class="flex align-center justify-center bg-white"
					style="width: 100rpx;height: 88rpx;">
					<text class="iconfont" style="font-size: 40rpx;color: #101010;">&#xe6f2;</text>
				</view>
			</view>
		</u-sticky>
		<view class="flex flex-column bg-white mt-2">
			<view @tap="skipCaseDetails(item)" class="flex p-3 border-bottom" v-for="(item,index) in DataList">
				<img :src="item.cover" style="width: 200rpx;height: 130rpx;">
				<view class="flex flex-column justify-center pl-3" style="width: 500rpx;border: 0px solid red;">
					<text style="color: #444;font-size: 30rpx;">{{item.title}}</text>
					<text class="my-1" style="color: #02B1BE;font-size: 26rpx;">{{item.tags}}</text>
					<text style="color: #939393;font-size: 24rpx;">{{item.address}}</text>
				</view>
			</view>
		</view>

		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无方案" mode="list"></u-empty>
		</view>

		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
				:close-icon-pos="closeIconPos">
				<view class="status_bar"></view>
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in tabsList" :key="index">
						<text @click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#FF9900' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	export default {
		onShow() {
			// 获取数据字典
			this.tabsList = [{
				name: '全部',
				value: ''
			}];
			this.$post(this.$url.Public.GetDicts, {
				key: "house_style" //关键字
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				res.data.forEach(item => {
					let list = {
						name: item.value,
						value: item.key
					}
					this.tabsList.push(list);
				})
				this.InitData();
			});
		},
		data() {
			return {
				DataList: [],
				tabsList: [],
				// tabsList: [{
				// 		name: '全部',
				// 		value: 1
				// 	},
				// 	{
				// 		name: '二是',
				// 		value: 2
				// 	}
				// ],
				current: 0, //当前选中下标
				show: false, //显示菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right' //关闭按钮位置
			}
		},
		methods: {
			skipCaseDetails(item){
				uni.navigateTo({
					url:`/pages/tabbar/settle/case-details?from=2&status=2&id=${item.id}&node_code=design-1&node_status=0&node_title=设计方案&module=designer`
				})
			},
			InitData() {
				let requestData = {
					key: "", //关键字
					catalog: this.tabsList[this.current].value, //类型
					page_no: 1, //页码
					page_size: 10 //每一页数量
				}
				this.$post(this.$url.Design.GetProjects, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.DataList = res.data.list
					}
				});
			},
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
				// this.current = index;
				this.show = false;
				this.current = index;
				this.InitData();
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
	}
</style>

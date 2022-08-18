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
		
		<u-checkbox-group class="flex flex-column p-3">
			<view v-for="(item, index) in tabsList[current].list" :key="index" class="flex align-center justify-between bg-white pl-3 border-bottom" style="height: 80rpx;width: 690rpx;">
				<text>{{item.title}}</text>
				<u-checkbox @change="checkboxChange" v-model="item.checked"
					:name="item.id"></u-checkbox>
			</view>
		</u-checkbox-group>
		
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
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				console.log(JSON.stringify(this.tabsList))
				let major_catalog = "";
				this.tabsList.forEach(item=>{
					if((item.list??'')!='' && item.list.length>0){
						item.list.forEach(item2=>{
							if((item2.checked??'')!='' && item2.checked == true){
								if(major_catalog==""){
									major_catalog = item2.id
								}else{
									major_catalog += '|' + item2.id
								}
							}
						})
					}
				})
				console.log(major_catalog)
				// 返回上一个界面,并绑定数据
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.major_catalog =  major_catalog;//修改上一页data里面参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
				
				
			}
		},
		onShow() {
			// 数据字典
			this.$post(this.$url.Mall.GetCatalogs, {}, {
				isLoading: false
			}).then(res => {
				res.data.forEach(item => {
					let tab = {
						name: item.title,
						id: item.id,
						list: item.list
					}
					this.tabsList.push(tab)
				})
			});
		},
		data() {
			return {
				list: [{
						name: 'apple',
					},
					{
						name: 'banner',
					},
					{
						name: 'orange',
					}
				],
				tabsList: [],
				current: 0, //当前选中下标
				show: false, //显示菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				DataList: []
			}
		},
		methods: {
			checkboxChange(e){
				console.log(e)
			},
			change(index) {
				this.current = index;
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
<template>
	<view class="content">
		
		<view class="flex flex-column">
			<view class="flex justify-between align-center bg-white px-3 py-2" v-for="(item,index) in Tags">
				<view class="flex align-center">
					<text class="mr-2" style="width: 100rpx;border: 0px solid red;">标签{{index+1}}</text>
					<view class="" style="width: 500rpx;">
						<u-input type="text" v-model="item.tag" :border="true"></u-input>
					</view>
				</view>
				<u-icon @tap="add" name="plus-circle-fill" color="red" size="40" v-if="index==0"></u-icon>
				<u-icon @tap="del(index)" name="minus-circle-fill" color="red" size="40" v-else></u-icon>
				<!-- minus-circle-fill -->
				<!-- <view class="flex align-center justify-center" style="width: 50rpx;height: 50rpx;background-color: red;border-radius: 50%;">
					
				</view> -->
			</view>
		</view>
		
		<view class="flex justify-center py-3">
			<view @tap="Submit" class="flex align-center justify-center"
				style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">添加</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				Tags:[{
					tag:''
				}]
			}
		},
		methods:{
			add(){
				this.Tags.push({
					tag:''
				})
			},
			del(index){
				console.log(index)
				this.Tags.splice(index,1)
			},
			Submit(){
				console.log(this.Tags)
				
				// 非空校验
				for(let i = 0; i<this.Tags.length;i++){
					let item = this.Tags[i];
					if((item.tag??'')==''){
						this.$refs.uToast.show({
							title: '请输入标签'+(i+1),
							type: 'warning'
						});
						return;
					}
				}
				let data = '';
				
				this.Tags.forEach((item,index)=>{
					console.log(item)
					if(data==''){
						data = item.tag
					}else{
						data += '|'+item.tag
					}
				})
				console.log(data)
				
				
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.tags = data;//修改上一页data里面的locationCity参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
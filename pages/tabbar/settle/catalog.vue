<template>
	<view class="content">
		<view class="flex flex-column" v-for="(item,index) in DataList" :key="index">
			<view class="flex flex-column">
				<view class="ml-3 my-3">
					<text style="color: #000000;font-size: 32rpx;font-weight: bold;">{{item.title}}</text>
				</view>
				<view class="flex flex-wrap ml-3">
					<view class="flex mr-1 mb-1" v-for="img in item.imgs" style="width: 224rpx; height: 224rpx">
						<image @click="previewImage(img,item.imgs)" :src="img" class="rounded" style="width: 100%; height: 100%"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.id = options.id;
			this.InitData();
		},
		data() {
			return {
				id:'',
				DataList: [] //Mock数据
			}
		},
		methods: {
			// 初始化数据
			InitData(){
				this.DataList = [];//初始化数据
				// 获取案例详情
				this.$post(this.$url.Case.GetCase,{
					id:this.id
				},{}).then(res=>{
					if(res.code == 200 && res.status == 0){
						res.data.contents.forEach(item=>{
							let catalog = {
								title:item.title,
								imgs:[]
							}
							item.items.forEach(items=>{
								if(items.images.length>0){
									items.images.forEach(img=>{
										catalog.imgs.push(img);
									})
								}
							})
							if(catalog.imgs.length>0){
								this.DataList.push(catalog)
							}
						})
					}
				})
			},
			// 预览图片
			previewImage(url, list) {
				uni.previewImage({
					current: url,
					loop: true, //是否可循环预览，默认值为 false
					urls: list,
					indicator: "number",
				});
			},
		}
	}
</script>

<style lang="scss">

</style>

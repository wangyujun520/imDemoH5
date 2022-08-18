<template>
	<view class="content">
		<!-- 上传封面图片 -->
		<view class="flex justify-center align-center flex-column bg-white m-3 rounded" style="width: 690rpx;height: 350rpx;" @tap="uploadCover">
			<image v-if="DataList.cover!=''" class="rounded" :src="DataList.cover_preview" style="width: 100%;height: 100%;"></image>
			<text v-if="DataList.cover==''" class="mt-2" style="color: #0072FF;font-weight: bold;font-size: 26rpx;">上传封面图</text>
		</view>
		<!-- 上传图片 -->
		<upload-imgs @upload="uploadbanner" title="横幅"></upload-imgs>
		<view class="flex flex-column bg-white px-3 mt-3">
			<view @tap="showCatalog=true" class="flex align-center bg-white justify-between border-bottom"
				style="height: 100rpx;">
				<text>商品分类</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.catalog_text||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">商品标题</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.title" input-align="right"
						placeholder="请输入商品标题" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
						style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
			<view @tap="showBrand=true" class="flex align-center bg-white justify-between border-bottom"
				style="height: 100rpx;">
				<text>商品品牌</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.brand_id_text||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">商品规格</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.specs" input-align="right"
						placeholder="请输入商品规格" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
						style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
			<view @tap="skipCommodityLabel" class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">商品标签</text>
				<view class="flex align-center">
					<!-- <u-input type="text" v-model="DataList.tags" input-align="right"
						placeholder="请输入商品标签,多个标签用|分割" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
						style="width: 500rpx;" /> -->
					<text class="mr-1">{{DataList.tags==''?'请填写商品标签':'已填写'}}</text>
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">上架价格</text>
				<view class="flex align-center">
					<u-input type="number" v-model="DataList.price" input-align="right"
						placeholder="请输入上架价格" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
						style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
			<view class="flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">商品详情</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.detail" input-align="right"
						placeholder="请输入详情" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
						style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
		</view>
		<view class="mt-3"></view>
		<upload-imgs @upload="uploadcommodity" title="商品图片详情"></upload-imgs>
		<view class="flex justify-center py-3">
			<view @tap="Submit" class="flex align-center justify-center"
				style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">添加</text>
			</view>
		</view>
		<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
		<u-calendar v-model="showstart" :mode="mode" :min-date="start" max-date="2099-01-01" @change="change1">
		</u-calendar>
		<u-calendar v-model="showend" :mode="mode" :min-date="start" max-date="2099-01-01" @change="change2">
		</u-calendar>
		<u-select v-model="showCatalog" :list="CatalogList" mode="mutil-column-auto" @confirm="catalogConfirm">
		</u-select>
		<u-select v-model="showBrand" :list="BrandList" mode="mutil-column-auto" @confirm="BrandConfirm">
		</u-select>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import uploadImgs from '@/components/push-img/get-imgs.vue';
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		components: {
			uploadImgs
		},
		onShow() {
			this.CatalogList = [];
			// 获取商品分类
			this.$post(this.$url.Mall.GetCatalogs, {}, {
				isLoading: false
			}).then(res => {
				res.data.forEach(item => {
					let cc = {
						value: item.id,
						label: item.title,
						children: []
					}
					item.list.forEach(item => {
						let dd = {
							value: item.id,
							label: item.title
						}
						cc.children.push(dd)
					})
					this.CatalogList.push(cc);
				})
			});
			// 获取商品品牌
			this.$post(this.$url.Mall.GetBrands, {}, {
				isLoading: false
			}).then(res => {
				res.data.forEach(item=>{
					let dd = {
						value: item.id,
						label: item.title
					}
					this.BrandList.push(dd);
				})
				// let cc = {
				// 	value: item.id,
				// 	label: item.title,
				// 	children: []
				// }
				// item.list.forEach(item => {
				// 	let dd = {
				// 		value: item.id,
				// 		label: item.title
				// 	}
				// 	cc.children.push(dd)
				// })
				
			});
			

		},
		data() {
			return {
				showBrand:false,
				BrandList:[],
				showCatalog: false,
				CatalogList: [
					// {
					// 	value: 1,
					// 	label: '中国',
					// 	children: [
					// 		{
					// 			value: 2,
					// 			label: '广东'
					// 		},
					// 		{
					// 			value: 5,
					// 			label: '广西'
					// 		}
					// 	]
					// },
					// {
					// 	value: 8,
					// 	label: '美国',
					// 	children: [
					// 		{
					// 			value: 9,
					// 			label: '纽约'
					// 		},
					// 		{
					// 			value: 10,
					// 			label: '洛杉矶'
					// 		}
					// 	]
					// }
				],
				showstart: false,
				showend: false,
				rule: '请选择',
				mode: 'date',
				start: '', //当前时间
				list: [{
					text: '1年',
					value: 1
				}, {
					text: '2年',
					value: 2
				}, {
					text: '3年',
					value: 3
				}, {
					text: '4年',
					value: 4
				}, {
					text: '5年',
					value: 5
				}, {
					text: '6年',
					value: 6
				}],
				show: false,
				start_time: '', //时间
				end_time: '', //时间

				id: '',
				show: false,
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				// DataList:{
				// 	price:null,
				// 	rule:null,
				// 	rule_value:null,
				// 	count:null,
				// 	buy_count:null,
				// 	fee_rate:null
				// },
				photos:[],//封面图
				bannerimgs:[],//banner图片
				commodityimgs:[],//商品图片
				DataList: {
					id: '',//商品id
					catalog_id: '',//分类
					catalog_text:'',//分类显示
					cover_preview: '',//封面图预览
					cover: '',//封面图 接口使用
					banners: '',//横幅
					title: '',//标题
					brand_id:'',//品牌id
					brand_id_text:'',//品牌id文字
					specs: '',//规格
					tags: '',//标签
					price: '',//价格
					status: 0,//状态
					detail: '',//详情
					img_detail: ''//图片详情
				},
				value: 3,
				imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190202%2F854819e300fd4ec5afb95b292899a88c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627574352&t=3fb5e2536e7d46a6a95c7080c9a1f13b'
			}
		},
		methods: {
			skipCommodityLabel(){
				// 跳转到商品标签
				uni.navigateTo({
					url:'/pages/ShopManagement/commodity_label'
				})
			},
			// 封面图上传
			uploadCover(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					success: (res) => {
						this.DataList.cover_preview = res.tempFilePaths[0];
						//调用图片上传
						this.photos.push(res.tempFilePaths[0]);
						this.ImgUpload();
					}
				});
			},
			ImgUpload(){
				var uploads = [];
				for (let k = 0; k < this.photos.length; k++) {
					let imgSrc = this.photos[k];
					let pos = imgSrc.lastIndexOf('.');
					let filename = imgSrc.substring(0, pos); // 文件名
					let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					if (day < 10) {
						day = '0' + day;
					}
					if (month < 10) {
						month = '0' + month;
					}
					var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
					var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					response.forEach(item=>{
						let imgTemp = item.split('.cn')[1];
						this.DataList.cover = imgTemp;
					})
				});
				
			},
			uploadbanner(arr) {
				console.log(JSON.stringify(arr));
				this.bannerimgs = arr;
				
				let uploads = [];
				for (let k = 0; k < this.bannerimgs.length; k++) {
					let imgSrc = this.bannerimgs[k];
					let pos = imgSrc.lastIndexOf('.');
					let filename = imgSrc.substring(0, pos); // 文件名
					let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
					let date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					if (day < 10) {
						day = '0' + day;
					}
					if (month < 10) {
						month = '0' + month;
					}
					let FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
					let fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					let SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					console.log(JSON.stringify(response));//上传成功的路径
					response.forEach(item=>{
						console.log(item)
						let imgTemp = item.split('.cn')[1];
						if(this.DataList.banners == ''){
							this.DataList.banners = imgTemp;
						}else{
							this.DataList.banners = this.DataList.banners+'|'+imgTemp;
						}
					})
					
				});
				
			},
			uploadcommodity(arr) {
				this.DataList.img_detail == '';
				this.commodityimgs = arr;
				console.log(JSON.stringify(arr));
				let uploads = [];
				for (let k = 0; k < this.commodityimgs.length; k++) {
					let imgSrc = this.commodityimgs[k];
					let pos = imgSrc.lastIndexOf('.');
					let filename = imgSrc.substring(0, pos); // 文件名
					let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
					let date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					if (day < 10) {
						day = '0' + day;
					}
					if (month < 10) {
						month = '0' + month;
					}
					let FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
					let fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					let SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					console.log(JSON.stringify(response));//上传成功的路径
					response.forEach(item=>{
						console.log(item)
						let imgTemp = item.split('.cn')[1];
						if(this.DataList.img_detail == ''){
							this.DataList.img_detail = imgTemp;
						}else{
							this.DataList.img_detail = this.DataList.img_detail+'|'+imgTemp;
						}
					})
				});
				
			},
			catalogConfirm(e) {
				console.log(e)
				this.DataList.catalog_text = e[1].label;
				this.DataList.catalog_id = e[1].value;
			},
			BrandConfirm(e) {
				console.log(e)
				this.DataList.brand_id_text = e[0].label;
				this.DataList.brand_id = e[0].value;
			},
			// 添加商品
			Submit() {
				// 非空校验
				if ((this.DataList.cover??'')=='') {
					this.$refs.uToast.show({
						title: '请上传封面图',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.banners??'')=='') {
					this.$refs.uToast.show({
						title: '请上传banner图',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.catalog_id??'')=='') {
					this.$refs.uToast.show({
						title: '请选择商品分类',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.title??'')=='') {
					this.$refs.uToast.show({
						title: '请输入商品标题',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.brand_id??'')=='') {
					this.$refs.uToast.show({
						title: '请选择商品品牌',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.specs??'')=='') {
					this.$refs.uToast.show({
						title: '请输入规格',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.tags??'')=='') {
					this.$refs.uToast.show({
						title: '请填写标签',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.price??'')=='') {
					this.$refs.uToast.show({
						title: '请输入价格',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.detail??'')=='') {
					this.$refs.uToast.show({
						title: '请输入详情',
						type: 'warning'
					});
					return false;
				}
				if ((this.DataList.img_detail??'')=='') {
					this.$refs.uToast.show({
						title: '请上传图片详情',
						type: 'warning'
					});
					return false;
				}
				
				let requestData = {
					id: "", //商品id
					sale_status:1,
					catalog_id: this.DataList.catalog_id, //分类
					cover: this.DataList.cover, //封面图
					banners: this.DataList.banners, //横幅
					title: this.DataList.title, //标题
					brand_id: this.DataList.brand_id, //品牌id
					specs: this.DataList.specs, //规格
					tags: this.DataList.tags, //标签
					price: this.DataList.price, //价格
					status: this.DataList.status, //状态；
					detail: this.DataList.detail, //详情
					img_detail: this.DataList.img_detail //图片详情
				}
				console.log(JSON.stringify(requestData))
				
				// 新增、更新商城商品基础信息
				this.UpdateMallGoods(requestData);
			},
			// 新增、更新商城商品基础信息
			UpdateMallGoods(RequestData) {
				// 发布内容
				this.$post(this.$url.Mall.UpdateMallGoods, RequestData, {
					isLoading: false
				}).then(res => {
					console.log(JSON.stringify(res))
					if (res.code == 200) {
						// 发布成功
						this.$refs.uToast.show({
							title: '商品添加成功',
							type: 'success'
						});
						setTimeout(() => {
							// 两秒之后返回上一个界面
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					}
				});
			},
			click(index) {
				// console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
				this.DataList.rule = this.list[index].text;
				this.DataList.rule_value = this.list[index].value;
			},
			change1(e) {
				// console.log(e)
				this.start_time = e.result;
			},
			change2(e) {
				// console.log(e)
				this.end_time = e.result;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.special-list {
		overflow-x: auto;

		.list-box {
			flex-basis: 280rpx;
			height: 270rpx;
			border-radius: 20rpx;
			flex-shrink: 0;
			// white-space: nowrap;
			margin-right: 20rpx;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
		}
	}

	// 取消滚动条显示
	.special-list::-webkit-scrollbar {
		display: none;
	}
</style>

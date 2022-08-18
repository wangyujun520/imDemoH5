<template>
	<view class="content">
		<view class="bg-white flex p-2">
			<textarea maxlength="-1" v-model="title" placeholder="描述" class="w-100" style="font-size: 28rpx;"/>
		</view>
		
		<!-- 上传图片 -->
		<upload-imgs @upload="upload"></upload-imgs>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
	
</template>

<script>
	// import uploadImgs from '@/components/push-img/get-imgs-select1.vue';
	import uploadImgs from '@/components/push-img/get-imgs.vue';
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default{
		components: {
			uploadImgs
		},
		onLoad(options) {
			this.imgID = parseInt(options.id);
		},
		data(){
			return{
				title:'',
				imgUrl:'',
				ImgList:'',//上传路径
				imgID:0,
				length: null,//如果取值null，则按rfc4122标准生成对应格式的随机数
				firstU: false,//首字母是否为"u"
				radix: 62,
				// upload_imgs:[]
				upload_imgs:''
			}
		},
		methods:{
			Submit(){
				// 非空验证
				if(this.title == ""){
					this.$refs.uToast.show({
						title: '请填写描述',
						type: 'warning'
					})
					return;
				}
				if(this.imgUrl == ""){
					this.$refs.uToast.show({
						title: '请上传图片',
						type: 'warning'
					})
					return;
				}
				//成功则返回图片的本地文件路径列表 tempFilePaths
				// 上传阿里云开始
				var ImgSplits = JSON.stringify(this.ImgList).split(',');
				var ImgSplit = JSON.parse(ImgSplits);
				// console.log(ImgSplit);
				var uploads = [];
				this.upload_imgs = [];
				for (let k = 0; k < ImgSplit.length; k++) {
					let imgSrc = ImgSplit[k];
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
					var fuleFileName = 'Anjubang' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					console.log(fuleFileName);
					if(this.upload_imgs == ''){
						this.upload_imgs = fuleFileName
					}else{
						this.upload_imgs += `|${fuleFileName}`
					}
					// this.upload_imgs.push(fuleFileName)
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					// this.IDCardPositive = response[0];
					// this.ShowPositive = false;
					// console.log(JSON.stringify(response[0]));
					console.log(JSON.stringify(response));
					// 调用图片发送方法
					// this.ImagesSend(response);
					var Datas = {
						id:this.imgID+1,
						show:false,
						sort:0,//guid 全局唯一标识符
						content:this.title,//内容
						// "img":response[0]//阿里云图片路径
						img:response,//阿里云图片路径
						upload_imgs:this.upload_imgs,
						img_length:response.length
					}
					let pages = getCurrentPages();  //获取所有页面栈实例列表
					let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
					var DataList = prevPage.$vm.DataList.spaceDetails;
					console.log(JSON.stringify(prevPage.$vm.DataList));
					Datas.sort=	DataList.length+1;
					DataList.push(Datas)
					prevPage.$vm.DataList.spaceDetails = DataList;//修改上一页data里面的managingGoods参数值
					// 返回上一个界面
					uni.navigateBack({
						delta:1
					})
				});
			},
			upload(arr) {
				this.ImgList = arr;
				console.log(JSON.stringify(arr));
				if(arr.length>0){
					// this.imgUrl = arr[0];
					this.imgUrl = arr;
				}else{
					this.imgUrl = '';
				}
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>

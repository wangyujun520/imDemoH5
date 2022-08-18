<template>
	<view class="p-3">
		<view class="flex justify-center align-center flex-column bg-white py-5 rounded">
			<image @click="previewImage(DataList.header)" class="rounded" :src="DataList.header" style="width: 180rpx;height: 180rpx;"></image>
			<text @click="chooseAvatar" class="mt-3" style="color: #FF9900;font-weight: bold;font-size: 30rpx;">更换头像</text>
		</view>
		<view class="flex flex-column bg-white mt-2 rounded">
			<view @tap="skipRealNameAuthentication" class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">姓名</text>
				<view class="flex align-center">
					<image v-if="DataList.is_auth == 0" src="/static/img/authentication.png" style="width: 30rpx;height: 30rpx;"></image>
					<!-- <image src="/static/img/authentication.png" v-if="DataList.is_auth==0" style="width: 30rpx;height: 30rpx;"></image> -->
					<text style="color: #777;font-size: 28rpx;" v-if="DataList.is_auth==0">{{DataList.name}}</text>
					<text style="color: #777;font-size: 28rpx;" v-if="DataList.is_auth==1">请实名认证</text>
					<u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon>
				</view>
			</view>
			<view @tap="skipNickName" class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">昵称</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;">{{DataList.nick}}</text>
					<!-- <text style="color: #777;font-size: 28rpx;">{{DataList.nickName}}</text> -->
					<!-- <u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon> -->
					<u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon>
				</view>
			</view>
			<view @tap="skipSex" class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">性别</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;" v-text="DataList.gender == 1 ? '男':'女'"></text>
					<!-- <text style="color: #777;font-size: 28rpx;">{{DataList.gender_text}}</text> -->
					<u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon>
				</view>
			</view>
			<view @click="skipgxqm" class="flex justify-between align-center px-2 py-3">
				<text class="" style="color: #101010;font-size: 28rpx;">个性签名</text>
				<view class="flex align-center justify-end" style="width: 500rpx;">
					<text style="color: #777;font-size: 28rpx;">{{DataList.slogan}}</text>
					<u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view @tap="skipemail" class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">邮箱</text>
				<view class="flex align-center">
					<!-- <text style="color: #777;font-size: 28rpx;">670535490@qq.com</text> -->
					<text style="color: #777;font-size: 28rpx;">{{DataList.email}}</text>
					<u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon>
				</view>
			</view>
			<view @tap="skipPhone" class="flex justify-between align-center px-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">手机号</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;">{{DataList.mobile}}</text>
					<!-- <u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon> -->
				</view>
			</view>
			<view @click="showCity" class="flex justify-between align-center px-2 py-3">
				<text class="" style="color: #101010;font-size: 28rpx;">省、市、区</text>
				<view class="flex align-center justify-end" style="width: 500rpx;">
					<text style="color: #777;font-size: 28rpx;">{{DataList.area}}</text>
					<u-icon name="arrow-right" color="#888888" size="28" class="ml-1"></u-icon>
				</view>
			</view>
		</view>
		
		<view @tap="loginout" class="mt-5 flex align-center justify-center rounded" style="height: 90rpx;background-color: red;">
			<text class="text-white" style="font-size: 28rpx;font-weight: bold;">退出登录</text>
		</view>
		<u-picker mode="region" :params="params" v-model="show" @confirm="confirm"></u-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		onShow() {
			this.InitData();
			// 是否实名认证
			// is_auth 【0是已认证】、【1是未认证】、【2是未通过】
		},
		data() {
			return {
				DataList:'',//Mock数据
				MyAvatar:'',//上传的头像路径
				IsAuthentication:true,
				headPortrait:'',//上传
				show: false,
				params: {
					province: true,
					city: true,
					area: true
				},
			}
		},
		created() {
			uni.$on('uAvatarCropper', path => {
				var paths = [];
				paths.push(path);
				// _doc/uniapp_temp_1608299736120/canvas/16082997470610.jpg
				
				// 上传阿里云开始
				var ImgSplits = JSON.stringify(paths).split(',');
				var ImgSplit = JSON.parse(ImgSplits);
				// console.log(ImgSplit);
				var uploads = [];
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
					
					this.MyAvatar = fuleFileName;
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				// 上传到阿里云成功
				Promise.all(uploads).then(response => {
					console.log(JSON.stringify(response));
					// 更换图片
					this.DataList.header = response[0];
					// 提交到服务器
					this.Setheader();
				});
				
				// this.DataList.header = path;
				
				// 可以在此上传到服务端
				// uni.uploadFile({
				// 	url: 'http://192.168.100.17/index.php/index/index/upload',
				// 	filePath: path,
				// 	name: 'file',
				// 	complete: (res) => {
				// 		console.log(res);
				// 	}
				// });
			})
		},
		methods: {
			InitData(){
				// 获取用户基础数据
				this.$post(this.$url.User.GetBaseData, {},{
					isLoading:true
				}).then(res => {
					this.DataList = res.data;
					console.log(JSON.stringify(res))
					// this.totalCount = res.data.total_count; //分页总条数
				});
			},
			//显示城市选择下拉框【省、市】
			showCity() {
				this.show = true;
			},
			confirm(e) {
				console.log(JSON.stringify(e))
				// 更新用户数据
				this.$post(this.$url.User.Update, {
					province:e.province.value,
					city:e.city.value,
					county:e.area.value
				},{}).then(res => {
					this.$refs.uToast.show({
						title: '更新成功',
						type: 'success'
					});
					this.InitData();//刷新数据
				});
				// this.City = e.province.label + "-" + e.city.label;
				// this.province_code = e.province.value;
				// this.city_code = e.city.value;
			},
			// 预览图片
			previewImage() {
				var imgArr = [];
				imgArr.push(this.DataList.header);
				uni.previewImage({
					current: this.DataList.header,
					urls: imgArr,
					indicator: 'number'
				});
			},
			// 选择头像
			chooseAvatar() {
				this.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			// 修改头像
			Setheader(){
				// 修改头像
				let requestData = {
					header:this.MyAvatar//上传的头像不要前缀
				}
				// 更新用户数据
				this.$post(this.$url.User.Update, requestData,{}).then(res => {
					// console.log(JSON.stringify(res))
					// // 修改个人标配资料
					// let promise = getApp().$tim.updateMyProfile({
					//   avatar: this.DataList.header//更换IM头像
					// });
					// promise.then(imResponse => {
					//   console.log(imResponse.data); // 更新资料成功
					// }).catch(imError => {
					//   console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
					// });
					// var userInfos = uni.getStorageSync('userInfo');
					// userInfos.header = this.DataList.header;
					// uni.setStorageSync('userInfo', userInfos);
					if(res.code == 200 && res.status==0){
						this.$refs.uToast.show({
							title: '更换成功',
							type: 'success'
						});
					}else{
						this.$refs.uToast.show({
							title: '更换失败',
							type: 'error'
						});
					}
				});
				
			},
			loginout(){
				// uni.removeStorageSync('LoginPhone');
				// uni.removeStorageSync('IMUserSig');
				// uni.removeStorageSync('professionInfo');
				//注销登录
				let promise = this.$tim.logout();
				promise.then(res=> {
					console.log(res); // 登出成功
					this.$store.commit('reset')
					
					// uni.setStorageSync('token',res.data.token);//设置token
					// uni.setStorageSync('avatar',res.data.header);//设置头像
					// uni.setStorageSync('nickname',res.data.nick);//设置昵称
					// uni.setStorageSync('sign',res.data.sign);//腾讯sign
					// uni.setStorageSync('phone',this.phone);//登录手机号
					// 从本地缓存中同步移除指定 key。
					uni.removeStorageSync('token');
					uni.removeStorageSync('avatar');
					uni.removeStorageSync('nickname');
					uni.removeStorageSync('sign');
					uni.removeStorageSync('phone');
					// 同步清理本地数据缓存。
					// uni.clearStorageSync();
					
					// 跳转到登录页面
					uni.reLaunch({
						url: '/pages/Login/Login'
					});
				}).catch(err=> {
				   console.log(err)
				   uni.reLaunch({
				   	url: '/pages/Login/Login'
				   });
				});
			},
			skipRealNameAuthentication(){
				if(this.DataList.is_auth == 0){//是否认证，0=已认证；1=未认证
					uni.navigateTo({
						url:'/pages/my/authentication/realnameauthentication'
					})
				}else{
					// 未认证
					// 跳转到实名认证
					console.log(this.IsAuthentication)
					uni.navigateTo({
						url:'/pages/my/authentication/norealnameauthentication'
					})
				}
			},
			// 跳转到修改昵称界面
			skipNickName(){
				uni.navigateTo({
					url:'/pages/my/infomodify/NickName?nick='+this.DataList.nick
				})
			},
			skipgxqm(){
				// 跳转到修改个性签名界面
				uni.navigateTo({
					url:'/pages/my/infomodify/PersonalSignature?slogan='+this.DataList.slogan
				})
			},
			// 跳转到修改性别
			skipSex(){
				uni.navigateTo({
					url:'/pages/my/infomodify/Sex?gender='+this.DataList.gender
				})
			},
			// 跳转到邮箱
			skipemail(){
				uni.navigateTo({
					url:'/pages/my/infomodify/Email?email='+this.DataList.email
				})
			},
			// 跳转到手机号页面
			skipPhone(){
				uni.navigateTo({
					url:'/pages/My/PersonalData/Phone/Phone?phone='+this.DataList.mobile
				})
			},
			// 跳转到收货地址
			skipAddress(){
				// 暂时不做
				// return;
				uni.navigateTo({
					url:'/pages/my/infomodify/Address'
				})
			}
		}
	}
</script>


<style lang="scss">
	page{
		background-color: #F7F7F7;
	}
</style>
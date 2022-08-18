// let baseURL = 'http://api.dev.anjubang.cn';//开发环境

let baseURL = 'http://api.pe.anjubang.cn';//正式环境
// let baseURL = 'http://localhost:5000';//开发环境

// 设置阿里云Oss地址
// let OssUrl = 'https://eand.oss-cn-chengdu.aliyuncs.com/';//开发（测试）环境
// let OssUrl = 'https://eand.oss-cn-chengdu.aliyuncs.com/';//开发（测试）环境
let OssUrl = 'http://oss.anjubang.cn/';//开发（测试）环境
// host = 'http://oss.anjubang.cn';

uni.setStorageSync('Oss',OssUrl);
//公用post异步请求
const login = (PostUrl, RequestData,config) => {
	let promise = new Promise(function(resolve, reject) {
		let headers = {
			"Content-Type": "application/json;charset=utf-8;"
		}
		if (config.isLoading) {
			uni.showLoading({
				title: config.loadingTitle || '加载中...',
				mask: false,
			});
		}
		let url = baseURL+PostUrl;
		// 发起网络请求
		uni.request({
			url: url,
			data: RequestData,
			method: 'POST',
			timeout: 100000,
			dataType: 'json',
			async: true,
			header: headers,
			success: res => {
				// 未登录
				if(res.data.code == 401){
					// 强制跳转到登录界面
					uni.reLaunch({
						url:'/pages/Login/Login'
					})
					return;
				}
				if (res.statusCode == 200) {
					if(res.data.code == 200){
						resolve(res.data); //成功
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					}
				}
				if (res.statusCode == 500) {
					console.log(JSON.stringify(res))
					uni.showToast({
						title: '服务器错误，请联系管理员',
						icon: 'none',
						duration: 2000
					})
					return;
				}
			},
			fail: (e) => {
				// reject(e); //失败
				console.log(JSON.stringify(e))
				uni.showToast({
					title: e.errMsg,
					icon: 'none',
					duration: 2000
				})
				return;
			},
			complete: (e) => {
				// console.log("网络请求complete");
				if (config.isLoading){
					uni.hideLoading();
				}
				return;
			}
		})
	})
	return promise;
};

//公用post异步请求
const post = (PostUrl, RequestData,config) => {
	let promise = new Promise(function(resolve, reject) {
		let headers = {
			"Content-Type": "application/json;charset=utf-8;",
			"token":uni.getStorageSync("token")||null
		}
		if (config.isLoading) {
			uni.showLoading({
				title: config.loadingTitle || '加载中...',
				mask: false,
			});
		}
		let url = baseURL+PostUrl;
		// 发起网络请求
		uni.request({
			url: url,
			data: RequestData,
			method: 'POST',
			timeout: 100000,
			dataType: 'json',
			async: true,
			header: headers,
			success: res => {
				// 未登录
				if(res.data.code == 401){
					// 强制跳转到登录界面
					uni.reLaunch({
						url:'/pages/Login/Login'
					})
					return;
				}
				if (res.statusCode == 200) {
					if(res.data.code == 200 && res.data.status == 0){
						resolve(res.data); //成功
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					}
				}
				if (res.statusCode == 500) {
					console.log(JSON.stringify(res))
					uni.showToast({
						title: '服务器错误，请联系管理员',
						icon: 'none',
						duration: 2000
					})
					return;
				}
			},
			fail: (e) => {
				// reject(e); //失败
				console.log(JSON.stringify(e))
				uni.showToast({
					title: e.errMsg,
					icon: 'none',
					duration: 2000
				})
				return;
			},
			complete: (e) => {
				// console.log("网络请求complete");
				if (config.isLoading){
					uni.hideLoading();
				}
				return;
			}
		})
	})
	return promise;
};

//公用get异步请求
const get = (PostUrl, RequestData) => {
	let promise = new Promise(function(resolve, reject) {
		let headers = {
			"Content-Type": "application/json;charset=utf-8;",
			"token":uni.getStorageSync("token")||null
		}
		// 发起网络请求
		uni.request({
			url: PostUrl,
			data: RequestData,
			method: 'GET',
			timeout: 100000,
			dataType: 'json',
			async: true,
			header: headers,
			success: res => {
				console.log(res)
				if (res.statusCode == 200) {
					resolve(res.data); //成功
				}else{
					reject("服务器错误"); //失败
				}
			},
			fail: (e) => {
				reject(e); //失败
			},
			complete: (e) => {
				// console.log("网络请求complete");
				return;
			}
		})
	})
	return promise;
};

export {
	login,
	post,
	get
}
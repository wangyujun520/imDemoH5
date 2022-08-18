import Crypto from './crypto.js';
import './hmac.js';
import './sha1.js';
import {
	Base64
} from './base64.js';

//  oss 配置
var uploadFileSize = 1048576000; // 上传文件的大小限制
var policyText = {
	"expiration": "2025-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
	"conditions": [
		["content-length-range", 0, uploadFileSize] // 设置上传文件的大小限制 
	]
};

// 易保贵宾对王玉军账号的KEY

// AccessKey ID
// LTAI5tRuA9cNt5Zg7vjo2Qjw

// AccessKey Secret
// bnzYlQ8vOmHDhwGQ4C3dw6pEgWcTfd

// var accessid = "LTAI5tB1TZHXgHkB1p3SDW8G";
// var accesskey = "wUnKXKRJ9y1QSXawkEEEHEVKWXBMlm";

var accessid = "LTAI4G3ajzedLLywYycesAdX";
var accesskey = "D8p2XkqyS5b97jagpYIWFv2rvG5o2i";

//阿里云上传地址
// https://ebaovip-ins-images.oss-cn-shenzhen.aliyuncs.com/CRM/2020/09/2020091616002487329490.jpg
// var osshost = 'https://ebaovip-ins-images.oss-cn-shenzhen.aliyuncs.com/';//测试

// var osshost = 'https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/';//加速

var osshost = uni.getStorageSync('Oss');

var policyBase64 = Base64.encode(JSON.stringify(policyText));

var message = policyBase64;

var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
	asBytes: true
});

var signature = base64ArrayBuffer(bytes);

var timetamp = new Date().getTime(); 
// Native ArrayBuffer to Base64
function base64ArrayBuffer(arrayBuffer) {
  var base64    = ''
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var bytes         = new Uint8Array(arrayBuffer)
  var byteLength    = bytes.byteLength
  var byteRemainder = byteLength % 3
  var mainLength    = byteLength - byteRemainder
  var a, b, c, d
  var chunk
  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }
  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]
    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero
    b = (chunk & 3)   << 4 // 3   = 2^2 - 1
    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero
    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }
  return base64
}
function random_string(len) {
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = chars.length;
	var pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

//多图上传
function fileUploadBack(type, path, uploadFileName) {
	// console.log(type);
	// console.log(path);
	// console.log(uploadFileName);
	// console.log(osshost);
	
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: osshost,
			filePath: path,
			fileType: type,
			name: 'file',
			formData: {
				'key': uploadFileName,
				'policy': policyBase64,
				'OSSAccessKeyId': accessid,
				'success_action_status': '200', //让服务端返回200,不然，默认会返回204
				'signature': signature,
			},
			success: (res) => {
				// console.log(JSON.stringify(res));
				if (res.statusCode == 200) {
					resolve(osshost + uploadFileName)
					// resolve(uploadFileName)
				}
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

function videoUploadBack(type, path, uploadFileName) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: osshost,
			filePath: path,
			fileType: type,
			name: 'file',
			formData: {
				'key': uploadFileName,
				'policy': policyBase64,
				'OSSAccessKeyId': accessid,
				'success_action_status': '200', //让服务端返回200,不然，默认会返回204
				'signature': signature,
			},
			success: (res) => {
				if (res.statusCode == 200) {
					resolve(osshost + uploadFileName)
				}
			},
			fail: (err) => {
				reject(err)
			}
		});
	})

}

function audioUploadBack(type, path, uploadFileName) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: osshost,
			filePath: path,
			fileType: type,
			name: 'file',
			formData: {
				'key': uploadFileName,
				'policy': policyBase64,
				'OSSAccessKeyId': accessid,
				'success_action_status': '200', //让服务端返回200,不然，默认会返回204
				'signature': signature,
			},
			success: (res) => {
				if (res.statusCode == 200) {
					resolve(osshost + uploadFileName)
				}
			},
			fail: (err) => {
				reject(err)
			}
		});
	})

}


export default {
	fileUploadBack, //图片上传
	videoUploadBack, //视频上传
	audioUploadBack //音频上传
}

export default {
	// 格式化日期开始
	FormateTime(time) {
		//格式化日期
		var FormatDate = this.getDateTimeStamp(time);
		return this.getDateDiff(FormatDate); //时差结果
	},
	//格式化日期 yyyy-MM-dd HH:mm:ss
	formatDate(BeginTimes) {
		var data = new Date(BeginTimes);
		var year = data.getFullYear(); //获取年
		var month = data.getMonth() + 1; //获取月
		var day = data.getDate(); //获取日
		var hours = data.getHours(); //小时
		var minutes = data.getMinutes(); //分钟
		var seconds = data.getSeconds(); //秒
		if (month < 10) {
			month = '0' + month.toString();
		}
		if (day < 10) {
			day = '0' + day.toString();
		}
		if (hours < 10) {
			hours = '0' + hours.toString();
		}
		if (minutes < 10) {
			minutes = '0' + minutes.toString();
		}
		if (seconds < 10) {
			seconds = '0' + seconds.toString();
		}
		BeginTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
		return BeginTime;
	},
	//js函数代码：字符串转换为时间戳
	getDateTimeStamp(dateStr) {
		return Date.parse(dateStr.replace(/-/gi, '/'));
	},
	// 根据时间戳计算时差
	getDateDiff(dateTimeStamp) {
		var result;
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			//若日期不符则弹窗口告之,结束日期不能小于开始日期！
		}
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if (monthC >= 1) {
			result = parseInt(monthC) + '个月前';
		} else if (weekC >= 1) {
			result = parseInt(weekC) + '周前';
		} else if (dayC >= 1) {
			result = parseInt(dayC) + '天前';
		} else if (hourC >= 1) {
			result = parseInt(hourC) + '小时前';
		} else if (minC >= 1) {
			// result = parseInt(minC) + '分钟前';
			result = parseInt(minC) + '分钟前';
		} else result = '刚刚';
		return result;
	},
	// 一月后显示时间
	getDateDiffv1(dateTimeStamp) {
		var result;
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			//若日期不符则弹窗口告之,结束日期不能小于开始日期！
		}
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if (monthC >= 1) {
			result = this.timestampToTimev1(dateTimeStamp);
		} else if (weekC >= 1) {
			result = parseInt(weekC) + '周前';
		} else if (dayC >= 1) {
			result = parseInt(dayC) + '天前';
		} else if (hourC >= 1) {
			result = parseInt(hourC) + '小时前';
		} else if (minC >= 1) {
			// result = parseInt(minC) + '分钟前';
			result = parseInt(minC) + '分钟前';
		} else result = '刚刚';
		return result;
	},
	// 格式化日期结束
	// 计算当前日期星座
	getHoroscope(date) {
		let c = ['摩羯', '水瓶', '双鱼', '白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯']
		date = new Date(date);
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let startMonth = month - (day - 14 < '865778999988'.charAt(month));
		return c[startMonth] + '座';
	},
	// 计算指定时间与当前的时间差
	sumAge(data) {
		let dateBegin = new Date(data.replace(/-/g, "/"));
		let dateEnd = new Date(); //获取当前时间
		let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
		let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
		let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
		let hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
		//计算相差分钟数
		let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
		let minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
		//计算相差秒数
		let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
		let seconds = Math.round(leave3 / 1000)
		return dayDiff + "天 " + hours + "小时 ";
	},
	// 获取聊天时间（相差300s内的信息不会显示时间）
	getChatTime(v1, v2) {
		v1 = v1.toString().length < 13 ? v1 * 1000 : v1;
		v2 = v2.toString().length < 13 ? v2 * 1000 : v2;
		if (((parseInt(v1) - parseInt(v2)) / 1000) > 300) {
			return this.gettime(v1);
		}
	},
	// 人性化时间格式
	gettime(shorttime) {
		shorttime = shorttime.toString().length < 13 ? shorttime * 1000 : shorttime;
		let now = (new Date()).getTime();
		let cha = (now - parseInt(shorttime)) / 1000;

		if (cha < 43200) {
			// 当天
			return this.dateFormat(new Date(shorttime), "{A} {t}:{ii}");
		} else if (cha < 518400) {
			// 隔天 显示日期+时间
			return this.dateFormat(new Date(shorttime), "{Mon}月{DD}日 {A} {t}:{ii}");
		} else {
			// 隔年 显示完整日期+时间
			return this.dateFormat(new Date(shorttime), "{Y}-{MM}-{DD} {A} {t}:{ii}");
		}
	},
	parseNumber(num) {
		return num < 10 ? "0" + num : num;
	},
	dateFormat(date, formatStr) {
		let dateObj = {},
			rStr = /\{([^}]+)\}/,
			mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

		dateObj["Y"] = date.getFullYear();
		dateObj["M"] = date.getMonth() + 1;
		dateObj["MM"] = this.parseNumber(dateObj["M"]);
		dateObj["Mon"] = mons[dateObj['M'] - 1];
		dateObj["D"] = date.getDate();
		dateObj["DD"] = this.parseNumber(dateObj["D"]);
		dateObj["h"] = date.getHours();
		dateObj["hh"] = this.parseNumber(dateObj["h"]);
		dateObj["t"] = dateObj["h"] > 12 ? dateObj["h"] - 12 : dateObj["h"];
		dateObj["tt"] = this.parseNumber(dateObj["t"]);
		dateObj["A"] = dateObj["h"] > 12 ? '下午' : '上午';
		dateObj["i"] = date.getMinutes();
		dateObj["ii"] = this.parseNumber(dateObj["i"]);
		dateObj["s"] = date.getSeconds();
		dateObj["ss"] = this.parseNumber(dateObj["s"]);
		while (rStr.test(formatStr)) {
			formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
		}
		return formatStr;
	},
	// 获取年龄
	getAgeByBirthday(data) {
		let birthday = new Date(data.replace(/-/g, "\/"));
		let d = new Date();
		return d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() == birthday.getMonth() &&
			d.getDate() < birthday.getDate()) ? 1 : 0);
	},
	// 将时间戳转换为年月日时分秒
	timestampToTime(timestamp) {
		// 时间戳是整数，否则要parseInt转换
		var date = new Date(parseInt(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		let strDate = Y + M + D + h + m + s;
		// 　console.log(strDate) //2020-05-08 17:44:56　
		return strDate;
	},
	timestampToTimev1(timestamp) {
		// 时间戳是整数，否则要parseInt转换
		var date = new Date(parseInt(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		let strDate = Y + M + D ;
		// 　console.log(strDate) //2020-05-08 17:44:56　
		return strDate;
	}
	
}

import TIM from 'tim-js-sdk';
// import COS from "cos-js-sdk-v5";

let options = {
	// SDKAppID: 1400434250 // 正式环境
	SDKAppID: 1400489112 // 正式环境
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示

// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(4); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

// 日志级别
// 0 普通级别，日志量较多，接入时建议使用
// 1 release级别，SDK 输出关键信息，生产环境时建议使用
// 2 告警级别，SDK 只输出告警和错误级别的日志
// 3 错误级别，SDK 只输出错误级别的日志
// 4 无日志级别，SDK 将不打印任何日志

// 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});
export default {
	tim
}

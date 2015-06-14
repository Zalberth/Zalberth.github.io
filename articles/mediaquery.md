### Media Query功能使用注意事项
- 当使用`max-device-width`时，只会针对移动设备起作用，去掉`-device`即可实现桌面的响应式布局
- 在CSS文件中media query使用格式举例：`@media only screen and (max-device-width: 800px) and (orientation : portrait) {/*specific css styles*/}`
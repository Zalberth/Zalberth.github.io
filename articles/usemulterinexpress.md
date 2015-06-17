###利用multer实现文件上传要注意的事项
- 从Nodejs的控制台安装multer，输入命令`npm install multer`
- 最好指定multer中间件适配的路由，提高访问效率
- 题外话：一些状参数可以加到`req`对象上，这样最后在`post()`的回调函数中可以通过不同的状态参数做出响应
- 一段利用Date对象生成随机文件名的代码：
```javascript
   rename:function(fieldname, filename) { 						 	  
 	var now = new Date();
 	return now.getFullYear() +
      ( '0' + (now.getMonth() + 1) ).slice(-2) +
      ( '0' + now.getDate() ).slice(-2) +
      ( '0' + now.getHours() ).slice(-2) +
      ( '0' + now.getMinutes() ).slice(-2) +
      ( '0' + now.getSeconds() ).slice(-2) +
      parseInt(10000 + Math.random() * 90000);
 		}
```
/*
 * routes.js -- module to providing routing
 *
 */
 var configRoutes;

 configRoutes = function(app, server, mysql, uuid, fs, jsonObj, passport) {
	//ispost
	   
	    app.get('/apply',function(req,res){ 
	    	/*var inputFileName = 'public/applylist.json'; //
	    	var readInData = null;
	    	try {
	    	           readInData = fs.readFileSync(inputFileName,'utf-8');
	    	           jsonObj = JSON.parse(readInData);    
	    	           console.log("++++:"+jsonObj);
	    	}catch(e) { //捕获如果文件不存在引起的错误          
 		    }*/
	        //			
 			res.redirect('static/applylists.html');
 		});

 		//验证登录状态
 		app.get('/loginValidation', function(req, res) {
 			res.json({loginStatus:'1',orgname:'易思邮局'});
 		});

		     
		 /*  app.get("/static/applylists",function(req, res, next) {
		   	// body...
		   	console.log("readddddy");
		   	if (req.user) {
		   		console.log("certified");
		  		    //next();//检验到用户已登入，转移权限阁下一个路由
		  		res.redirect('/static/applylists.html');
				 } else {
				 	  console.log("See you!!!!");
			 		  res.redirect('/static/applylogin.html');//否则，页面重定位，不执行下面路由
				 }
		   });
		*/
        
        //尝试实现登录验证，用/来拦截
       
 
		app.post('/login',
				function(req, res, next) { //no next here, need to improve
					//res.redirect('/static/applylists.html');
					passport.authenticate('local', function(err, user ,info) {
						console.log("User?:" + user);
						//console.log("isAuthenticated: "+req.isAuthenticated());
						console.log('err1:' + err);
						if(err) return next(err);//认证出错
						if(!user) {
							console.log("No such user!");
							//req.haha = "1";
							return res.redirect('/static/applylogin.html'); //这个重定向没有被阻塞
						}
					
						req.login(user, function(err) { //问题应该就出在这个login函数里
							if(err) {
								console.log(err);
								return next(err);
							}		
							console.log('err2:' + err);			
							//console.log(res);							
							console.log("Successfully login");
						//	console.log("isAuthenticated: "+req.isAuthenticated());
							console.log(req.user); //这里有输出
							//var dataR = res.redirect('/lg'); //无法重定向
							//console.log('dataR:' + dataR);
							console.log(req.session);
						    return res.redirect('/static/applylists.html');	

						});

						console.log("res:"+res);
						//res.send("Some thing backup");
						//res.end();
						//return res.redirect('/static/applylists.html');
					})(req, res, next);
				}			    				    	
		);
		app.get('/lg',function(req, res) {
			res.redirect('/static/applylogin.html');
		});
        
 		//connect to remote db 125.20.238.234
 		app.post('/delete',function(req,res) {
 			for(var i = 0,len = jsonObj.applied.length; i < len; i++) { //literation
 				if( req.body.uniqueid == jsonObj.applied[i].uniqueid){
 					jsonObj.applied.splice(i,1);
 					break;
 				}
 			}
 			var outputFileName = 'public/applylist.json';

 			if(jsonObj.applied.length === 0) {
 				fs.unlinkSync(outputFileName);
 			} else {

 				fs.writeFile(outputFileName, JSON.stringify(jsonObj), function(err) {
 				    if(err) {
 				      console.log(err);
 				      res.json({state:"0"});
 				    } else {
 				      console.log("Delete Successfully. ");
 				      res.json({state:"1"});
 				    }
 				});
 			}
 		});

 		app.post('/save',function(req,res) {
 			var outputFileName = 'public/applylist.json';
 			var inputFileName = 'public/applylist.json';
 			var readInData = null;		
 		try {
            readInData = fs.readFileSync(inputFileName,'utf-8');
            jsonObj = JSON.parse(readInData);
            req.body.uniqueid = uuid.v1();
            if( req.body.notes === '') { // if notes is empty,set to default value 'nodata'
            	req.body.notes = 'nodata';
            }
 			jsonObj.applied.push(req.body);
 			fs.writeFile(outputFileName, JSON.stringify(jsonObj), function(err) {
 			    if(err) {
 			      console.log(err);
 			      res.json({state:"0"});
 			    } else {
 			      console.log("JSON saved to " + outputFileName);
 			      res.json({state:"1",uniqueid:req.body.uniqueid});
 			    }
 			});
 		}catch(e) { //捕获如果文件不存在引起的错误
           readInData = {   //生成一个对应格式的JSON对象并补全数据
           	applied:[{
           		companyName:req.body.companyName,
           		applyDate:req.body.applyDate,
           		uniqueid:uuid.v1(),
           		notes:req.body.notes
           	}
           	]
           };
           if( req.body.notes === '') { // if notes is empty,set to default value 'nodata'
           	console.log('-------00000-----------');
           	readInData.applied[0].notes = 'nodata';
           }

           jsonObj = readInData;
           fs.writeFile(outputFileName, JSON.stringify(jsonObj), function(err) {
               if(err) {
                 console.log(err);
                 res.json({state:"0"});
               } else {
                 console.log("JSON saved to " + outputFileName);
                 res.json({state:"2",uniqueid:jsonObj.applied[0].uniqueid});
               }
           });

 		}		
 		  });
	
 		
 };

 module.exports = { configRoutes: configRoutes };
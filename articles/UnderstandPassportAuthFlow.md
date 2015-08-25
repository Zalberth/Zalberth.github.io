### 理解Passportjs认证过程
> Passport.js是个很灵活的认证中间件（允许用户登录），你可以对它进行定制，同时它也可以很好地与connect/express集成。
> Passport.js的灵活性体现在它可以采取不同的认证策略（比如通过Twitter或者由可集成的独立模块进行自己的用户数据库比对），在认证过程中我们也可指定路由和输出。
> "本地策略"让我们可以通过应用本身的数据库来验证用户身份。这里是些例子。


#### 使用Passport.js的步骤
##### 要使用Passport.js主要通过三步
+ 引入Passport模块，在express中使用passport.initialize()、passport.session()作为中间件。
+ 至少给passport配置一种策略，定义好passport的serializeUser和deserializeUser方法。
+ 指定一个使用passport.authenticate的路由来验证用户。

#### 认证请求的过程
> 通过以上三个步骤的配置，当一个用户试图从路由`/login`进行认证时，将发生以下过程：
+ 当用户提交登录表单时，将向`/login`发送一个POST请求，这个请求将会执行`passport.authenticate`中间件。
+ 由于`authenticate`中间件配置了`local`策略，所以接下来就会调用`local`策略。
+ Passport将`req.body.username`和`req.body.password`作为参数传到`local`策略里的认证函数中。
+ 接下来要做的就是从数据库中读到用户信息，并检测密码是否匹配。
+ 我们需要调用`done(err)`函数以防在与数据库交互的过程中出错。当找不到用户或者密码不匹配时，调用`done(null, false)`。如果用户对了，密码#### 接下来的认证过程
+ Express从session中载入数据，并绑定到req上。也就是现在你可以访问到`req.session.passport.user`。
+ 在请求时还调用`passport.initialize`这个中间件，它可以由app.use()方法配置如果这些存在的话）。。如果还没有用户
+ 如果用户信息传过来了，这个中间件将调用`req.login`（这是一个与请求绑定的passport函数）。
+ 接下来会调用我们之前定义的`passport.serializeUser`方法。这个方法能够访问我们传回给中间件的用户对象（user)。`serializeUser`方法可以将用户（user)对象保存到session中。调用这个方法将定义`req.session.passport.user={/串行化后的用对象/}`。
+ 这个用户对象也可以在`req.user`上找到。
+ 至此，这个认证过程结束，你可以根据结果重定向到自己的页面。

#### 接下来的认证过程
+ Express从session中载入数据，并绑定到req上。也就是现在你可以访问到`req.session.passport.user`。
+ 在请求时还调用`passport.initialize`这个中间件，它可以由app.use()方法配置。如果还没有用户对象存在，就只会创建`req.passport.user={}`。
+ 接下来会调用`passport.session`，我们在使用passport策略时，每一个请求都会调用这个中间件。如果在session中发现了串行化的用户对象，就认为这个请求是被认证过的。
+ `passport.session`中间件会调用`passport.deserializeUser`。将用户对象绑定到请求上,即`req.user`。
#### 小结一下passport方法和它的中间件
+ 每个请求都会调用`passport.initialize`中间件。这样就保证了session中会包含一个`passport.user`对象（user可能是{}）。
+ 如果在服务器上找到了user对象，passport策略就会将这个user对象通过`passport.session`中间件绑定到req.user上。
+ 每个请求都会通过req.session调用passport.deserializeUser。这样在每个请求上将带有user信息。
+ 本地策略只能在路由上通过passport.authenticate中间件来调用。
+ 只有在这种认证时才会调用passport.serializeUser方法来指定session中需要保存的用户信息。

#### 下面是一些与请求绑定的方法
+ req.login() 或者 req.logIn()
+ req.logout() 或者 req.logOut()
+ req.inAuthenticated()
+ req.isUnAuthenticated()

##### 这篇文章是由在学习passport使用过程中找到的英文翻译过来的，搞明白Local策略怎么用了后面就比较好办了。Passport的源码本身不多，适合研究。 [英文原文链接](http://toon.io/understanding-passportjs-authentication-flow/)
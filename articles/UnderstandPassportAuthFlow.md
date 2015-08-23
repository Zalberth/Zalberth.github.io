### 理解Passportjs认证过程
> Passport.js是个很灵活的认证中间件（允许用户登录），你可以对它进行定制，同时它也可以很好地与connect/express集成。
> Passport.js的灵活性体现在它可以采取不同的认证策略（比如通过Twitter或者由可集成的独立模块进行自己的用户数据库比对），在认证过程中我们也可指定路由和输出。
> "本地策略"让我们可以通过应用本身的数据库来验证用户身份。这里是些例子。
> 在这篇文章中主要介绍Passport.js的认证过程，在另一篇文章中有些具体的案例。

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
+ 
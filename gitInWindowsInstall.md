### 在windows上面使用git
- 找到git for windows
- 直接安装
- `>ls ~/.ssh` 查看密钥，其实不看也可以
- `>ssh-keygen -t rsa -C "email address"`
- 将公钥pub设置到github上
- `>ssh -T git@github.com` 测试连接
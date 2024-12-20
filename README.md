# MyBlog - 个人博客系统

一个基于Vue3和Node.js的个人博客系统。

## 功能特点

- 文章的发布、查看和删除
- 管理员和游客权限区分
- 响应式设计，支持移动端
- 文章标签系统
- 阅读量统计

## 运行要求

- Node.js 16+
- MySQL 8.0+
- npm 或 pnpm

## 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/Dreamdrunked/myblog.git
cd myblog
```
2. **安装依赖**
```bash
安装前端依赖
npm install
或使用 pnpm
pnpm install
安装后端依赖
cd backend
npm install express mysql2 cors bcrypt jsonwebtoken
```

3. **配置数据库**
```bash
登录MySQL
mysql -u root -p
输入密码：你的密码
执行SQL初始化脚本
source 你的init.sql的文件地址
```
4. **启动服务**
```bash
启动后端服务（在backend目录下）
node server.js
新开一个终端，启动前端服务（在项目根目录下）
npm run dev
或
pnpm dev
```
5. **访问项目**
- 前端页面：http://localhost:5173
- 后端API：http://localhost:3000



## 项目结构
myblog/
├── backend/ # 后端代码
│ ├── config/ # 配置文件
│ │ └── init.sql # 数据库初始化脚本
│ └── server.js # 服务器入口
├── src/ # 前端代码
│ ├── components/ # 组件
│ │ └── Card.vue # 文章卡片组件
│ ├── views/ # 页面
│ │ ├── Home.vue # 首页
│ │ ├── Edit.vue # 编辑页
│ │ ├── Login.vue # 登录页
│ │ └── ArticleDetail.vue # 文章详情页
│ ├── styles/ # 样式文件
│ ├── router/ # 路由配置
│ └── main.js # 入口文件
└── README.md # 说明文档


## 技术栈

### 前端
- Vue 3.x
- Vue Router
- Element Plus
- Less

### 后端
- Node.js
- Express
- MySQL
- bcrypt (密码加密)
- jsonwebtoken (JWT认证)

### 开发工具
- Vite
- Git

## 功能说明

1. **用户系统**
   - 管理员登录
   - 游客访问
   - JWT token认证

2. **文章管理**
   - 发布文章（管理员）
   - 删除文章（管理员）
   - 查看文章（所有用户）
   - 文章标签
   - 阅读统计

3. **界面特点**
   - 响应式设计
   - 侧边栏折叠
   - 移动端适配
   - 平滑动画

## 常见问题

1. **数据库连接失败**
   - 检查MySQL服务是否启动
   - 验证数据库用户名和密码
   - 确保数据库myblog已创建

2. **端口占用**
   - 前端默认端口：5173
   - 后端默认端口：3000
   - 可在配置文件中修改

## 相关链接

- GitHub: https://github.com/Dreamdrunked
- 云盘项目: http://47.93.77.69:5212/home?path=%2F
- 博客项目: https://github.com/Dreamdrunked/myblog

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎通过以下方式联系：
- GitHub: @Dreamdrunked
- Email: [38502095@qq.com]

## 更新日志

### v1.0.0 (2024-01-xx)
- 初始版本发布
- 基本的文章管理功能
- 用户权限系统
- 响应式设计

## 贡献指南

1. Fork 本仓库
2. 创建新分支: `git checkout -b feature/your-feature`
3. 提交更改: `git commit -am 'Add some feature'`
4. 推送分支: `git push origin feature/your-feature`
5. 提交 Pull Request

## 致谢

感谢所有为这个项目做出贡献的开发者。

## 开发计划

- [ ] 添加评论功能
- [ ] 图片上传功能
- [ ] 文章搜索功能
- [ ] 用户管理系统
- [ ] 文章分类管理
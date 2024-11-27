const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./config/db');

// 加载环境变量
dotenv.config();

// 测试数据库连接
testConnection();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));
app.use(express.json());

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '38502095',
    database: 'myblog'
});

// 测试数据库连接
connection.connect((err) => {
    if (err) {
        console.error('数据库连接失败：', {
            code: err.code,
            errno: err.errno,
            message: err.message,
            sqlState: err.sqlState
        });
        return;
    }
    console.log('数据库连接成功！');
});

// 添加游客登录接口
app.post('/api/guest-login', (req, res) => {
    const token = jwt.sign(
        { role: 'guest' },
        'your-secret-key',
        { expiresIn: '24h' }
    )
    
    res.json({
        token,
        role: 'guest'
    })
})

// 添加验证中间件
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ error: '未授权' })
    }
    
    try {
        const decoded = jwt.verify(token, 'your-secret-key')
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: '无效的token' })
    }
}

// 保护需要认证的路由
app.get('/api/articles', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM articles ORDER BY created_at DESC';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
})

app.get('/api/articles/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM articles WHERE id = ?';
    
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: '文章不存在' });
            return;
        }
        
        // 更新浏览次数
        const updateSql = 'UPDATE articles SET views = views + 1 WHERE id = ?';
        connection.query(updateSql, [id], (updateErr) => {
            if (updateErr) {
                console.error('更新浏览次数失败：', updateErr);
            }
        });
        
        res.json(results[0]);
    });
})

app.post('/api/articles', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: '没有权限' })
    }
    const { title, content, author, tags } = req.body;
    
    console.log('收到的请求数据：', { title, content, author, tags });
    
    if (!title || !content) {
        res.status(400).json({ error: '标题和内容不能为空' });
        return;
    }

    const sql = 'INSERT INTO articles (title, content, author, tags) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [title, content, author, tags], (err, result) => {
        if (err) {
            console.error('SQL错误详情：', {
                code: err.code,
                errno: err.errno,
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('插入成功，结果：', result);
        res.json({ 
            id: result.insertId,
            message: '文章创建成功' 
        });
    });
})

// 添加登录接口
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body

    const sql = 'SELECT * FROM users WHERE username = ?'
    connection.query(sql, [username], async (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        }

        if (results.length === 0) {
            res.status(401).json({ error: '用户名或密码错误' })
            return
        }

        const user = results[0]
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            res.status(401).json({ error: '用户名或密码错误' })
            return
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            'your-secret-key',
            { expiresIn: '24h' }
        )

        res.json({
            token,
            username: user.username,
            role: user.role
        })
    })
})

// 添加删除文章接口
app.delete('/api/articles/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: '没有权限' })
    }

    const id = req.params.id;
    const sql = 'DELETE FROM articles WHERE id = ?';
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: '文章删除成功' });
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误：', err);
    res.status(500).json({ error: '服务器内部错误' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 
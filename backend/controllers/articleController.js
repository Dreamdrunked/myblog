const { pool } = require('../config/db');

// 获取所有文章
exports.getArticles = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM articles ORDER BY created_at DESC'
        );
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 获取单个文章
exports.getArticle = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM articles WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: '文章不存在'
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 创建文章
exports.createArticle = async (req, res) => {
    const { title, content } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO articles (title, content) VALUES (?, ?)',
            [title, content]
        );

        const [newArticle] = await pool.query(
            'SELECT * FROM articles WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            data: newArticle[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}; 
const bcrypt = require('bcrypt');

const password = 'admin';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('生成哈希失败：', err);
        return;
    }
    console.log('密码哈希值：', hash);
}); 
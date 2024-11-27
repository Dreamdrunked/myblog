<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
    if (!username.value || !password.value) {
        ElMessage.warning('请输入用户名和密码')
        return
    }

    loading.value = true
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        const data = await response.json()
        
        if (data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userRole', data.role)
            localStorage.setItem('username', data.username)
            ElMessage.success('登录成功！')
            router.push('/')
        } else {
            throw new Error(data.error || '登录失败')
        }
    } catch (error) {
        ElMessage.error(error.message || '登录失败')
    } finally {
        loading.value = false
    }
}

const handleGuest = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/guest-login', {
            method: 'POST'
        })
        
        const data = await response.json()
        if (data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userRole', 'guest')
            ElMessage.success('以游客身份登录成功！')
            router.push('/')
        }
    } catch (error) {
        ElMessage.error('游客登录失败')
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <img src="../assets/img/icon.jpg" alt="logo" class="logo">
                <h1>欢迎回来</h1>
                <p>登录以获取完整权限</p>
            </div>
            
            <div class="login-form">
                <div class="input-group">
                    <label>用户名</label>
                    <input
                        v-model="username"
                        type="text"
                        placeholder="请输入用户名"
                        class="input"
                        @keyup.enter="handleLogin"
                    >
                </div>
                
                <div class="input-group">
                    <label>密码</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="请输入密码"
                        class="input"
                        @keyup.enter="handleLogin"
                    >
                </div>
                
                <button
                    class="login-button"
                    @click="handleLogin"
                    :disabled="loading"
                >
                    {{ loading ? '登录中...' : '登录' }}
                </button>
                
                <div class="divider">
                    <span>或者</span>
                </div>
                
                <button
                    class="guest-button"
                    @click="handleGuest"
                >
                    以游客身份继续
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6c5ce7 0%, #a393eb 100%);
    padding: 20px;
}

.login-box {
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
    
    .logo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 20px;
        border: 3px solid #6c5ce7;
        object-fit: cover;
    }
    
    h1 {
        font-size: 24px;
        color: #2c3e50;
        margin-bottom: 8px;
    }
    
    p {
        color: #666;
        font-size: 14px;
    }
}

.login-form {
    .input-group {
        margin-bottom: 20px;
        
        label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-size: 14px;
        }
    }
    
    .input {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
        
        &:focus {
            outline: none;
            border-color: #6c5ce7;
            box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
        }
    }
}

.login-button, .guest-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-button {
    background: #6c5ce7;
    color: white;
    
    &:hover {
        background: #5b4cc4;
    }
    
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
}

.guest-button {
    background: white;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
        background: #f5f5f5;
    }
}

.divider {
    text-align: center;
    margin: 20px 0;
    position: relative;
    
    &::before, &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 45%;
        height: 1px;
        background: #ddd;
    }
    
    &::before {
        left: 0;
    }
    
    &::after {
        right: 0;
    }
    
    span {
        background: white;
        padding: 0 10px;
        color: #666;
        font-size: 14px;
    }
}
</style> 
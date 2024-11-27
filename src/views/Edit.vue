<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const title = ref('')
const content = ref('')
const tags = ref('')
const loading = ref(false)

const handleSubmit = async () => {
    if (!title.value || !content.value) {
        ElMessage.warning('标题和内容不能为空')
        return
    }

    loading.value = true
    try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title.value,
                content: content.value,
                author: 'Dream',
                tags: tags.value || ''
            })
        })

        const text = await response.text()
        console.log('服务器响应：', text)

        let data
        try {
            data = JSON.parse(text)
        } catch (e) {
            console.error('JSON解析错误：', e)
            throw new Error('服务器返回了无效的JSON数据：' + text)
        }

        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        if (data.id) {
            ElMessage.success('文章发布成功！')
            router.push('/')
        } else {
            throw new Error('发布失败：' + (data.error || '未知错误'))
        }
    } catch (error) {
        console.error('发布错误：', error)
        ElMessage.error(error.message || '发布失败，请稍后重试')
    } finally {
        loading.value = false
    }
}

const handleCancel = () => {
    router.push('/')
}
</script>

<template>
    <div class="edit-container">
        <div class="edit-content">
            <input 
                v-model="title" 
                class="title-input" 
                placeholder="请输入文章标题..."
            />
            <textarea 
                v-model="content" 
                class="content-input" 
                placeholder="请输入文章内容..."
            ></textarea>
            <input 
                v-model="tags" 
                class="tags-input" 
                placeholder="输入标签，用逗号分隔..."
            />
            <div class="button-group">
                <button 
                    class="cancel-button" 
                    @click="handleCancel"
                >取消</button>
                <button 
                    class="submit-button" 
                    @click="handleSubmit" 
                    :disabled="loading"
                >
                    {{ loading ? '发布中...' : '发布文章' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.edit-container {
    padding: 40px;
    max-width: 1000px;
    margin: 0 auto;
}

.edit-content {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.title-input {
    width: 100%;
    font-size: 24px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    
    &:focus {
        outline: none;
        border-color: #6c5ce7;
    }
}

.content-input {
    width: 100%;
    height: 400px;
    font-size: 16px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    resize: vertical;
    
    &:focus {
        outline: none;
        border-color: #6c5ce7;
    }
}

.tags-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 30px;
    border: 1px solid #eee;
    border-radius: 8px;
    
    &:focus {
        outline: none;
        border-color: #6c5ce7;
    }
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}

.submit-button, .cancel-button {
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.submit-button {
    background: #6c5ce7;
    color: white;
    border: none;
    
    &:hover {
        background: #5b4cc4;
    }
    
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
}

.cancel-button {
    background: white;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
        background: #f5f5f5;
    }
}
</style> 
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const loading = ref(true)

const fetchArticle = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/articles/${route.params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error('文章不存在')
        }
        const data = await response.json()
        article.value = data
        document.title = `${data.title} - 我的博客`
    } catch (error) {
        ElMessage.error(error.message)
        router.push('/')
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchArticle()
})

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const handleBack = () => {
    router.push('/')
}
</script>

<template>
    <div class="article-container">
        <div class="back-button" @click="handleBack">
            <svg class="nav-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
            返回首页
        </div>
        
        <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <p>正在加载文章...</p>
        </div>
        
        <div v-else-if="article" class="article-detail">
            <div class="article-header">
                <h1 class="title">{{ article.title }}</h1>
                <div class="meta">
                    <span class="author">作者：{{ article.author }}</span>
                    <span class="date">发布于：{{ formatDate(article.created_at) }}</span>
                    <span class="views">浏览：{{ article.views }}</span>
                </div>
                <div class="tags" v-if="article.tags">
                    <span v-for="tag in article.tags.split(',')" :key="tag" class="tag">
                        # {{ tag }}
                    </span>
                </div>
            </div>
            
            <div class="article-content">
                {{ article.content }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.article-container {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 40px 20px;
}

.back-button {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #6c5ce7;
    color: white;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    z-index: 100;
    
    .nav-icon {
        width: 20px;
        height: 20px;
    }
    
    &:hover {
        background: #5b4cc4;
        transform: translateX(-5px);
    }
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    gap: 20px;
    color: #666;
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #6c5ce7;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.article-detail {
    max-width: 800px;
    margin: 60px auto 0;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    overflow: hidden;
}

.article-header {
    padding: 40px 40px 30px;
    border-bottom: 1px solid #eee;
    background: linear-gradient(to bottom, #f8f9fa, white);
}

.title {
    font-size: 32px;
    color: #2c3e50;
    margin-bottom: 20px;
    line-height: 1.4;
    font-weight: 600;
}

.meta {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 15px;
    color: #666;
    font-size: 14px;
    
    .author {
        color: #6c5ce7;
        font-weight: 500;
    }
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .tag {
        padding: 4px 12px;
        background: #f0f0f0;
        border-radius: 20px;
        font-size: 13px;
        color: #666;
        transition: all 0.3s ease;
        
        &:hover {
            background: #6c5ce7;
            color: white;
            transform: translateY(-2px);
        }
    }
}

.article-content {
    padding: 40px;
    font-size: 16px;
    line-height: 1.8;
    color: #2c3e50;
    white-space: pre-wrap;
}

@media (max-width: 768px) {
    .article-detail {
        margin-top: 20px;
        border-radius: 12px;
    }
    
    .article-header {
        padding: 30px 20px 20px;
    }
    
    .title {
        font-size: 24px;
        margin-bottom: 15px;
    }
    
    .article-content {
        padding: 20px;
        font-size: 15px;
    }
    
    .back-button {
        position: static;
        margin: 0 auto 20px;
        width: fit-content;
    }
}
</style> 
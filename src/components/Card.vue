<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const articles = ref([])

const userRole = localStorage.getItem('userRole')

const fetchArticles = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/api/articles', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        articles.value = data
    } catch (error) {
        console.error('获取文章失败：', error)
    }
}

onMounted(() => {
    fetchArticles()
})

const handleCardClick = (id) => {
    router.push(`/card/${id}`)
}

const handleAddArticle = () => {
    router.push('/edit') // 跳转到编辑页面
}

const handleDelete = async (e, id) => {
    e.stopPropagation() // 阻止冒泡，防止触发卡片点击
    
    try {
        await ElMessageBox.confirm(
            '确定要删除这篇文章吗？此操作不可恢复',
            '删除确认',
            {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning',
                confirmButtonClass: 'el-button--danger'
            }
        )
        
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        if (response.ok) {
            ElMessage.success('文章删除成功')
            // 重新获取文章列表
            fetchArticles()
        } else {
            throw new Error('删除失败')
        }
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error(error.message || '删除失败')
        }
    }
}

// 格式化日期的函数
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
</script>

<template>
    <div v-if="articles.length === 0" class="empty-state">
        <div class="empty-content">
            <svg class="empty-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            <p>还没有任何文章</p>
            <button class="add-button" @click="handleAddArticle">
                创建第一篇文章
            </button>
        </div>
    </div>
    <div v-else class="card" v-for="item in articles" :key="item.id">
        <div class="card-header">
            <p class="title">{{ item.title }}</p>
            <button 
                v-if="userRole === 'admin'" 
                class="delete-btn"
                @click="(e) => handleDelete(e, item.id)"
            >
                <svg class="delete-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </button>
        </div>
        <div class="content" @click="handleCardClick(item.id)">{{ item.content }}</div>
        <div class="meta">
            <span class="author">作者：{{ item.author }}</span>
            <span class="date">发布于：{{ formatDate(item.created_at) }}</span>
            <span class="views">浏览：{{ item.views }}</span>
            <div class="tags">
                <span v-for="tag in item.tags?.split(',')" :key="tag" class="tag">
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
    <div v-if="articles.length > 0" class="floating-add">
        <button class="add-button" @click="handleAddArticle">
            <svg class="add-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
        </button>
    </div>
</template>

<style scoped lang="less">
@import '../styles/card.less';

.empty-state {
    height: 400px;
    width: 100%;
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    
    .empty-content {
        text-align: center;
        color: #666;
        
        .empty-icon {
            width: 64px;
            height: 64px;
            color: #6c5ce7;
            margin-bottom: 16px;
        }
        
        p {
            font-size: 16px;
            margin-bottom: 24px;
        }
    }
}

.add-button {
    padding: 12px 24px;
    background: #6c5ce7;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    
    &:hover {
        background: #5b4cc4;
        transform: translateY(-2px);
    }
    
    .add-icon {
        width: 20px;
        height: 20px;
    }
}

.floating-add {
    position: fixed;
    bottom: 30px;
    right: 30px;
    
    .add-button {
        width: 56px;
        height: 56px;
        padding: 0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(108, 92, 231, 0.2);
        
        .add-icon {
            width: 24px;
            height: 24px;
        }
    }
}

.meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 14px;
    color: #666;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;

    .author {
        font-weight: 500;
        color: #6c5ce7;
    }

    .tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        .tag {
            padding: 2px 8px;
            background: #f0f0f0;
            border-radius: 4px;
            font-size: 12px;
            color: #666;
            
            &:hover {
                background: #6c5ce7;
                color: white;
            }
        }
    }
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.delete-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: #f8f9fa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    .delete-icon {
        width: 20px;
        height: 20px;
        color: #666;
    }
    
    &:hover {
        background: #ff4757;
        transform: rotate(90deg);
        
        .delete-icon {
            color: white;
        }
    }
}

:deep(.el-message-box) {
    border-radius: 12px;
    
    .el-message-box__header {
        padding: 20px;
    }
    
    .el-message-box__content {
        padding: 20px;
        color: #666;
    }
    
    .el-message-box__btns {
        padding: 20px;
        
        .el-button--danger {
            background: #ff4757;
            border-color: #ff4757;
            
            &:hover {
                background: #ff6b81;
                border-color: #ff6b81;
            }
        }
    }
}
</style>
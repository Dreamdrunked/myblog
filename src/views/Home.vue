<script setup>
import Card from '../components/Card.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const router = useRouter()
const isCollapsed = ref(false)

const handleProjectClick = (url) => {
    window.open(url, '_blank')
}

const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('username')
    ElMessage.success('已退出登录')
    router.push('/login')
}

const toggleNav = () => {
    isCollapsed.value = !isCollapsed.value
}

const userRole = localStorage.getItem('userRole')
const username = localStorage.getItem('username')
</script>

<template>
    <div class="container">
        <div 
            class="nav-overlay" 
            :class="{ 'active': isCollapsed }" 
            @click="isCollapsed = false"
        ></div>
        
        <div class="nav-container" :class="{ 'collapsed': isCollapsed }">
            <div class="collapse-btn" @click="toggleNav">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
            </div>
            
            <div class="icon">
                <img src="../assets/img/icon.jpg" alt="">
                <p v-show="!isCollapsed">Dream</p>
            </div>
            
            <div class="user-info">
                <span class="username" v-show="!isCollapsed">{{ userRole === 'admin' ? '管理员' : '游客' }}</span>
                <button class="logout-btn" @click="handleLogout">
                    <svg class="icon-svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                    </svg>
                    <span v-show="!isCollapsed">退出登录</span>
                </button>
            </div>
            
            <div class="nav-list">
                <a href="#">
                    <svg class="icon-svg" viewBox="0 0 1024 1024">
                        <path d="M690.1 377.4c5.9 0 11.8 0.2 17.6 0.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6 5.5 3.9 9.1 10.3 9.1 17.6 0 2.4-0.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-0.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-0.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4 0.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-0.1 17.8-0.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8z m-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1z m-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1z" fill="currentColor"/>
                        <path d="M866.7 792.7c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-0.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34.1c1.7 1 3.3 1.7 5.2 1.7 5 0 9-4.1 9-9.1 0-2.2-0.8-4.3-1.4-6.6-0.4-1.2-7.5-28.3-12.2-45.3-0.5-1.9-0.9-3.8-0.9-5.7 0.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9z m179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c-0.1 19.8-16.2 35.9-36 35.9z" fill="currentColor"/>
                    </svg>
                    <span v-show="!isCollapsed">微信</span>
                </a>
                <a href="#">
                    <svg class="icon-svg" viewBox="0 0 1024 1024">
                        <path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" fill="currentColor"/>
                    </svg>
                    <span v-show="!isCollapsed">QQ</span>
                </a>
                <a href="https://github.com/Dreamdrunked" target="_blank">
                    <svg class="icon-svg" viewBox="0 0 1024 1024">
                        <path d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.696-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z" fill="currentColor"/>
                    </svg>
                    <span v-show="!isCollapsed">Github</span>
                </a>

                <div class="projects-title">我的项目</div>
                <a @click="handleProjectClick('http://47.93.77.69:5212/home?path=%2F')" class="project-link">
                    <svg class="icon-svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z" />
                    </svg>
                    我的云盘
                </a>
                <a @click="handleProjectClick('https://github.com/Dreamdrunked/myblog')" class="project-link">
                    <svg class="icon-svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                    </svg>
                    博客项目
                </a>
            </div>
        </div>
        <div class="article-container" :class="{ 'nav-collapsed': isCollapsed }">
            <Card class="card"></Card>
        </div>
    </div>
</template>

<style scoped lang="less">
@import '../styles/home.less';

.projects-title {
    color: #888;
    font-size: 14px;
    padding: 20px 25px 10px;
    margin-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
}

.project-link {
    cursor: pointer !important;
    
    &:hover {
        background-color: rgba(108, 92, 231, 0.15) !important;
        color: #6c5ce7 !important;
        transform: translateX(5px);
    }
}

.nav-list {
    a {
        .icon-svg {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
    }
}

.user-info {
    padding: 20px 25px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .username {
        color: white;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        
        &::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #6c5ce7;
            border-radius: 50%;
            display: inline-block;
        }
    }
}

.logout-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(255,255,255,0.1);
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    
    .icon-svg {
        width: 16px;
        height: 16px;
    }
    
    &:hover {
        background: rgba(255,255,255,0.2);
        transform: translateX(5px);
    }
}

.nav-list {
    margin-top: 20px; // 调整导航列表的上边距
    
    a {
        .icon-svg {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
    }
}

.nav-container {
    transition: all 0.3s ease;
    
    &.collapsed {
        width: 80px;
        
        .icon {
            img {
                width: 40px;
                height: 40px;
            }
        }
        
        .nav-list a {
            justify-content: center;
            padding: 12px;
            
            .icon-svg {
                margin-right: 0;
            }
        }
        
        .logout-btn {
            padding: 8px;
            justify-content: center;
        }
    }
}

.collapse-btn {
    position: absolute;
    right: -16px;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    background: #6c5ce7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(108, 92, 231, 0.3);
    transition: all 0.3s ease;
    
    .icon-svg {
        width: 20px;
        height: 20px;
        color: white;
        transition: transform 0.3s ease;
    }
    
    &:hover {
        background: #5b4cc4;
        box-shadow: 0 4px 12px rgba(108, 92, 231, 0.4);
        
        .icon-svg {
            transform: scale(1.1);
        }
    }
}

.article-container {
    transition: all 0.3s ease;
    
    &.nav-collapsed {
        margin-left: 80px;
    }
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .nav-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 280px;
        height: 100vh;
        transform: translateX(-280px);
        z-index: 1000;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        &.collapsed {
            transform: translateX(0);
            
            .collapse-btn {
                right: -40px;
                border-radius: 0 8px 8px 0;
                width: 40px;
                height: 50px;
                background: #6c5ce7;
                
                .icon-svg {
                    transform: rotate(180deg);
                }
            }
        }
        
        .collapse-btn {
            top: 20px;
            right: -40px;
            border-radius: 0 8px 8px 0;
            width: 40px;
            height: 50px;
            transform: none;
        }
    }
    
    .nav-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease;
        
        &.active {
            display: block;
            opacity: 1;
        }
    }
    
    .article-container {
        margin-left: 0;
        width: 100%;
        transition: transform 0.3s ease;
        
        &.nav-collapsed {
            margin-left: 0;
        }
    }
}

@media (min-width: 769px) {
    .nav-overlay {
        display: none !important;
    }
    
    .article-container {
        &.nav-collapsed {
            margin-left: 80px;
        }
    }
}
</style>
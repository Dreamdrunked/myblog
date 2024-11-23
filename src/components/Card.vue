<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const articles = ref([
    {
        id:1,
        title:'我是标题',
        content:'我是内容'
    },
    {
        id:2,
        title:'我是标题',
        content:'我是内容'
    },
    {
        id:3,
        title:'我是标题',
        content:'我是内容'
    }
])

const handleCardClick = (id) => {
    router.push(`/card/${id}`)
}
</script>

<template>
    <div class="card" v-for="item in articles" :key="item.id" @click="handleCardClick(item.id)">
        <p class="title">{{item.title}}</p>
        <div class="content">{{item.content}}</div>
    </div>
</template>

<style scoped lang="less">
@import '../styles/card.less';
</style>
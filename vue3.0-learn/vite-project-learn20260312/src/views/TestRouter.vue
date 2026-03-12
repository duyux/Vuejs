<template>
    <div>
        <!-- 导航栏：路由跳转 -->
        <nav style="padding: 20px; background: #f5f5f5;">
            <!-- 声明式导航（router-link） -->
            <router-link to="/" style="margin-right: 20px;">首页</router-link>
            <router-link to="/about" style="margin-right: 20px;">关于</router-link>
            <router-link to="/user/profile" style="margin-right: 20px;">用户资料</router-link>
            <router-link to="/user/setting">用户设置</router-link>
        </nav>

        <!-- 路由出口：匹配的组件会渲染在这里 -->
        <router-view style="padding: 20px;" />
    </div>
</template>
<style scoped>
/* 全局样式重置 */
/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */

a {
    text-decoration: none;
    color: #333;
}

router-link-active {
    color: #42b983;
    /* 激活路由的样式 */
    font-weight: bold;
}
</style>

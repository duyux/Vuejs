<template>
    <div>
        <el-container>
            <el-header>
                <div style="width:400px">
                    <p style="float:left;">
                        <el-icon color="#409EFF" :size="50">
                            <ElementPlus />
                        </el-icon>
                    </p>
                    <p style="float:left;font-size:25px;font-weight: bold;">
                        欢迎来到知否在线课堂
                    </p>
                </div>
            </el-header>
      

        <el-main>
            <el-card class="login_card">
                <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="80px">
                    <el-form-item label="账号：" prop="username">
                        <el-input v-model="form.username" placeholder="请输入账号"  />
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" v-model="form.password" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">登录</el-button>
                        <el-button type="primary" @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>

        <el-footer>
            <p>关于我们 | 联系我们 | 人才招聘 | 广告服务 | 友情链接 | 知否社区 | 知否公益</p>
            <p>Copyright @ 2001-2002 <el-tag>公众号:知否技术</el-tag></p>
        </el-footer>
    </el-container>
    </div>
</template>

<script setup>
import userApi from '../api/user';
import {reactive,ref,getCurrentInstance} from 'vue';
import {ElMessage } from 'element-plus';
import router from '../router/index'
//proxy 可以理解为 vue 的代理对象,getCurrentInstance 方法获取当前组件实例
const {proxy} =getCurrentInstance(); 
const form=reactive({
    username:"",
    password:""
});

const ruleFormRef=ref();
const rules=reactive({
    username:[{required:true,message:"账号不能为空",trigger:'blur'}],
    password:[{required:true,message:"密码不能为空",trigger:"blue"}],
});

//提交验证
const onSubmit=() =>{
    if(!ruleFormRef) return;
    ruleFormRef.value.validate(async (valid) =>{
       
        if(valid){
            // const res=await userApi.login(form);
            // if(res.data){
            //     if(res.data.success){
            //         proxy.$commonJs.changeView('/home');
            //         //router.push('/home');
            //     } else {
            //         ElMessage.error(res.data.messge);
            //     }
            // } else {
            //     ElMessage.error("服务器内部错误");
            // }
             
            //proxy.$commonJs.changeView('/home');
            console.log('valid2',valid)
            router.push('/home')
        } else {
            return false;
        }
    });
};

//重置表单
const resetForm=() =>{
    if(!ruleFormRef) return;
    ruleFormRef.value.resetFields();
}
</script>


<style scoped>
.el-container {
  height: 800px;
}

.el-header {
  height: 10%;
}

.el-main {
  height: 80%;
  background-image: url("../assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 120%;
  background-position-y: bottom;
}

.login_card {
  margin: 100px 200px;
  width: 20%;
  min-width: 300px;
  height: 200px;
  border-radius: 10px;
}

.el-footer {
  height: 10%;
  text-align: center;
}
</style>
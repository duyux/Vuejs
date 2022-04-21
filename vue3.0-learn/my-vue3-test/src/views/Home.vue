<template>
<div>
  <!-- <a-form layout="inline" :model="state.form">
    <a-form-item>
      <a-input v-model:value="state.form.user" placeholder="Username">
        <template v-slot:prefix
          ><UserOutlined style="color:rgba(0,0,0,.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="state.form.password"
        type="password"
        placeholder="Password"
      >
        <template v-slot:prefix
          ><LockOutlined style="color:rgba(0,0,0,.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        :disabled="state.form.user === '' || state.form.password === ''"
        @click="handleSubmit"
      >
        登录
      </a-button>
    </a-form-item>
  
  </a-form> -->
 <div>姓名：{{learn.name}}</div>
 <div>公众号：{{learn.gzh}}</div>
</div>

 
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form, Input, Button } from "ant-design-vue";
import { reactive } from "vue";

export default {
  components: {
    // UserOutlined,
    // LockOutlined,
    // [Form.name]: Form,
    // [Form.Item.name]: Form.Item,
    // [Input.name]: Input,
    // [Button.name]: Button
  },
  setup() {
    const state = reactive({
      form: {
        user: "",
        password: ""
      }
    });

    const learn=reactive({
            name:'子君'
      }
     
    );

    setTimeout(() => {
      learn.gzh='前端真的很好'
    }, 1000*5);

    function handleSubmit() {
      console.log(state.form);
    }

    return {
      state,
      learn,
      handleSubmit
    };
  }
};
</script>


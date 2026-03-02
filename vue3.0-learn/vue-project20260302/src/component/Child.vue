<!--子组件 Child.vue-->
<script>
    // let $emit = defineEmits(['submit','click']);
    // //按钮点击回调
    // const handleClick = () => {
    // //第一个参数:事件类型 第二个|三个|N参数即为注入数据
    //     $emit('submit',{name:'张三',age:25});
    // };


export default{
    methods:{
        handleClick(){
            //触发名为"submit"的事件，携带数据
            this.$emit('submit',{name:'张三',age:25})
        }
    }
}
</script>
<template>
    <div>
        <button @click="handleClick">点击我</button>
    </div>

</template>
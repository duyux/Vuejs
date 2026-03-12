import {reactive} from 'vue'

export const store=reactive({
    user:{
        name:'测试用户',
        email:'test@example.com',
    },
    count:0,
    increment(){
        this.count++;
    }
})
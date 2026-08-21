import {defineStore} from 'pinia'
import type {UserInfo,LoginParams} from '@/types/user'
import {loginApi,getUserInfoApi} from '@/api/user'

export const useUserStore=defineStore('user',{
    persist:true,

    state:()=>({
        token:'',
        userInfo:null as UserInfo |null,
        roles:[] as string[],
        permissions:[] as string[]
        }),

        getters:{
            isLogin:(state)=>!!state.token,
            isAdmin:(state)=>state.roles.includes('admin')
        },

        actions:{
            //登录
            async login(loginForm:LoginParams){
                const res=await loginApi(loginForm)
                this.token=res.token
                return res
            },

            //获取用户信息+权限
            async fetchUserInfo(){
                const res=await getUserInfoApi()
                this.userInfo=res.userInfo
                this.roles=res.roles
                this.permissions=res.permissions
                return res
            },

            //退出登录
            logout(){
                this.token=''
                this.userInfo=null
                this.roles=[]
                this.permissions=[]
            }
        }
})

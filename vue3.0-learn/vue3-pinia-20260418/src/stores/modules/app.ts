import {defineStore} from 'pinia'

export const useAppStore=defineStore('app',{
    persist:true,

    state:()=>({
        theme:'light',
        sidebarCollapse:false,
        language:'zh-CN'
    }),

    actions:{
        toggleSidbar(){
            this.sidebarCollapse=!this.sidebarCollapse
        },
        switchTheme(theme:'light'|'dark'){
            this.theme=theme
        }
    }
})
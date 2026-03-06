export default{
    install:(app,options)=>{
        //注入一个全局可用的$translate()方法
        app.config.globalProperties.$translate=(key)=>{
            //获取'options'对象的深层属性
            return key.split('.').reduce((o,i)=>{
                if(o) return o[i]
            },options)
        }

        //我们可以将插件接收到的 options 参数提供给整个应用，让任何组件都能使用这个翻译字典对象
        app.provide('i18n', options)
    }
}
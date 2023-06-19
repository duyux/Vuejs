<template>
    <div class='qualityManual-container'>
        <div v-if='show' class='qualityManual-container-office'>
            <vab-only-office :option='option' />
        </div>
    </div>
</template>
<script>
import vabOnlyOffice from '@/components/VabOnlyOffice'
export default {
    components: {
        vabOnlyOffice
    },
    data() {
        return {
            //参考vabOnlyOffice组件参数配置
            option: {
                url: '',
                isEdit: true,
                fileType: '',
                key: '',
                title: '',
                lang: 'zh-CN',
                isPrint: true,
                user: {
                  id: 1,
                  name: '张三'
                }
            },
            show: false,
            // list:[
            //     {name:'我的文档1.doc',id:1,title:'我的文档1.doc',url:'http://192.168.235.133:8075/example/editor?fileName=test.docx',fileType:'doc'},
            // ]
            list:[
                {name:'我的文档1.doc',id:1,title:'我的文档1.doc',url:'https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx',fileType:'doc'},
            ]
        }
    },
    created(){
        this.loadOnlyOffice(this.$route.query.id)
    },
    methods:{
        loadOnlyOffice(val){
            let optionTemp = {}
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].id == val){
                    optionTemp = this.list[i]
                    break;
                }
            }
            this.option.name = optionTemp.name
            this.option.id = optionTemp.id
            this.option.title = optionTemp.title
            this.option.url = optionTemp.url
            this.option.fileType = optionTemp.fileType
            console.log(this.option)
            this.show = true
        }
    }
}
</script>
<style>
  .qualityManual-container {
    padding: 0 !important;
    height: 100%;
  }

  .qualityManual-container-office {
    width: 100%;
    height: calc(100% - 55px);
  }
</style>
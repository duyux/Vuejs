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
                  name: 'du'
                },
                // customization: {
                //     // 强制保存
                //     forcesave: true,
                //     features: {
                //         // 关闭拼写检查
                //         spellcheck: false
                //     }
                //  },
               
            },
            show: false,
            // list:[
            //     {name:'我的文档1.doc',id:1,title:'我的文档1.doc',url:'http://192.168.235.133:8075/example/editor?fileName=test.docx',fileType:'doc'},
            // ]
            // list:[
            //     {name:'我的文档1.doc',id:1,title:'我的文档1.doc',url:'https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx',fileType:'doc'},
            // ]
            // list:[
            //     {name:'我的文档1.docx',id:1,title:'我的文档1.docx',url:'http://59.215.190.105:8080/uploadfile_gzcg/test3.docx',fileType:'docx'},
            // ]
          
            // list:[
            //     {name:'我的文档1.docx',id:1,title:'我的文档1.docx',url:'http://59.215.190.105:8080/uploadfile_gzcg/zydoc.docx',fileType:'docx'},
            // ]
            list:[
                {name:'我的文档1.docx',id:1,title:'我的文档1.doc',url:'http://192.168.235.133:8080/data/zydoc.docx',fileType:'docx'},
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
            // this.option.editUrl="http://2.0.1.5:8090/FileServer/docxSave?token=admin&path="+optionTemp.name  //后端保存
            //this.option.editUrl="http://127.0.0.1:8090/FileServer/docxSave?path="+optionTemp.name  //后端保存
            //this.option.editUrl="http://192.168.1.106:8085/docx/save?path="+optionTemp.name  //后端保存
            this.option.editUrl="http://192.168.1.106:8085/docx/save?path=zydoc.docx"  //后端保存
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
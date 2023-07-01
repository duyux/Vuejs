<!--onlyoffice 编辑器-->
<template>
  <div>
    <!-- <button @click="search">search - api调用</button> -->
    <div id='vabOnlyOffice'>
     
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VabOnlyOffice',
    props: {
      option: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    data() {
      return {
        doctype: '',
        docEditor: null,
      }
    },
    beforeDestroy() {
      if (this.docEditor !== null) {
        this.docEditor.destroyEditor();
        this.docEditor = null;
      }
   },
    watch: {
      option: {
        handler: function(n) {
          this.setEditor(n)
          this.doctype = this.getFileType(n.fileType)
        },
        deep: true,
      },
    },
    mounted() {
      if (this.option.url) {
        this.setEditor(this.option)
      }
    },
    methods: {
      search() {
        // eslint-disable-next-line no-undef,no-unused-vars
        this.connector = this.docEditor.createConnector();
        console.log('end创建connector',this.connector)
 
        this.connector.callCommand(
          function() {
            var oDocument = Api.GetDocument();
            var aSearch = oDocument.Search("编制人");
            aSearch[0].Select();
          },
          function(a){
            console.log('callCommand加载完成')
          }
        );
        console.log('connector',this.connector)
      },
      async setEditor(option) {
        if (this.docEditor !== null) {
          this.docEditor.destroyEditor();
          this.docEditor = null;
        }
        this.doctype = this.getFileType(option.fileType)
        let config = {
          document: {
            //后缀
            fileType: option.fileType,
            key: option.key ||'',
            title: option.title,
            permissions: {
              edit: option.isEdit,//是否可以编辑: 只能查看，传false
              print: option.isPrint,
              download: true,
              fillForms: true,//是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
              review: true //跟踪变化
            },
            url: option.url,
          },
          documentType: this.doctype,
          editorConfig: {
            callbackUrl: option.editUrl,//"编辑word后保存时回调的地址，这个api需要自己写了，将编辑后的文件通过这个api保存到自己想要的位置
            lang: option.lang,//语言设置
            //定制
            chat: {
              autosave: false,//是否自动保存
              chat: false,
              comments: false,
              help: false,
              // "hideRightMenu": false,//定义在第一次加载时是显示还是隐藏右侧菜单。 默认值为false
              //是否显示插件
              plugins: false,
            },
            user:{
              id:option.user.id,
              name:option.user.name
            },
            mode:option.model?option.model:'edit',
           
            customization: {
                    // 强制保存
                    forcesave: true,
                    features: {
                        // 关闭拼写检查
                        spellcheck: false
                    },
            //         review: {
            //           hideReviewDisplay: false,
            //           showReviewChanges: false,
            //           reviewDisplay: "original",
            //           trackChanges: true,
            //           hoverMode: false
            //         },
                    customer: {
                        ad: "My City, 123a-45",
                        info: "Some additional information",
                        logo: "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG41175510742.jpg",
                        logoDark: "https://example.com/dark-logo-big.png",
                        mail: "john@example.com",
                        name: "John Smith and Co.",
                        phone: "123456789",
                        www: "example.com"
                    },
            },

          },
          events: {
            onAppReady: this.onAppReady,
          },
          width: '100%',
          height: '700px',
          token:option.token||""
        }
        console.log('config111',config)
        // eslint-disable-next-line no-undef,no-unused-vars
        this.docEditor = new DocsAPI.DocEditor('vabOnlyOffice', config)
        console.log('docEditor',this.docEditor)
        //this.onAppReady();
      },
      // onlyOffice加载完成的回调
      onAppReady() {
        // 创建connector连接器
        console.log('开始创建connector',this.docEditor)
        this.connector = this.docEditor.createConnector();
        console.log('end创建connector',this.connector)
      },
      getFileType(fileType) {
        let docType = ''
        let fileTypesDoc = [
            'doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'epub', 'fodt', 'htm', 'html', 'mht', 'odt', 'ott', 'pdf', 'rtf', 'txt', 'djvu', 'xps',
        ]
        let fileTypesCsv = [
            'csv', 'fods', 'ods', 'ots', 'xls', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx',
        ]
        let fileTypesPPt = [
            'fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx',
        ]
        if (fileTypesDoc.includes(fileType)) {
            //docType = 'text'
            docType="word"
        }
        if (fileTypesCsv.includes(fileType)) {
            docType = 'spreadsheet'
        }
        if (fileTypesPPt.includes(fileType)) {
            docType = 'presentation'
        }
        return docType
      }
    },
  }
</script>
<style >
i icon toolbar__icon btn-menu-about
 {
    visibility: hidden !important;
  }

 
</style>


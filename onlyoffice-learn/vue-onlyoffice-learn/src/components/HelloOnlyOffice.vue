<template>
  <div>
    <button @click="search">search - api调用</button>
      <DocumentEditor
      id="docEditor"
      documentServerUrl="http://192.168.235.133:8080/onlyoffice/"
      :config="config"
      :events_onDocumentReady="onDocumentReady"
      />
  </div>
 
</template>

<script>
import { defineComponent } from "vue";
import { DocumentEditor } from "@onlyoffice/document-editor-vue";

export default defineComponent({
  name: "HelloOnlyOffice",
  components: {
    DocumentEditor,
  },
  data() {
    return {
      config: {
        document: {
          fileType: "docx",
          key: "192.168.235.1test.docx1687050515280",
          title: "zydoc.docx",
          url: "http://192.168.235.133:8080/data/zydoc.docx",
          //url: "http://59.215.190.105:8080/uploadfile_gzcg/test3.docx"
          // url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx"
          permissions: {
            edit:true, //是否可以编辑: 只能查看，传false
            print: true,
            download: true,
            fillForms: true, //是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
            review: true, //跟踪变化
          },
        },
        documentType: "word",
        editorConfig: {
          //callbackUrl: "http://192.168.1.106:8085/docx/save?path="+optionTemp.name , //"编辑word后保存时回调的地址，这个api需要自己写了，将编辑后的文件通过这个api保存到自己想要的位置
          lang: 'zh-cn', //语言设置
          //定制
          chat: {
            autosave: false, //是否自动保存
            chat: false,
            comments: false,
            help: false,
            // "hideRightMenu": false,//定义在第一次加载时是显示还是隐藏右侧菜单。 默认值为false
            //是否显示插件
            plugins: false,
          },
          user: {
            id: 1,
            name: "test.docx",
          },
          mode:  "edit",
          customization: {
            // 强制保存
            forcesave: true,
            features: {
              // 关闭拼写检查
              spellcheck: false,
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
              www: "example.com",
            },
          },
        },
        token: "",
        height: "700px",
        width: "100%",
      },
      connector:null,
    };
  },
  methods: {
    onDocumentReady() {
        console.log("Document is loaded");
        //创建connector连接器
        console.log('开始创建connector',this.$refs.docEditor)
        this.connector = this.$refs.docEditor.createConnector();
        console.log('end创建connector',this.connector)
    },
    search() {
        // this.connector.callCommand(
        //   function() {
        //     var oDocument = Api.GetDocument();
        //     var aSearch = oDocument.Search("编制人");
        //     aSearch[0].Select();
        //   },
        //   function(a){
        //     console.log('callCommand加载完成')
        //   }
        // );
        console.log('connector',this.connector)
      },
  },
});
</script>

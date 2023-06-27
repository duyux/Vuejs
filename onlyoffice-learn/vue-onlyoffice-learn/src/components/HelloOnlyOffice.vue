<template>
  <DocumentEditor 
      id="docEditor" 
      documentServerUrl="http://59.215.190.105:8080/onlyoffice/"
      :config="config"
      :events_onDocumentReady="onDocumentReady"
  /> 
</template>

<script >
import { defineComponent } from 'vue';
import { DocumentEditor } from "@onlyoffice/document-editor-vue";

export default defineComponent({
  name: 'HelloOnlyOffice',
  components: {
      DocumentEditor
  },
  data() {
      return {
          config: {
            document: {
                  fileType: "docx",
                  key: "192.168.235.1test.docx1687050515280",
                  title: "test2.docx",
                  url: "http://59.215.190.105:8080/uploadfile_gzcg/test2.docx"
                  // url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx"
              },
              // documentType: "word",
            //   document: {
            //       fileType: "docx",
            //       key: "192.168.235.1test.docx1687050515280",
            //       title: "test.docx",
            //       url: "http://192.168.235.133:8075/example/editor?fileName=test.docx"
            //   },
            //   documentType: "word",
            //   editorConfig: {
            //       callbackUrl: "https://192.168.235.133:8075/url-to-callback.ashx"
            //   },
               //token: 'rtcmSYIERN80D8atMeEFsbcHXfwobAla',
              // height: '100%',
              // width: '100%'
              height: '600',
              width: '100%'
            }
                        
                  
      }
  },
  methods: {
      onDocumentReady() {
          console.log("Document is loaded");
      }
  },
});
</script>
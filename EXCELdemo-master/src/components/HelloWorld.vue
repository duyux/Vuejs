/**
* @author:      zhouzhonghao
* @Description:  excle
* @date:        2020/11/10
*/
<template>
    <div class="hello">
        <div>
            <button @click="setColumn">设置单元格值</button>
        </div>
        <div
                id="zzh"
                style="margin:0px;padding:0px;position:absolute;width:100%;height:80%;left: 0px;top: 100px;"
        ></div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            ops: {
                default: function () {
                    return {
                        title: "",
                        data:[{
                            celldata: [
                                {
                                    "r": 0,
                                    "c": 0,
                                    "v": {
                                        "v": "样品编号",
                                        "ct": { "fa": "General", "t": "g" },
                                        "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                        "m": "样品编号"
                                    }
                                },
                                {
                                    "r": 0,
                                    "c": 1,
                                    "v": {
                                        "v": "样品名称",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "样品名称",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                },
                                {
                                    "r": 0,
                                    "c": 2,
                                    "v": {
                                        "v": "取样体积V0(mL)",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "取样体积V0(mL)：",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                },
                                {
                                    "r": 0,
                                    "c": 3,
                                    "v": {
                                        "v": "定容体积V1(mL)",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "定容体积V1(mL)",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                },
                                {
                                    "r": 0,
                                    "c": 4,
                                    "v": {
                                        "v": "稀释倍数D",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "稀释倍数D",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                },
                                 {
                                    "r": 0,
                                    "c": 5,
                                    "v": {
                                        "v": "信号值E",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "信号值ED",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                },
                                {
                                    "r": 0,
                                    "c": 6,
                                    "v": {
                                        "v": "E0",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "E0",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0, 
                                    }
                                },
                                  {
                                    "r": 0,
                                    "c": 7,
                                    "v": {
                                        "v": "平均浓度(mg/L)",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "平均浓度(mg/L)",
                                        "bl": 0,
                                          "bg": "#F0F0F0",
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                },
                                  {
                                    "r": 0,
                                    "c": 8,
                                    "v": {
                                        "v": "分析值",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "分析值",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                },
                                   {
                                    "r": 0,
                                    "c": 9,
                                    "v": {
                                        "v": "测定浓度(mg/L)",
                                        "ct": { "fa": "General", "t": "g" },
                                        "m": "测定浓度(mg/L)",
                                          "bg": "#F0F0F0",
                                        "bl": 0,
                                        "it": 0,
                                        "ff": 1,
                                        "fs": "11",
                                        "ht": 0,
                                        "vt": 0,
                                    }
                                }
                            ],
                            config: {
                                merge:{}, //合并单元格
                                rowlen:{
                                    "0": 40,
                                    "1": 20,
                                    "2": 20
                                    }, //表格行高
                                columnlen:{
                                    "0": 80,
                                    "1": 80,
                                    "2": 130,
                                    "3": 130,
                                    "4": 120,
                                    "5": 80,
                                    "6": 80,
                                    "7": 80,
                                    "8": 80,
                                    "9":120
                                    },  //表格列宽
                                rowhidden:{}, //隐藏行
                                colhidden:{}, //隐藏列
                                borderInfo:{}, //边框
                                authority:{}, //工作表保护
            
                           },
                        }]
                    }
                }
            }
        },

        data() {
            return {
                
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init(){
                var options = {
                    container: 'zzh', //luckysheet为容器id
                    title:'zzh', //表 头名
                    lang: 'zh', //中文
                    column: 10,//列数
                    row:10,//行数
                    showtoolbar:true,//是否显示工具栏
                    showinfobar:false,//是否显示顶部信息栏
                    showsheetbar:false,//是否显示底部sheet按钮
                    allowEdit:true,//是否允许前端编辑
                    myFolderUrl:'https://www.cnblogs.com/javascript9527/',//<左上角的“后退”按钮的链接
                    functionButton:'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">download</button> <button id="" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">share</button> <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">show data</button>',//右上角按钮
                    showGridLines: 1, //是否显示网格线
                    
                    cellRightClickConfig:{//自定义配置单元右键菜单
                        copy: true, // 复制
                        copyAs: true, // 复制为
                        paste: true, // 粘贴
                        insertRow: true, // 插入行insert row
                        insertColumn: true, // 插入列insert column
                        deleteRow: true, // 删除选中行的数据 delete the selected row
                        deleteColumn: true, // 删除选中列的数据delete the selected column
                        deleteCell: false, // delete cell
                        hideRow: true, // hide the selected row and display the selected row
                        hideColumn: true, // hide the selected column and display the selected column
                        rowHeight: true, // 设置行高
                        columnWidth: true, // 设置行宽
                        clear: true, // 清空选定内容clear content
                        matrix: false, //矩阵 matrix operation selection
                        sort: false, // 排序sort selection
                        filter: false, //筛选 filter selection
                        chart: false, //图表生成 chart generation
                        image: false, //插入图片 insert picture
                        link: false, // 插入连接，比如网址之类insert link
                        data: false, //数据校验 data verification
                        cellFormat: false //设置单元格格式，锁定单元格格式，隐藏公示等 Set cell format
                    },
                    data: this.ops.data
                }
                luckysheet.create(options)
            },
            setColumn(){
                luckysheet.setCellValue(2, 5, "test")
              
         
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>

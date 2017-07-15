/*
实现过滤查询的组件
author:du
date：20170413
**/

$(function () {

    // 1.创建一个组件构造器
    var myFilterQuery = Vue.extend({
        // 声明 props
        props: {
         
        },
        template: '<div>'+
                  '<select v-model="value" placeholder="请选择"  @change="changeField(value)" > ' +
                      '<option v-for="(item,index) in fieldlist"  :key="item.value" :label="item.label" :value="item.value" > ' +
                      '</option>' +
                  ' </select>' +
                 '<select v-model="fieldselevalue"  placeholder="请选择"  > ' +
                     '<option v-for="item in fieldvalues"  :key="item.value" :label="item.label" :value="item.value"> ' +
                     '</option>' +
                 ' </select>'+
                 '</div>',

        data: function () {
            return {
                selected: "A",
                fieldlist: [{
                    value: '选项1',
                    label: '黄金膏'
                }, {
                    value: '选项2',
                    label: '双皮'
                }, {
                    value: '选项3',
                    label: '蚵仔'
                }, {
                    value: '选项4',
                    label: '龙须'
                }, {
                    value: '选项5',
                    label: '北京烤'
                }],
                value: '',//字段列表选择时用
              
                //选择不同的子段，列举相应的值
                fieldvalues: [{
                    value: '选项1',
                    label: '黄金'
                }, {
                    value: '选项2',
                    label: '双皮'
                }, {
                    value: '选项3',
                    label: '蚵仔'
                }, {
                    value: '选项4',
                    label: '龙须'
                }, {
                    value: '选项5',
                    label: '北京烤'
                }],
             
                fieldselevalue: ''
            }
        },
        mounted: function () {
            //this.processSelect();
        },

        updated: function () {
        },
        methods: {
            changeField: function (item) {
                var _self = this;
                //var tblName = item//字段名称
                //var str = "[";
                //for (var i = 0, l = this.datalist.length; i < l; i++) {
                //    for (var key in this.datalist[i]) {
                //        if (key == tblName) {
                //            //this.fieldvalues.push("{value:'" + this.datalist[i][tblName] + "',label:'" + this.datalist[i][tblName] + "'}");
                //            str = str + "{value:'" + this.datalist[i][tblName] + "',label:'" + this.datalist[i][tblName] + "'},";
                //        }
                //    }
                //}
                ////this.$set("fieldvalues", eval(str.substring(0, str.length - 1) + "]"));
            
                _self.fieldvalues = eval("[{ value: '选项1', label: '黄金22' }]");
          
                //_self.fieldvalues = eval(str.substring(0, str.length - 1) + "]");
                //alert(str.substring(0, str.length - 1) + "]");
            }
        }


    });

    // 2.注册组件，并指定组件的标签，组件的HTML标签为<my-component>
    Vue.component('my-filterquery', myFilterQuery);


    //Vuejs根实例
    var vm = new Vue({
        el: '#app',
        data: {
            isShow: false,
        },
        methods: {
            toggle: function () {
                this.isShow = !this.isShow;
                $("#myModal").modal();
            }
        },
    });
});
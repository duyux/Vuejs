<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
//引入onMounted是因为地图一定是在页面挂载之后渲染，ref为了定义响应式变量
import { onMounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = defineProps({
  //地图样式，需要实现暗色系，默认值就给成暗色系
  mapStyle: { type: String, default: "amap://styles/darkblue" },
  //地图配置
  apiConfig: {
    type: Object,
    default: () => ({
      version: "2.0",
      key: "60a6fdea7c2c36de7b3a4cf0dda14791",
      plugins: ["AMap.DistrictSearch"],
      securityJsCode: "47d836d8abee2b275dde2c850f63fd76",
    }),
  },
  // 区域名
  areaName: { type: String, default: "西安市" },
  // 显示下级行政区级数,行政区级别包括：国家、省/直辖市、市、区/县4个级别
  subdistrict: { type: Number, default: 0 },
  // 是否返回行政区边界坐标点 all / base
  extensions: { type: String, default: "all" },
  // 搜索范围[对应文档https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.DistrictSearch]
  level: { type: String, default: "city" },
  polylineConfig:{
    type:Object,
    default:() =>({
        //是否显示边界线
        show:true,
        //是否显示边界以外的区域
        showOuter:false,
        //边界线条颜色
        strokeColor:"#99ffff",
        //边界线条粗细
        strokeWeight:4
    })
  },

  //地图是否支持双击鼠标放大
  doubleClickZoom:{type:Boolean,default:true},
  //中心点坐标
  center:{type:Array,default:() =>[108.939677,34.3432]},
  //初始地图缩放等级
  zoom:{type:Number,default:10},
  //地图显示的缩放级别范围
  zooms:{type:Array,default:() =>[3,18]},

  //是否展示卫星地图
  isShowSatellite:{type:Boolean,default:true},
  //是否展示卫星路网
  isShowRoadNet:{type:Boolean,default:true},

  //是否3D显示
  isShow3D:{type:Boolean,default:true},
  //俯视角度
  pitch:{type:Number,default:40},
  //地图方位控制器配置
  controllBarConfig:{
    type:Object,
    default:() => ({
      //是否显示方位控制器
      show:true,
      //是否显示缩放按钮
      showZoomBar:true,
      //是否显示倾斜、缩放按钮
      showControlButton:true,
      //距离顶部的距离
      positionTop:10,
      //距离右侧的距离
      positonRight:10,
    }),
  },
 
  //3d墙体配置
  object3dWallConfig:{
    type:Object,
    default:() => ({
      //是否显示3d墙体
      show:true,
      //层级
      zIndex:1,
      //墙高
      wallHeight:-4000,
      //墙体颜色
      color:'#0088ffcc',
      //是否使用了透明颜色，并进行颜色汇合
      trasparent:true,
      //控制显示正反面，both,front,back
      backOrFront:'both'
    })
  },

  //是否显示预警点位动画
  isShowPointWarning:{type:Boolean,default:true},
  //预警点位集合
  warningList:{
    type:Array,
    default:() =>[[108.777008,34.216845]],
  },
});

const loadAMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: props.apiConfig.securityJsCode,
  };

  AMapLoader.load({
    key: props.apiConfig.key,
    version: props.apiConfig.version,
    plugins: props.apiConfig.plugins, //你所使用的插件
  }).then((AMap) => {
    initMapInstance(AMap);
  });
};

const mapInstance = ref(null);

//新增一个渲染边界的方法
const renderPolyline=(bounds=[]) =>{
    const {polylineConfig}=props;

    if(polylineConfig.show){
        for(let i=0;i<bounds.length;i++){
            new AMap.Polyline({
                path:bounds[i],
                strokeColor:polylineConfig.strokeColor,
                strokeWeight:polylineConfig.strokeWeight,
                map:mapInstance.value
            })
        }
    }
}

//定义一个渲染地图方位控制器
const renderControlBar=() =>{
  const {controllBarConfig}=props;
  if(controllBarConfig.show) {
    mapInstance.value.addControl(
      new AMap.ControlBar({
        showZoomBar:controllBarConfig.showZoomBar,
        showControlButton:controllBarConfig.showControlButton,
        position:{
          right:`${controllBarConfig.positionRight}px`,
          top:`${controllBarConfig.positionTop}px`
        },
      }),
    );
  }
}

//初始化地图
const initMapInstance = (AMap: any) => {
  const options: {
    [key: string]: any;
  } = {
    mapStyle: props.mapStyle,
    doubleClickZoom:props.doubleClickZoom,
    center:props.center,
    zoom:props.zoom,
    zooms:props.zooms,
    //图层，卫星地图，卫星路网都属于图层，push到这个layers就可以了
    layers:[],
    //俯仰角度，默认0,[0,83],2D地图下无效
    pitch:props.pitch,
  };

  //3D显示，地图风格，3D还是2D
  if(props.isShow3D){
    options.viewMode='3D'
  }

  //展示卫星图层
  if(props.isShowSatellite){
    options.layers.push(new AMap.TileLayer.Satellite());
  }

  //展示路网图层
  if(props.isShowRoadNet){
    options.layers.push(new AMap.TileLayer.RoadNet());
  }

  //添加地图方位控制器
  //renderControlBar();



  // 初始化district对象
  const district = new AMap.DistrictSearch({
    level: props.level,
    extensions: props.extensions,
    subdistrict: props.subdistrict,
  });

  // 搜索区域
  district.search(props.areaName, function (status, result) {
    const bounds = result.districtList[0]["boundaries"];


    // 获取区域各坐标
    const mask = [];
    for (let i = 0; i < bounds.length; i += 1) {
      mask.push([bounds[i]]);
    }

    // options中设置mask，超出mask的区域就不显示
    if(!props.polylineConfig.showOuter){
        options.mask=mask;
    }
 

    mapInstance.value = new AMap.Map("map", options);

    //渲染边界
    renderPolyline(bounds);
  });
};

onMounted(() => {
  loadAMap();
});
</script>
<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
.amap-container {
  background-image: unset;
}
</style>

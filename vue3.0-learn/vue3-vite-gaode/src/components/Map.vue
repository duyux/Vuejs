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
  }
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

//初始化地图
const initMapInstance = (AMap: any) => {
  const options: {
    [key: string]: any;
  } = {
    mapStyle: props.mapStyle,
  };

  // 初始化district对象
  const district = new AMap.DistrictSearch({
    level: props.level,
    extensions: props.extensions,
    subdistrict: props.subdistrict,
  });

  // 搜索区域
  district.search(props.areaName, function (status, result) {
    const bounds = result.districtList[0]["boundaries"];

    console.log('bounds',bounds)

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

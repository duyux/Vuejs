import { ref, onMounted, onUnmounted } from "vue";
import { useEventListener } from "./event";
//按照惯例，组合式函数名以use开头
export function useMouse(){
    //被组合式函数封装和管理的状态
    const x=ref(0)
    const y=ref(0)
    
    //使用组合式函数useEventListener来监听鼠标移动事件
    //并更新x和y的值
    useEventListener(window, "mousemove", (event)=>{
        x.value = event.pageX;
        y.value = event.pageY;
    })

    //通过返回值暴露所管理的状态
    return{x,y}
}
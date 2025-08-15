import { onMounted, onUnmounted } from "vue";

export function useEventListener(target,event,callback) {
    onMounted(() => {
        if (target && event && callback) {
            target.addEventListener(event, callback);
        }
    });
    onUnmounted(() => {
        if (target && event && callback) {
            target.removeEventListener(event, callback);
        }
    });


}
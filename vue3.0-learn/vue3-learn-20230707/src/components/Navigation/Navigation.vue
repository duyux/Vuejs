<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const {t}=useI18n()
const menuOptions:MenuOption[]=modulesRoutes.map(route =>({
  label:() =>t(route.meta.title)
}))
</script>


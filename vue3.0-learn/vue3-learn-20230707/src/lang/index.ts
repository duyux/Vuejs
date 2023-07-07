import { createI18n } from "vue-i18n/dist/vue-i18n.js";
import {LANG_VALUE} from '@common/enum'
import zhHans from './zh-Hans'
import en from './en'
import {localCache} from '@/utils'
import useAppStore from "@/stores/app";
import { storeToRefs } from "pinia";

export function getLanguage(){
  const chooseLanguage=localCache.getItem(LANGUAGE)
  if(chooseLanguage) return chooseLanguage

  //如果没有选择语言
  const language=navigator.language.toLowerCase()
  const locales=[LANG_VALUE.En,LANG_VALUE.Zh]
  for(const locale of locales) {
    if(language.indexOf(locale) >-1 ){
      return locale;
    }
  }
  return LANG_VALUE.Zh;
}

const i18n=createI18n({
  legacy:false,
  locale:getLanguage(),
  messages:{
    [LANG_VALUE.zh]:zhHans,
    [LANG_VALUE.En]:en
  }
})

export function setLocale(lang:langType){
  //获取当前语言
  const appStore=useAppStore()
  const {language}=storeToRefs(appStore)

  i18n.global.locale.value=lang //修改i18n
  language.value=lang //修改pinia
  localCache.setItem(LANGUAGE,lang) //修改缓存
}

export default i18n


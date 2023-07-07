import {defineStore} from 'pinia'
import {zhCN,dateZhCN} from 'naive-ui'
import { LANG_VALUE } from '@/common/enum'
import { getLanguage } from '@/lang'

interface IAppState{
  language:string,
}

const useAppStore=defineStore('app',{
  state:(): IAppState =>({
     language:getLanguage(),
  }),
  getters:{
    locale:(state) =>  {
      switch(state.language){
        case LANG_VALUE.En:
          return null
        case LANG_VALUE.Zh:
          return zhCN
        default:
          break;
      }
    },
    dateLocale:(state) =>  {
      switch(state.language){
        case LANG_VALUE.En:
          return null
        case LANG_VALUE.Zh:
          return dateZhCN
        default:
          break;
      }
    },

  }
})

export default useAppStore

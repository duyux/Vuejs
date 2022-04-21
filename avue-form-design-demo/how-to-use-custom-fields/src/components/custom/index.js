import Timeline from './timeline.vue'

const components = [
  Timeline,
]

const CustomFields = {
  install (Vue) {
    if (this.installed) return
    this.installed = true

    components.map(component => {
      Vue.component(component.name, component);
    })
  }
}

export default CustomFields

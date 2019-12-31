import SimpleFileInput from './SimpleFileInput.vue'

function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('SimpleFileInput', SimpleFileInput)
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

SimpleFileInput.install = install

export default SimpleFileInput

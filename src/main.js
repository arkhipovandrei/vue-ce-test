import { defineCustomElement } from 'vue'
import MybidFromWithStyles from './components/MybidFrom.ce.vue'

export const MybidFrom = defineCustomElement(MybidFromWithStyles)

customElements.define('mybid-from', MybidFrom)

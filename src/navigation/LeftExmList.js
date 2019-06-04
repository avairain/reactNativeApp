import * as Activity from '../components/LeftExmList/'
import * as AntDButton from '../components/antDesign'

console.log(Activity)

const RouterOptions = { ...Activity, ...AntDButton }

delete RouterOptions.DrawerLayout

export default {
  ...RouterOptions
}
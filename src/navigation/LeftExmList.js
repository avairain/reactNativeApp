import * as Activity from '../components/LeftExmList/'
import * as AntDButton from '../components/antDesign'

console.log(Activity)

const RouterOptions = { ...Activity, ...AntDButton, Rn: Activity.default, AntD: AntDButton.default }

delete RouterOptions.DrawerLayout
delete RouterOptions.default

export default {
  ...RouterOptions
}
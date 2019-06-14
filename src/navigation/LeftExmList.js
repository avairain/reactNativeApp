import * as Activity from '../components/LeftExmList/'
import * as RnApi from '../components/LeftExmList/api'
import * as AntDButton from '../components/antDesign'

const RouterOptions = { ...Activity, ...AntDButton, ...RnApi, Rn: Activity.default, AntD: AntDButton.default, RnApi: RnApi.default }

delete RouterOptions.DrawerLayout
delete RouterOptions.default

export default {
  ...RouterOptions
}
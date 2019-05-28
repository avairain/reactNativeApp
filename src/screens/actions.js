import { combineReducers } from 'redux'

import _home, * as $Home from './HomeScreenRedux'
import _Link, * as $link from './LinksScreenRedux'
import _Setting, * as $setting from './SettingsScreenRedux'

export default combineReducers({
  homeState: _home,
  linkState: _Link,
  settingState: _Setting,
});

/**
 * state
 *  root 是 ./redux/reducers 中默认导出的对象 是 configureStore 中使用的最终的 reducer
 *  一级键名 是 ./redux/reducers 中默认导出的对象包含的 键名
 *  二级键名 是 reducer 集合默认导出时 对应的键名 即本文件中的 default
 *  上面是整个 state 的结构
 * 在使用 connect 组件中
 * state存在于 props 中
 * 当 connect(mapStateToProps, mapDispatchToProps) 中
 *  mapStateToProps 方法接受全部的 state 返回的对象是映射在 props 中的值
 *  mapDispatchToProps 方法接受 dispatch 返回的对象是映射在 props 中的值
 * 
 * 如字面意思
 * redux 主要是管理 state component 的 state
 */

export const homeActions = $Home
export const linkActions = $link
export const settingActions = $setting
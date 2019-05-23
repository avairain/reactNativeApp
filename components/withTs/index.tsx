import React, {ReactNode, Props, Component} from 'react'
import { Text } from 'react-native'

type X = Props<{}>
interface A {
  render: (props: X) => ReactNode
}
export default function (props: X): ReactNode {
  return (
    <Text>tasds</Text>
  )
}

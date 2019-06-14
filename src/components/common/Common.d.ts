import React, {ReactNode, Props, Component} from 'react'

interface WithMessage {
  message: (s: string, t?: number) => void
}

export const Toast: WithMessage

declare interface HOC extends Component {}

declare const Common: () => (WrappedComponent: HOC) => HOC

export default Common

export class OwnAnimated extends Component {}
export class GetPA extends Component {}

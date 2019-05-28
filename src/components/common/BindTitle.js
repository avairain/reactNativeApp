import { Component } from "react";

export default title => WrappedComponent => class extends Component {
  static navigationOptions = {
    title
  }
  render() {
    return <WrappedComponent/>
  }
}

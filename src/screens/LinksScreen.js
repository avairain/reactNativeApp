import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ExmList from '../assets/constants/LeftExmList'
// import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
        {this.mapList()}
      </ScrollView>
    );
  }

  mapList() {
    return ExmList.map(v => <Text onPress={() => this.goTo(v)} key={v} style={styles.listStyle}>{v}</Text>)
  }

  goTo(v) {
    this.props.navigation.push(v)
    // this.nextTick(() => {
      // console.log(this.props.navigation)
    // })
    // props.navigation.navigate
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  listStyle: {
    marginLeft: '10%',
    marginTop: '10%',
  }
});
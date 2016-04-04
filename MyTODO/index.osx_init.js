const MyTODO = React.createClass({
  componentWillMount() {
    vyom_main(this);
  },
  render() {
    return vyom_render()
            // return <View style={styles.container}>
            //     <Text style={styles.welcome}>
            //         Welcome to React Native Desktop!
            //     </Text>
            // </View>
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyTODO', () => MyTODO);

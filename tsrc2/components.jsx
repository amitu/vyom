import React from 'react-native-desktop';
const {
    Text,
    View,
    AppRegistry,
    StyleSheet
} = React;


const MyTODOView = React.createClass({
    getInitialState() {
        return {"name": "foo"};
    },
    componentWillMount() {
        console.log("MyTODOView.componentWillMount", this.props, this.state);
        this.props.ctrlr.robj = this;
    },
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.name}, Welcome to React Native Desktop!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.osx.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Or use Developer Menu
                </Text>
            </View>
        );
    }
});


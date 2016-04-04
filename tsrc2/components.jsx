import React from 'react-native-desktop';
const {
    Text,
    View,
    AppRegistry,
    StyleSheet
} = React;


function createClass(cls) {
    cls.componentWillMount = function() {
        this.props.parent.robj = this;
        if (this.props.state)
            this.setState(this.props.state);
    }

    return React.createClass(cls);
}

const MyTODOView = createClass({
    getInitialState() {
        return {"name": "foo"};
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


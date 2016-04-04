import React from 'react-native-desktop';
const {
    Text,
    View,
    AppRegistry,
    TouchableHighlight,
    StyleSheet
} = React;


function createClass(cls) {
    if (!cls.componentWillMount) {
        cls.componentWillMount = function() {
            this.props.parent.robj = this;
            if (this.props.state)
                this.setState(this.props.state);
        }
    }

    if (!cls.getInitialState) {
        cls.getInitialState = function() {
            return {};
        }
    }

    return React.createClass(cls);
}

const MyTODOView = createClass({
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.props.save}>
                    <Text style={styles.welcome}>
                        {this.state.name}, Welcome to React Native Desktop!
                    </Text>
                </TouchableHighlight>
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


import React from 'react-native-desktop';
const {
    Text,
    View,
    AppRegistry,
    StyleSheet
} = React;


const MyTODOView = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native Desktop!
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


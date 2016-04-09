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
            if (this.props.state)
                this.setState(this.props.state);
        }
    }

    if (!cls.componentDidMount) {
        cls.componentDidMount = function() {
            console.log("componentDidMount", this.props.init, this.props)
            if (this.props.init)
                this.props.init(this);
        }
    }

    if (!cls.getInitialState) {
        cls.getInitialState = function() {
            return {};
        }
    }

    return React.createClass(cls);
}

const LRView = createClass({
    render() {
        return (
            <View>
                <Text>Left:</Text> 
                <View>{this.state.left}</View>
                <Text>Right:</Text>
                <View>{this.state.right}</View>
            </View>
        );
    }
});

const MyTODOListView = createClass({
    render() {
        console.log("MyTODOListView.render", this);
        var self = this;
        var items = this.state.items.map(function(item, i){
            function pressed(evt) {
                console.log(evt, item, i);
                self.props.select(i, item, evt);
            }
            return <TouchableHighlight onPress={pressed} key={i}>
                <Text>{item}</Text>
            </TouchableHighlight>
        })

        return (
            <View>
                <Text>List</Text>
                {items}
            </View>
        )
    }
})

const MyTODODetailView = createClass({
    render() {
        return <View><Text>Detail:</Text><Text>{this.state.item}</Text></View>
    }
})
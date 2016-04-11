function createClass(cls) {
    if (!cls.componentWillMount) {
        cls.componentWillMount = function() {
            if (this.props.state)
                this.setState(this.props.state);
        }
    } else {
        var will = cls.componentWillMount;
        cls.componentWillMount = function() {
            if (this.props.state)
                this.setState(this.props.state);
            will();
        }
    }

    if (!cls.componentDidMount) {
        cls.componentDidMount = function() {
            if (this.props.init)
                this.props.init(this);
        }
    } else {
        var did = cls.componentDidMount;
        cls.componentDidMount = function() {
            if (this.props.init)
                this.props.init(this);
            did.call(this);
        }
    }

    if (!cls.getInitialState) {
        cls.getInitialState = function() {
            return {};
        }
    }

    return React.createClass(cls);
}


HeaderView = createClass({
    componentDidMount: function(){
        ReactDOM.findDOMNode(this.refs.inp).focus();
    },
    onKey: function(e) {
        if (e.key === 'Enter') {
            this.props.input(e.target.value);
            e.target.value = '';
        }
    },
    render: function() {
        return <div>
            <h1>todos</h1>
            <input className="new-todo" ref="inp" onKeyPress={this.onKey} placeholder="What needs to be done?" />
        </div>
    }
})

MainView = createClass({
    render: function() {
        return <div>
            <input className="toggle-all" id="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list"></ul>
        </div>
    }
})

FooterView = createClass({
    item_or_items: function() {
        if (this.state.remaining === 1)
            return 'item';
        return 'items';
    },
    render: function() {
        return <div>
            <span className="todo-count">
                <strong>{this.state.remaining}</strong> {this.item_or_items()} left
            </span>
            <ul className="filters">
                <li>
                    <a className="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
        </div>
    }
})
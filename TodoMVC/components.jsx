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
            <input className="new-todo" ref="inp"
                onKeyPress={this.onKey} placeholder="What needs to be done?" />
        </div>
    }
})

MainView = createClass({
    shouldBeChecked: function() {
        // if all tasks are done, then this should be checked
        for (i = 0; i < this.state.todos.length; i++) {
            if (!this.state.todos[i].done)
                return ""
        }
        return "checked"
    },
    render: function() {
        var self = this;
        var items = this.state.todos.filter(function(item){
            if (this.state.filter == "all") {
                return true
            }
            if (this.state.filter == "completed") {
                return item.done;
            }
            if (this.state.filter == "active") {
                return !item.done;
            }
            return false;
        }, this).map(function(item, i){
            var checkit = function(evt) {
                self.props.toggle(i, evt.target.checked);
            }
            var deleteit = function(evt) {
                self.props.deleteit(i);
            }

            var className = "";
            var checked = ""
            if (item.done) {
                className = "completed";
                checked = "checked";
            }

            return <li key={item.text + item.i} className={className}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={checked} onChange={checkit} />
                    <label>{item.text}</label>
                    <button className="destroy" onClick={deleteit}></button>
                </div>
            </li>
        }, this);

        return <div>
            <input className="toggle-all" id="toggle-all" checked={this.shouldBeChecked()}
                type="checkbox" onChange={this.props.toggle_all} />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">{items}</ul>
        </div>
    }
})

FooterView = createClass({
    item_or_items: function() {
        if (this.state.remaining === 1)
            return 'item';
        return 'items';
    },
    getRemaining: function() {
        var count = 0;
        for (i = 0; i < this.state.todos.length; i++) {
            if (!this.state.todos[i].done)
                count += 1;
        }
        this.state.remaining = count;
        return count;
    },
    render: function() {
        var remaining = this.getRemaining();
        var all_selected = this.state.filter == "all" ? "selected" : "";
        var active_selected = this.state.filter == "active" ? "selected" : "";
        var completed_selected = this.state.filter == "completed" ? "selected" : "";

        return <div>
            <span className="todo-count">
                <strong>{remaining}</strong> {this.item_or_items()} left
            </span>
            <ul className="filters">
                <li>
                    <a className={all_selected} href="#/" onClick={this.props.filter_all}>All</a>
                </li>
                <li>
                    <a className={active_selected} href="#/active" onClick={this.props.filter_active}>Active</a>
                </li>
                <li>
                    <a className={completed_selected} href="#/completed" onClick={this.props.filter_completed}>Completed</a>
                </li>
            </ul>
            <button className="clear-completed"
                onClick={this.props.clear_completed}>Clear completed</button>
        </div>
    }
})
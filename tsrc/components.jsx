var ProgressView = React.createClass({
	displayName: "ProgressView",
	getInitialState: function () {
		return {"current": 0, "total": 1}
	},
	render: function() {
		return <span>
			Progress: <span onMouseOver={this.props.hover}>{this.state.current}</span>/{this.state.total}.
		</span>
	}
});

var RecordView = React.createClass({
	displayName: "RecordView",
	getInitialState: function () {
		return {
            "deleting": false, "deleted": false,
            "editing": false, "saving": false, "saved": false
        }
	},
    cancelEdit: function(evt) {
        this.setState({"editing": false})
        evt.preventDefault()
    },
    doEdit: function(evt) {
        this.setState({"editing": true})
        evt.preventDefault()
    },
	render: function() {
        if (this.state.saved) {
            return <div>
                <p>saved {this.state.index}: {this.state.line}</p>
            </div>
        }
        if (this.state.saving) {
            return <div>
                <p>saving {this.state.index}...</p>
            </div>
        }
        if (this.state.deleting) {
            return <div>
                <p>deleting {this.state.index}...</p>
            </div>
        }
        if (this.state.deleted) {
            return <div>
                <p>deleted {this.state.index}</p>
            </div>
        }
        if (this.state.editing) {
            return <div>
                <p>Editing {this.state.index}: {this.state.line}</p>
                <a href="#" onClick={this.props.save}>Save</a>
                <a href="#" onClick={this.cancelEdit}>Cancel</a>
            </div>
        }
		return <div>
            <a href="#" onClick={this.props.delete}>Delete</a>
            <a href="#" onClick={this.doEdit}>Edit</a>
            <p>{this.state.index}: {this.state.line}</p>
		</div>
	}
});


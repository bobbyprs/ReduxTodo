import React from "react";
import { connect } from "react-redux";
class TodosList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      description: "",
      date: ""
    };
  }

  checkbox = (index) => {
    console.log(index, " index ");
    let checkItem = this.props.workList[index];
    checkItem = { ...checkItem, checkboxstatus: !checkItem.checkboxstatus };
    this.props.editItem({ index: index, edit: checkItem });
    console.log(this.props.workList);
  };

  addItem = () => {
    const todo = {
      task: this.state.task,
      description: this.state.description,
      date: this.state.date,
      checkboxstatus: false
    };
    this.props.addItem(todo);
  };

  render() {
    console.log(this.props, "props");
    const { task, description, date } = this.state;
    return (
      <div className="mainBox">
        <input
          className="task"
          type="text"
          value={task}
          placeholder="Enter Title of Task"
          onChange={(event) => {
            this.setState({ task: event.target.value });
          }}
        />{" "}
        <br />
        <br />
        <input
          className="description"
          type="text"
          value={description}
          placeholder="Enter description of Task"
          onChange={(evt) => {
            this.setState({ description: evt.target.value });
          }}
        />{" "}
        <br />
        <br />
        <input
          className="datum"
          type="date"
          value={date}
          onChange={(e) => {
            this.setState({ date: e.target.value });
          }}
        />{" "}
        <br />
        <br />
        <input
          className="btn"
          type="button"
          value="Add Todo's"
          onClick={() => {
            this.addItem();
          }}
        ></input>
        <ul>
          {this.props.workList.map((item, index) => (
            <li className="todos" key={index}>
              <div
                className={new Date(item.date) < new Date() ? "colorMe" : ""}
              >
                <input
                  type="checkbox"
                  onClick={() => {
                    this.checkbox(index);
                  }}
                />{" "}
                &nbsp;&nbsp;&nbsp;
                <span
                  className={item.checkboxstatus ? "strikethrough" : ""}
                >{`${item.task} - ${item.description} to be completed by ${item.date}`}</span>
                &nbsp;&nbsp;
                {new Date(item.date) < new Date() ? (
                  <h4>Due date is passed</h4>
                ) : (
                  <></>
                )}
                <button
                  className="delete"
                  onClick={() => {
                    this.props.deleteItem(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    workList: state.workList
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addItem: (val) => dispatch({ type: "ADD_ITEM", payload: val }),
    deleteItem: (val) => dispatch({ type: "DELETE_ITEM", payload: val }),
    editItem: (val) => dispatch({ type: "EDIT_ITEM", payload: val })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosList);

 import React from "react";
import { connect } from "react-redux";
class VisibilityFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterValue: "",
      filterArray: []
    };
  }
  setFilterArray = (filter) => {
    switch (filter) {
      case "completed":
        {
          let arr = this.props.workList.filter((item) => {
            if (item.checkboxstatus) {
              return true;
            } else {
              return false;
            }
          });
          this.setState({ filterArray: arr });
          console.log(arr, "arr");
        }
        break;
      case "incompleted":
        {
          let arr = this.props.workList.filter((item) => {
            if (!item.checkboxstatus) {
              return true;
            } else {
              return false;
            }
          });
          this.setState({ filterArray: arr });
          console.log(arr, "incom");
        }
        break;
      default: {
        this.setState({ filterArray: this.props.workList });
        console.log(this.props.workList, "todo");
      }
    }
  };

  checkbox = (index) => {
    console.log(index, " index ");
    let checkItem = this.props.workList[index];
    checkItem = { ...checkItem, checkboxstatus: !checkItem.checkboxstatus };
    this.props.editItem({ index: index, edit: checkItem });
    console.log(this.props.workList);
  };

  applyFilter = () => {
    return (
      <ul>
        {this.state.filterArray.map((item, index) => (
          <li key={index}>
            <div className={new Date(item.date) < new Date() ? "colorMe" : ""}>
              <input
                type="checkbox"
                onClick={() => {
                  this.checkbox(index);
                }}
              />
              <span
                className={item.checkboxstatus ? "strikethrough" : ""}
              >{`${item.task}- ${item.description} to be completed by ${item.date}`}</span>
              {new Date(item.date) < new Date() ? (
                <h4>Due date is passed</h4>
              ) : (
                <></>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    console.log(this.state, "state");
    return (
      <div className="mainBox">
        <select
          className="select"
          onChange={(event) => {
            this.setState({ enterValue: event.target.value });
          }}
        >
          <option value="Select Filter">Select Filter</option>

          <option
            value="all"
            onSelect={() => {
              this.setFilterArray("all");
            }}
          >
            ALL
          </option>
          <option
            value="completed"
            onSelect={() => {
              this.setFilterArray("completed");
            }}
          >
            COMPLETED
          </option>
          <option
            value="incompleted"
            onSelect={() => {
              this.setFilterArray("incompleted");
            }}
          >
            INCOMPLETE
          </option>
        </select>{" "}
        &nbsp; &nbsp; &nbsp;
        <button
          className="filterAdd"
          onClick={() => {
            this.setFilterArray(this.state.enterValue);
          }}
        >
          apply filter
        </button>
        <ul>
          {this.state.filterArray.map((item, index) => (
            <li className="fill" key={index}>
              <div
                className={new Date(item.date) < new Date() ? "colorMe" : ""}
              >
                <input
                  type="checkbox"
                  onClick={() => {
                    this.checkbox(index);
                  }}
                />
                <span
                  className={item.checkboxstatus ? "strikethrough" : ""}
                >{`${item.task}- ${item.description} to be completed by ${item.date}`}</span>
                {new Date(item.date) < new Date() ? (
                  <h4>Due date is passed</h4>
                ) : (
                  <></>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityFilter);

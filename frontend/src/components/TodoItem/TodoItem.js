import React from "react";

import Acordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AcordionActions from "@material-ui/core/AccordionActions";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const origin = "localhost:3001";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      description: "",
      done: false,
      category_id: null,
      created_at: "",
      updated_at: "",
    };
    this.handleFormClick = this.handleFormClick.bind(this);
  }

  componentDidMount() {
    this.setState((state) => this.props.todo);
  }

  handleFormClick(e) {
    this.setState((state) => ({
      done: !state.done,
    }));
    e.stopPropagation();
    this.updateTodoRecordApi();
  }

  updateTodoRecordApi() {
    const category_id = this.state.category_id;
    const todo_id = this.state.id;
    const patch_api_url = `http://${origin}/api/v1/categories/${category_id}/todos/${todo_id}`;
    const data = { todo: this.state };

    fetch(patch_api_url, {
      method: "PUT",
      mode: "cors",
      body: data,
    });
  }

  render() {
    const todo = this.props.todo;
    const done = this.state.done;

    return (
      <div>
        <Acordion square={true}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <FormControlLabel
              onClick={(e) => this.handleFormClick(e)}
              // onFocus={(event) => event.stopPropagation()}
              control={<Checkbox checked={done} />}
              label={<Typography variant="subtitle1">{todo.title}</Typography>}
            />
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="subtitle2">{todo.description}</Typography>
            </div>
          </AccordionDetails>
          <Divider />
        </Acordion>
      </div>
    );
  }
}

export default TodoItem;
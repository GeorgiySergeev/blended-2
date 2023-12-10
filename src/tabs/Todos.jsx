import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidUpdate(_, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }
  componentDidMount() {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    if (localTodos) {
      this.setState({ todos: localTodos });
    }
  }

  onFormSubmit = text => {
    this.setState(prevState => {
      return {
        todos: [...prevState.todos, { text, id: nanoid() }],
      };
    });
  };

  onDeliteToDo = id => {
    this.setState(prevState => {
      return { todos: prevState.todos.filter(todo => todo.id !== id) };
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        <Grid>
          {todos.map(({ text, id }, idx) => {
            return (
              <GridItem key={id}>
                <Todo
                  id={id}
                  onDelite={this.onDeliteToDo}
                  text={text}
                  count={idx + 1}
                />
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}

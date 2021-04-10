// import logo from './logo.svg
import React, { Fragment } from 'react'
import './App.css';

// Components
import InputTodo from './components/Todo/InputTodo'
import ListTodo from './components/Todo/ListTodo'

// OnProgress
import OnProgress from './components/OnProgress/OnProgress';
// Done
import Done from './components/Done/Done';

function App() {
  return (
    <Fragment>
      <div className="container">

        <h1 className="text-center mt-5">Progress Bar App</h1>
        <div className="row">
          <div className="col-md-4">
            <InputTodo />
            <ListTodo />
          </div>
          <div className="col-md-4">
            <OnProgress />
          </div>

          <div className="col-md-4">
            <Done />
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default App;

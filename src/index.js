import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AsyncSelect from 'react-select/lib/Async';
import axios from 'axios';
import { Button } from 'reactstrap';
import _ from 'lodash';

import './styles.css';

class App extends Component {
  state = {
    users: [],
    invitedUsers: [],
    loading: true
  };

  componentDidMount() {
    this.setState({
      invitedUsers: [],
      loading: false
    });
  }

  filterUsers = inputValue => {
    if (inputValue) {
      return this.state.users.filter(
        i =>
          i.name.first.toLowerCase().includes(inputValue.toLowerCase()) ||
          i.name.last.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return this.state.users;
  };

  loadOptions = _.debounce(
    (inputValue, callback) => {
      axios
        .get(`https://randomuser.me/api/?results=500&seed=sameresplease`)
        .then(response => {
          this.setState(
            {
              users: response.data.results
            },
            () => {
              callback(this.filterUsers(inputValue));
            }
          );
        })
        .catch(error => {
          console.log('error', error);
        })
        .then(() => {
          // always runs
        });
    },
    500,
    { leading: false, trailing: true }
  );

  onChange = (selectedOption, meta) => {
    this.setState({
      invitedUsers: selectedOption
    });
  };

  showUsers = () => {
    console.table(this.state.invitedUsers);
  };

  handleInputChange = inputValue => {
    return inputValue;
  };

  render() {
    if (this.state.loading) {
      return <div>loding...</div>;
    }

    return (
      <div className="App">
        <AsyncSelect
          isMulti
          getOptionValue={opt => opt.id.value}
          getOptionLabel={opt => `${opt.name.first} ${opt.name.last}`}
          defaultValue={this.state.invitedUsers}
          loadOptions={this.loadOptions}
          onChange={this.onChange}
          placeholder="Search for a user"
          noOptionMessage={() => 'Start typing to find a user...'}
        />
        <br />
        <Button color="Success" onClick={this.showUsers}>
          Show Users
        </Button>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

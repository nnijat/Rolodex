import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.state = {
      peopleList: [],
      itemsToShow: 2,
      expanded: false
    }

    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    this.state.itemsToShow === 2 ? (
      this.setState({ itemsToShow: this.state.peopleList.length, expanded: true })
    ) : (
        this.setState({ itemsToShow: 2, expanded: false })
      )
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('https://randomuser.me/api/?results=25')
      .then(response => response.json())
      .then(data => data.results.map(user =>
        (
          {
            name: `${user.name.first} ${user.name.last}`,
            image: `${user.picture.thumbnail}`,
            age: `${user.dob.age}`,
            email: `${user.email}`,
          })
      ))
      .then(peopleList => this.setState({
        peopleList
      }))
      .catch(error => console.log("There as an error", error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h1>People List</h1>
            <ul>
              {this.state.peopleList.slice(0, this.state.itemsToShow).map((person, i) =>
                <li key={i}>{person.name}
                  <img src={person.image} alt={person.name} />
                  <button className="btn btn-primary" onClick={this.showMore}>
                    {this.state.expanded ? (
                      <span>Hide Details</span>
                    ) : (
                        <span>Show Details</span>
                      )
                    }
                  </button>
                </li>
              )}
            </ul>
          </div>
        </header>
      </div>
    );
  }
}


export default App;
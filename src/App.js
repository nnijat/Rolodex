import React, { Component } from 'react';
import './App.css';

function UserCard(props) {

  const cStyle = {
    listStyleType: "none"
  }

  let emailInfo = (
    <li style={cStyle}>{"Emial: " + props.user.email}</li>
  );
  let gender = (
    <li style={cStyle}>{"Gender: " + props.user.gender}</li>
  );
  let age = (
    <li style={cStyle}>{"Age: " + props.user.dob.age + " years old"}</li>
  );
  let phone = (
    <li style={cStyle}>{props.user.phone}</li>
  );
  let location = (
    <li style={cStyle}>{"From: " + props.user.location.street + ", " + props.user.location.city}</li>
  );

  let buttonText
  if (props.isHidden) {
    buttonText = "Show Details";
  } else {
    buttonText = "Hide Details";
  }

  return (
    <div style={{ marginBottom: '40px' }}>
      <img src={props.user.picture.large} alt="smile-face"></img>
      <div>
        <span>{props.user.name.first}</span>
        {' '}
        <span>{props.user.name.last}</span>
      </div>
      <ul>
        {props.isHidden[props.index] === true ? null : emailInfo}
        {props.isHidden[props.index] === true ? null : gender}
        {props.isHidden[props.index] === true ? null : age}
        {props.isHidden[props.index] === true ? null : phone}
        {props.isHidden[props.index] === true ? null : location}
      </ul>
      <button onClick={() => props.handleClick(props.index)}>{buttonText}</button>
    </div>
  );
}

class App extends Component {

  state = {
    results: [],
    isHidden: [],
  };


  componentDidMount() {
    const arr = []
    fetch('https://randomuser.me/api?results=25')
      .then(response => response.json())
      .then(json => {
        json.results.map(() => {
          arr.push(true)
        })
        this.setState({
          results: json.results,
          isHidden: arr,
        })
      })
  }

  handleClick = (index) => {
    const newArr = this.state.isHidden.map((item, newIndex) => {
      if (newIndex === index) {
        if (item === true) {
          return false;
        } else {
          return true;
        }
      } else {
        return item;
      }
    })

    this.setState({
      isHidden: newArr,
    })
  }


  render() {
    return (
      <div className="App">
        {this.state.results.map((user, index) =>
          <UserCard
            key={index}
            index={index}
            user={user}
            handleClick={this.handleClick}
            isHidden={this.state.isHidden} />
        )}
      </div>
    );
  }
}

export default App;
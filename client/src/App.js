import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rides from './components/Rides';
import InputBar from './components/InputBar';
//import RideModal from './components/RideModal';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      filter: false,
      date: new Date(),
      college: "UNC Chapel Hill"
    }
  }

  /*updateSearch = (c,d) => {
    this.setState({college: c});
    this.setState({date: d});
    this.filterList();
  }*/

  filterList = (c,d) => {
    this.setState({
      filter: true,
      college: c,
      date: d
    });
      
    console.log("FILTER!");
    console.log(this.state.filter);
    console.log("college: " + this.state.college);
    console.log("date: " + this.state.date);
  }

  resetList = () => {
    this.setState({filter: false});
    /*console.log("RESET!");
    console.log(this.state.filter);*/
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pool Party</h1>
          <InputBar filterList={this.filterList} resetList={this.resetList} updateSearch={this.updateSearch}/>
        </header>
        <Rides filterValue={this.state.filter} dateValue={this.state.date} collegeValue={this.state.college} className="mt-3"/>
      </div>
    );
  }
}

export default App;

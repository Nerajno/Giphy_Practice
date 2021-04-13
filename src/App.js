import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: []
    };
  }

  componentDidMount(){
    this.searchFunction()
  }

  searchFunction = (query = 'cars') => {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=FXWIJruwrAYhGbD9QE8eeUEwSsFSZyQO&q=${query}&limit=25&offset=0&rating=g&lang=en`)
    .then( response => {
      this.setState({
        gifs: response.data.data,
        loading: false
      });
    })
    .catch( error => {
      console.log("Error fetching and parsing data",error);
    });
  }


    // componentDidMount() {
    //   axios.get('https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    //   .then( response => {
    //     this.setState({
    //       gifs: response.data.data
    //     });
    //   })
    //   .catch( error => {
    //     console.log("Error fetching and parsing data",error);
    //   });
    // }

  


  render() { 
      console.log(this.state);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.searchFunction} />      
          </div>   
        </div>    
        <div className="main-content">
          {
           (this.state.loading)
          ? <p> Loading ...</p>
          :<GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}

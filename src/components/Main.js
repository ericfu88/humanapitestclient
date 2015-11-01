require('normalize.css');
require('styles/App.css');
require('fetch');
var ActititySummary = require('./ActivitySummary');

var network = require('../utils/network');

import {Input, ButtonInput} from 'react-bootstrap';
import React from 'react';
var HumanApi = require('./HumanApi');

var AppComponent = React.createClass({
  getInitialState: function() {
    return {email: '',
            activityData: null};
  },
  onEmailChange: function(event) {
    this.setState({email: event.target.value});
  },
  getData: function(userId, callback) {
    fetch(network.serverUrl + '/getData', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userId
      })
    })
    .then(network.checkError)
    .then(network.parseJson)
    .then(function(responseData){
      callback(responseData);
    });
  },
  onActivityData: function(activityData) {
    console.log("Activity Data");
    console.log(activityData);
    this.setState({activityData: activityData});
  },
  onNextButton: function(e) {
    var self = this;
     e.preventDefault();
     fetch(network.serverUrl + '/findUser', {
       method: 'post',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         email: self.state.email
       })
    })
    .then(network.checkError)
    .then(network.parseJson)
    .then(function(responseData){
      var publicToken = responseData.publicToken || '';
      if (! publicToken) {
        self.refs.humanapi.handleClick(self.state.email, publicToken, function(response) {
          self.getData(self.state.email, self.onActivityData);
        });
      } else {
        self.getData(self.state.email, self.onActivityData);
      }
    });
  },
  render: function() {
    return (
      <div>
        <form className='main-form'>
          <span>Your Email Address</span>
          <Input type="email" standalone={true}
            label=""
            placeholder="abc@example.com"
            help=""
            hasFeedback
            ref="input"
            groupClassName="group-class"
            labelClassName="label-class"
            onChange={this.onEmailChange}/>
          <ButtonInput type="submit"
            value="Next" bsStyle="primary"
            onClick={this.onNextButton}/>
        </form>
        <ActititySummary data={this.state.activityData} />
        <HumanApi ref='humanapi'/>
      </div>
    );
  },

});

AppComponent.defaultProps = {
};

export default AppComponent;

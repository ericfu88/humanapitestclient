require('normalize.css');
require('styles/App.css');
require('fetch');
import React from 'react';
var networkUtil = require('../utils/network');

var HUMANAPI_APP_CLIENT_ID = '839a06d67943bbdcafcd2d0c13625356c135ad05';

var HumanApi = React.createClass({
  handleClick: function(userId, publicToken, callback) {
    var options = {
      clientUserId: encodeURIComponent(userId), // identifying the user, e.g. email
      clientId: HUMANAPI_APP_CLIENT_ID, // found in Developer Portal
      publicToken: publicToken,  // Leave blank for new users
      finish: function(err, sessionTokenObject) {
        // callback that would be called after user finishes
        // connecting data.
        console.log("Got sessionTokenObject from humanapi");
        console.log(sessionTokenObject);

        // you need to post `sessionTokenObject` to your server
        // append `clientSecret` to it and send it to our server.
        // sending POST request with jQuery might look like this.
        // NOTE: it's not necessary to use jQuery
        fetch(networkUtil.serverUrl + '/connect', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sessionTokenObject)
        })
        .then(networkUtil.checkError)
        .then(networkUtil.parseJson)
        .then(function(responseData){
          // handle server response here
          console.log("our server response:");
          console.log(responseData);
          callback(responseData);
        });
      },
      close: function() {
        // optional callback that will be called if the user
        // closes the popup without connecting any data sources.
      },
      error: function(err) {
        // optional callback that will be called if an error occurs while
        // loading the popup.
        // `err` is an object with the fields: `code`, `message`, `detailedMessage`
      }
    };
    HumanConnect.open(options);
  },

  /*
  <a onClick={this.handleClick}>
    <img id='connect-health-data-btn'
      src='https://connect.humanapi.co/assets/button/blue.png'/>
  </a>
  */
  render: function() {
    return (
      <div></div>
    );
  }
});
export default HumanApi;

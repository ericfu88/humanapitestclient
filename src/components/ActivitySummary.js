/*
calories: 1984.909
date: "2015-06-30"
distance: 16
duration: 0
id: "5635348385b9250700c61968"
light: 0
moderate: 0
sedentary: 0
source: "misfit"
steps: 28
total: 0
vigorous: 0
*/
require('normalize.css');
require('styles/App.css');

require('normalize.css');
require('styles/App.css');
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

var ActivitySummary = React.createClass({
  render: function() {
    if (this.props.data === null) {
      return (<div></div>);
    } else {
      var data = this.props.data.activitySummary;
      var dataKeys = Object.keys(data);
      console.log(dataKeys);
      return (
        <div>
          <Grid>
            {
              dataKeys.map(function(key) {
                return (
                  <Row key={key}>
                    <Col xs={2} className='data-label'>{key}</Col>
                    <Col xs={8}>{data[key]}</Col>
                  </Row>
                );
              })
            }

          </Grid>
        </div>
      );
    }
  }
});

export default ActivitySummary;

import React, { Component } from 'react';
import axios from 'axios';

import Question from './question';
import Answers from './answers';
import Menu from './Menu';

// import style
import '../App/css/style.css';

import {List,ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Admin extends Component {
  constructor(props) {
  super(props)
    this.state = {
      api: 'http://server:3001/api/admin',
      data: [],
      cquestion: 0,
      cplayer: ''
    };
    this.countItems = this.countItems.bind(this);
  };

  componentDidMount() {
    axios.get('http://server:3001/api/admin/all')
    .then(res => {
      this.setState({ data: res.data });
      // console.log(res.data)
    })
    .catch(err => {
      console.error(err);
    });
  }

  countItems(input) {
    var arr = input
    var counts = [];
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
    return counts;
  }

  PlayerClick(question, player) {
    this.setState({
      cquestion: question,
      cplayer: player
    })
    // console.log(question, player);
  }

  render() {
    const lItems = [];
    var { cquestion, cplayer } = this.state;
    for (let i = 1; i <= 9; i++) {
      lItems.push(
        <div key={i}>
          <ListItem
            primaryText={`Vraag ${i}`}
            key={`0.${i}`}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={[
              <Question key={i} question={i} onPlayerClick={this.PlayerClick.bind(this)}/>
            ]}
          />
          <Divider />
        </div>
      );
    }
  
    return (
      <div>
        <div className="Answer-header">
          <h1>Overzicht antwoorden</h1>
          <Menu />
        </div>
        <div className="answer top-margin">
          <div className="sidebar">
            <List>
              <Subheader>Vragen</Subheader>
              <Divider />
              {lItems}
            </List>
          </div>
          <div className="answers">
            <Answers question={cquestion} player={cplayer}/>
          </div>
        </div>
      </div>
    )
  }
};

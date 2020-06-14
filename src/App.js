/* eslint-disable no-useless-concat */
import React, { Component } from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'
import TopMenu from './components/TopMenu'


export default class App extends Component {
  render() {
    return (
      // <Router>

      <div>
        {/* <Switch> */}
          <TopMenu />
          <Route exact path="/" component={Home }/>
          <Route exact path="/rooms/" component={Rooms} />
          {/* slug là cái thay đổi do vậy nên để trước nó dấu : */}
          <Route exact path={"/rooms/:slug/:id.html.php"} component={SingleRoom} />
          <Route path="/error" component={Error} />
        {/* </Switch> */}
      </div>
      // </Router>
    )
  }
}

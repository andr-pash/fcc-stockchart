import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout/Layout'

import io from 'socket.io-client'
const socket = io.connect('/')

ReactDOM.render( <Layout socket={ socket }/>, document.getElementById('app'))

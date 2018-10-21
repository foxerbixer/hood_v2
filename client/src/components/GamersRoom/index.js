import React from "react"
import io from "socket.io-client"
import TextField from '../common/TextArea'
import Moment from 'react-moment'
import { connect } from 'react-redux'


class GamersRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      message: '',
      messages: []
    }

    this.socket = io.connect(window.location.hostname)

    this.socket.on('RECEIVE_MESSAGE', data => {
      this.addMessage(data ) 
    })
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  addMessage = data => this.setState({messages: [data, ...this.state.messages]})
  
  sendMessage = ev => {
    ev.preventDefault()
    if (this.state.message.length !== 0 && this.state.message.length < 1000) {
      this.socket.emit('SEND_MESSAGE', {
        author: this.props.auth.user.name,
        avatar: this.props.auth.user.avatar,
        message: this.state.message,
        date: Date.now()
      })
      this.setState({ message: '' })
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  
  render(){
    return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center align-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body" >
                <div className="card-title text-center display-4">Gamers Live</div>
                <hr/>
                <div className="card-footer mb-4">
                  
                <TextField 
                  name="message" 
                  type="text"
                  placeholder="Message"
                  value={this.state.message} 
                  onChange={this.handleChange}
                />
            
                  <button onClick={this.sendMessage} className="btn btn-secondary form-control">Send</button>
                </div>
                <div className="messages " >
                  {this.state.messages.map((message, index) => {
                    return (
                      <div key={index} className="mb-3">
                        <div style={{display:'inline-block', width: 40, height:40, marginRight: 10}}>
                          <img src={message.avatar} style={{borderRadius:'50%'}} alt=""/>
                        </div>
                        <div style={{display:'inline-block',marginRight: 10, color: 'grey'}}>
                          {
                            message.author === this.props.auth.user.name 
                              ? (<span>Вы</span>)
                              : message.author
                          } 
                        </div> 
                        {message.message}
                        <div style={{display:'flex'}}>
                          <Moment format='MMMM Do YYYY hh mm ss'style={{display:'flex', marginLeft:'auto'}}>
                            {message.date}
                          </Moment>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(GamersRoom)


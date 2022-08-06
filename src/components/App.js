import React, { Component } from 'react'
import { add_Reminder, remove_Reminder, clear_Reminders } from '../actions'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";






class App extends Component {
  state = {
    text: '',
    date: new Date()
  }

  render_Reminders = () => {
    const { reminders } = this.props;
    return (
      <ul className='list-group'>
        {
          reminders.map(item => {
            return (<li key={item.id} className='list-group-item'>
              <div>{item.text}</div>
              <div>{moment(new Date(item.date)).fromNow()}</div>
              <div className='CloseIcon btn btn-danger' onClick={() => this.props.remove_Reminder(item.id)}>X</div>

            </li>)
          })
        }
      </ul>
    )

  }
  render() {
    return (
      <div className='App'>

        <img src="" />
        <div className="reminder-title">
          <h2>What Should I Do?</h2>
        </div>
        <input value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} className='form-control' type='text' placeholder='Enter what u think' />


       

        <DatePicker
           className='form-control'
           value={this.state.date}
          selected={this.state.date}
         
          onChange={(date)=>{this.setState({date:date})}}
           //only when value has changed
           showTimeSelect
           timeFormat='HH:mm'
           dateFormat="MMMM d, yyyy h:mm aa"
           timeCaption='time'
        />


        <button onClick={() => { this.props.add_Reminder(this.state.text, this.state.date); this.setState({ text: '', date: '' }) }} className='btn btn-primary btn-block'>
          Add Reminder
        </button>
        {this.render_Reminders()}
        <button onClick={() => this.props.clear_Reminders()} className=' btn btn-danger btn-block'>
          Clear Reminder
        </button>




      </div>
    )
  }
}

//function mapDispatchToProps(dispatch) {
//return {
//   add_Reminder: () => dispatch(add_Reminder())
// }
//}


//function mapStateToProps(state){
//return {
//  reminders: state
// }
//}

export default connect(state => {
  return {
    reminders: state
  }
}, { add_Reminder, remove_Reminder, clear_Reminders })(App)
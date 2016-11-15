const React = require('react')
const xhr = require('xhr')

const ResourceForm = React.createClass({
  getInitialState(){
    return(
      {
        error: '',
        results: {},
        person: {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        }
      }
    )
  },
  handleChange(field){
    return e => {
      var person = this.state.person
      person[field] = e.target.value
      this.setState({person})
    }
  },
  handleSubmit(e){
    e.preventDefault()
    xhr({
      url: 'http://localhost:4040/persons',
      method: 'POST',
      json: this.state.person
    },(err,res) =>{
      if(err) return this.setState({error: err.message})
      this.setState({result: res})
    })
  },
  render(){
    return (
      <div>
        <h1>lol</h1>
        {this.state.error}
        {JSON.stringify(this.state.result,null,2)}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>first name</label>
            <input
              onChange={this.handleChange('firstName')}
              value={this.state.firstName}/>
          </div>
          <div>
            <label>last name</label>
            <input
              onChange={this.handleChange('lastName')}
              value={this.state.lastName}/>
          </div>
          <div>
            <label>phone</label>
            <input
              onChange={this.handleChange('phone')}
              value={this.state.phone}/>
          </div>
          <div>
            <label>email</label>
            <input
              onChange={this.handleChange('email')}
              value={this.state.email}/>
          </div>
          <button>Submit</button>
        </form>
        <pre>
          {JSON.stringify(this.state.person,null,2)}
        </pre>
      </div>
    )
  }
})

module.exports = ResourceForm

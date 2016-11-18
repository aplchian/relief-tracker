const React = require('react')

const Persons = React.createClass({
  componentDidMount() {
    this.props.db.all((err,res) => {
      if(err) return console.log(err)
      console.log(res.body)
    })
  },
  render(){
    return(
      <div>
        <h3>Persons</h3>
        <ul>
          <li>Person One</li>
        </ul>
      </div>
    )
  }
})

module.exports = Persons

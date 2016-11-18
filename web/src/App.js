const React = require('react')
const {BrowserRouter, Match, Link} = require('react-router')
const PersonsForm = require('./pages/persons/form')
const ShowPerson = require('./pages/persons/show')
const Persons = require('./pages/persons/')
const Db = require('./components/db')


const App = React.createClass({
  render(){
    return(
      <BrowserRouter>
        <div>
          <header>
            <h1>Relief Tracker</h1>
            <ul className="nav-bar">
              <li><Link to="/persons">Persons</Link></li>
              <li><Link to="/form">Persons Form</Link></li>

            </ul>
          </header>
          <div>
            <Match exactly pattern="/persons" component={Db(Persons)} />
            <Match pattern="/persons/new" component={PersonsForm} />
            <Match pattern="/persons/:id/show" component={ShowPerson} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App

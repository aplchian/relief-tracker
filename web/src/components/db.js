const React = require('react')
const xhr = require('xhr')
const url = process.env.REACT_APP_XHR

const db = {
  all(cb){
    xhr.get(`${url}/persons`,{json: true},cb)
  },
  save(person, cb){
    xhr.post(url, {json: person}, cb)
  }
}
//adds xhr url as prop to component and returns it
const Xhr = Component => React.createClass({
  render(){
    return(
      <Component {...this.props} db={db}/>
    )
  }
})

module.exports = Xhr

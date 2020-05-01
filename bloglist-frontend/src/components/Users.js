import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  const users = props.blogs.reduce((accumulator, currentValue) => {

    const findElement = accumulator.find(item => item.author === currentValue.author)

    if(findElement) {
       findElement.blogs += 1
    } else {
      accumulator.push({
        author: currentValue.author,
        blogs: 1
      })
    }
    return accumulator
  },[])

  return (<div>
    <h2>Users</h2>
    <table>
      <tbody>
      <tr><th></th><th>blogs created</th></tr>
      {users.map((user,index) => <tr key={index}><td>{user.author}</td><td>{user.blogs}</td></tr>)}
      </tbody>
    </table>
  </div>)
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(mapStateToProps, null)(Users)
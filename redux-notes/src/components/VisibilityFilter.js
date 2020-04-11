import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = props => {
  const filterClicked = value => {
    props.filterChange(value)
  }

  return (
    <div>
      all
      <input type="radio" name="filter" onChange={() => filterClicked('ALL')} />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('IMPORTANT')}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('NONIMPORTANT')}
      />
    </div>
  )
}

export default connect(null, { filterChange })(VisibilityFilter)

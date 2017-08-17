import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
  renderInputField(field) {
    // destructuring nested properties
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    // This property is added to the field component by redux form
    // Field automatically adds any errors from the field name prop to
    // the field.meta.error object
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')  
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h3>Add New Post</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label='Title'
            name='title'
            component={this.renderInputField}
          />
          <Field
            label='Categories'
            name='categories'
            component={this.renderInputField}
          />
          <Field
            label='Post Content'
            name='content'
            component={this.renderInputField}
          />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className='btn btn-default'>Cancel</Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  // Validate inputs from 'values'
  // eg. (!values.title || values.title.length < 3)
  if (!values.title) {
    errors.title = 'Please enter a title!'
  }
  if (!values.categories) {
    errors.categories = 'Please enter one or more categories!'
  }
  if (!values.content) {
    errors.content = 'Post content can not be empty'
  }
  // If errors is empty, the form can submit
  // If errors has properties, redux assumes its invalid
  return errors
}

// If you had multiple forms you would have another
// export statement in that component with the other forms unique identifier.
export default reduxForm({
  validate,
  form: 'PostNewForm' // unique string for the form. If multiple forms redux form will handle that
})(
  connect(null, { createPost })(PostsNew)
)

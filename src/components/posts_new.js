import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class PostsNew extends Component {
  renderInputField(field) {
    // This property is added to the field component by redux form
    // Field automatically adds any errors from the field name prop to
    // the field.meta.error object
    return (
      <div className='form-group'>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        {field.meta.touched ? field.meta.error : ''}
      </div>
    )
  }

  onSubmit(values) {
    console.log(values);
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

export default reduxForm({
  validate,
  form: 'PostNewForm' // unique string for the form. If multiple forms redux form will handle that
})(PostsNew)

// If you had multiple forms you would have another
// export statement in that component with the other forms unique identifier.

import React from 'react';
import { connect } from 'react-redux';

import { Button, Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form className='d-flex '>
      <Form.Control
        className='me-2 searchbar-input border-0'
        type='text'
        placeholder='Search for Movies'
        autoComplete='off'
        value={props.visibilityFilter}
        onChange={(e) => props.setFilter(e.target.value)}
      />
      <Button
        variant='outline-warning'
        type='submit'
        onChange={(e) => props.setFilter(e.target.value)}
      >
        Search
      </Button>
    </Form>
  );
}
export default connect(null, { setFilter })(VisibilityFilterInput);

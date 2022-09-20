import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className='director-view'>
        {/* Temporary; Testing  */}
        <Row className='director-profile'>
          <Col className='col-md-3 text-center'>
            <img
              src={director.Director.profile}
              className='profile img-fluid rounded-circle mx-auto d-block'
            ></img>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{director.Director.Name} </h4>
          </Col>
        </Row>
        <Row className='director-bio'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>BIO</p>
            <p> {director.Director.Bio}</p>
          </Col>
         
        </Row>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
          variant='primary'
        >
          Back
        </Button>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birth: propTypes.string.isRequired,
  }),
};

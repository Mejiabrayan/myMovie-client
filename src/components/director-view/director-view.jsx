import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

export class DirectorView extends React.Component {
  colorStyles = {
    color: 'white',
  };
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className='director-view' style={{ minHeight: '100vh' }}>
        {/* Temporary; Testing  */}
        <Row className='director-profile'>
          <Col className='col-md-3 text-center'>
            <img
              src={director.Director.profile}
              className='profile img-fluid rounded-circle mx-auto d-block'
              alt='director profile'
            ></img>
          </Col>
        </Row>
        <Row>
          <Col style={this.colorStyles}>
            <h1>{director.Director.Name} </h1>
          </Col>
        </Row>
        <Row className='director-bio'>
          <Col style={this.colorStyles}>
            <p>BIO</p>
            <p> {director.Director.Bio}</p>
          </Col>
        </Row>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
          variant='outline-warning'
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

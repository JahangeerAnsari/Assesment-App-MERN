import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
/**
* @author
* @function InputField
**/

const InputField = (props) => {
  return (
    // <Form>
      <React.Fragment>
        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
          <Form.Label column sm="3">
            {props.Label}
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type={props.type}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange} />
          </Col>
        </Form.Group>


      </React.Fragment>
    // </Form>
  )

}

export default InputField
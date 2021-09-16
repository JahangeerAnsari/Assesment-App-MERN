import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

// import './style.css'

/**
* @author
* @function Boolean
**/

const CustomSwitch = (props) => {
  return (
    <Form className="boolean-checkbox" >
      <Form.Group as={Row} className="mb-3" controlId="formBasicCheckbox">
        <Form.Label column sm="2">
          {props.Label}
        </Form.Label>
        <Col sm="10">
          <Form.Check
            type={props.type}
            checked={props.checked }
            onChange={props.onChange}
            style={props.style}
            onClick={props.onClick}
          />
        </Col>

      </Form.Group>

    </Form>


  )

}

export default CustomSwitch
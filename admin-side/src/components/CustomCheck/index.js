import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

/**
* @author
* @function Custon
**/

const CustomCheck = (props) => {
  return (
    <Form>
      <React.Fragment>
        <Form.Group as={Row} className="mb-3" controlId="formBasicCheckbox">
          <div style={{ display: "flex", alignItems: 'center' }}>
            <Form.Check column sm="2"
              type={props.type} onChange={props.onClick} checked={props.checked } />
            <Col>
              <Form.Control
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                style={{ marginLeft: '10px', width: '60%' }}
                readOnly={props.readOnly} />
            </Col>
          </div>
        </Form.Group>
      </React.Fragment>
    </Form>
  )

}

export default CustomCheck
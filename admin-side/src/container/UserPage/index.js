import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Table, Col, Nav } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { fetchedAllAssesments } from '../../actions/assesment.action';
import './style.css'
/**
* @author
* @function Home
**/



const UserPage = (props) => {
     const assesment = useSelector(state => state.assement);
    


          const renderAssesments = () => {
               // setTimer(assesment.assesments[0].totalTime)
               let myAssesmets = [];

               for (let asset of assesment.assesments) {

                    myAssesmets.push(
                         // <li>
                         <NavLink to={`/questions/${asset._id}`} className="nav-link">
                              {asset.name}
                              <br></br>
                              {/* {asset.totalTime} */}
                             
                         </NavLink>

                         // </li>
                    );
               }
               return myAssesmets;



          }

          return (

               <Layout>
                    <Container>
                         <Row className="header-row">
                              <div className="assement-list">
                                   <h2>Select An Assesment</h2>
                                   <Nav className="navbar-brand">
                                        {/* <li className="nav-item"> */}

                                        {renderAssesments()}

                                      

                                   </Nav>
                              </div>
                              <Col>

                              

                              </Col>

                         </Row>

                    </Container>




               </Layout>


          )

     }

     export default UserPage
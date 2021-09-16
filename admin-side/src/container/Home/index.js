import React, { useEffect } from 'react'
import { Container, Row, Table ,Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout'
import { NavLink, Link } from 'react-router-dom'
import './style.css'
import { fetchedAllAssesments } from '../../actions/assesment.action';

/**
* @author
* @function Home
**/


const Home = (props) => {

     const auth = useSelector(state => state.auth);
     const assement = useSelector(state => state.assement);
     const dispatch = useDispatch();

     // fetched all assesment
     useEffect(() => {
          dispatch(fetchedAllAssesments())

     }, [])

     const renderAssesments = (assesments) => {

          let myAssesmets = [];
          console.log("assement ++++++++++++++++:", assesments);

          for (let asset of assesments) {

               myAssesmets.push(
                    <li>
                         {asset.name}
                    </li>
               );
          }
          return myAssesmets;
     }
  
   const  renderAssesmentTable = () => {
        return (
             <Table>
                  <thead>
                     <tr>
                       <th>#</th>   
                       <th>Assement Name</th>
                       <th> Total Question</th>
                       <th>Total Time</th>
                         </tr>  
                  </thead>
                  <tbody>
                       {
                         assement.assesments.length > 0 ?
                         assement.assesments.map(ass => {
                              return <tr key={ass._id} style={{verticalAlign: "top"}}>
                                <td>#</td>   
                              <td >{ass.name}</td> 
                              <td>{ass.questions.length}</td>
                              <td>{ass.totalTime}</td>
                             

                            </tr>  
                         }) : "Sorry you dont have any assesment Please write !" 
                       }
                       
                  </tbody>
             </Table>
        )
     }



     return (
          <Layout>
               <Container>
                    <Row className="header-row">
                         {/*  */}
                         <div className="main-menu">
                              <div className="user-email">
                                   {auth.user.email}
                              </div>

                              <NavLink to="/assesment" className="add-assement">
                                   + New Assesment</NavLink>
                         </div>
                         <div className="assement-list">
                              <h2>Assesments</h2>
                              {/* <h5>{renderAssesments(assement.assesments)}</h5> */}
                               
     
                         </div>
                    <Col>
                    {renderAssesmentTable()}
                    </Col>

                    </Row>

               </Container>




          </Layout>
     )

}

export default Home
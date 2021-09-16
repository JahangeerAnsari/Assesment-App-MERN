import React, { useEffect } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssesmentResult } from "../../actions/user.assesment.action";
import Layout from "../../components/Layout";

/**
 * @author
 * @function
 **/

const ResultPage = (props) => {
  const userAssement = useSelector((state) => state.userAssement);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAssesmentResult());
  }, []);

   console.log("RESULTTTT",userAssement.resultAssesments);

  const renderResultAssesments = () => {
    return (
      // result.assesments
      <div>
       {userAssement.resultAssesments.map((item, index) => (
  <div key={index}>
    <h1>{item.title}</h1>
    {item.assesments.map((c, i) => (
      <div key={i}>
         <div> Attempt : <h6>{c.attempt}</h6></div>
         <div> Score : <h6>{c.score}</h6></div>
         <div> Wrong : <h6>{c.wrong}</h6></div>
        
       
        <hr />
      </div>
    ))}
  </div>
))}
      </div>
    );
  };

  return (
    <Layout>
      <Container>
        <Row>
          <h3>RESULTS</h3>
          {/* resultAssesments */}
          {renderResultAssesments()}
        </Row>
      </Container>
    </Layout>
  );
};
export default ResultPage;

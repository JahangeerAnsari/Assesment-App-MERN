import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { writeAnAssement } from "../../actions";
import Layout from "../../components/Layout";
import './style.css'

/**
 * @author
 * @function QuestionPage
 **/

const QuestionPage = (props) => {
  const assement = useSelector((state) => state.assement);

  let originalAssesssment = useRef(null);

  const [timer, setTimer] = useState({ minutes: 20, seconds: 1 });
  const assessmentId = props.match.params.id;
  const [selectedAssesssment, setSelectedAssessment] = useState();
  const history = useHistory();
  const [alert, setAlert] = useState({
    variant: "success",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  // const [assesments, setAssesments] = useState([]);
  const dispatch = useDispatch();
  const handleAssementSubmit = (e) => {
    e.preventDefault();
    const original = originalAssesssment.current;
    let totalScore = 0;
    let totalAttempted = 0;
    let correct = 0;

    original.questions.forEach((q, qi) => {
      let falseCount = 0;
      let attempted = false;
      q.choices.forEach((c, ci) => {
        const sq = selectedAssesssment.questions;
        const ac = sq[qi].choices[ci];
        if (ac.isTrue && !attempted) {
          attempted = true;
          totalAttempted += 1;
        }
        if ((c.isTrue && !ac.isTrue) || (!c.isTrue && ac.isTrue)) {
          falseCount += 1;
        }
      });

      if (falseCount === 0) {
        correct += 1;
        totalScore += Number(q.marks);
      }
    });

    const wrong = totalAttempted - correct;
    const result = {
      assessmentId: assessmentId,
      attempt: totalAttempted,
      score: totalScore,
      wrong: wrong >= 0 ? wrong : 0,
    };
    console.log("====> result : ", result);
    dispatch(writeAnAssement(result))
      .then((res) => {
        console.log("RESPONSE ADDDDDDDD#### add ======> ", res);

        const { message } = res.data;

        if (res.status === 201) {
          console.log(" res.status", res.status);
          setAlert({ ...alert, message, variant: "success" });
          setShowAlert(true);
          setTimeout(() => {
            history.push("/result");
          }, 1000);
        }
      })
      .catch(function (error) {
        const { response } = error;
        console.log("response error", response);
        if (response) {
          const { status } = response;
          //   console.log("===>", data);
          const { message } = response.data;
          console.log("===>", status);
          console.log(" message===>", message);

          if (status === 400) {
            setAlert({ ...alert, message, variant: "danger" });

            setShowAlert(true);
          }
        }
      });
  };

  let interval = useRef(null);
  // useEffect(() => {
  //   //  interval.current = setInterval(updateTimer, 1000);
  //   // return () => clearInterval(interval.current);
  // }, []);

  useEffect(() => {
     interval.current = setInterval(updateTimer, 1000);
    
  }, []);




  if (!assessmentId) {
    //TODO: LOGIC TO SEND BACK
    console.log("===> assessment id is required");
  }
  console.log(
    "================== AAAAAAAAAAAAAAAAAAAAA=> assessment id : ",
    assessmentId,
    assement
  );
  if (assement.assesments) {
    const findAssess = assement.assesments.find((o) => o._id === assessmentId);
    if (findAssess) {
      originalAssesssment.current = findAssess;

      // console.log(" ORIGINAL ARRAY ADMIN", originalAssesssment.current)

      const myAssessment = findAssess.questions.map((q) => {
        const choices = q.choices.map((c) => ({ ...c, isTrue: false }));
        return { ...q, choices };
      });
      if (!selectedAssesssment) {
        setSelectedAssessment({
          ...findAssess,
          questions: myAssessment ? myAssessment : [],
        });
        console.log(
          "==================%%%%%%%%%%%% TIME : ",
          findAssess.totalTime
        );
        setTimer({ minute: Number(findAssess.totalTime), seconds:0 });
      }
    }
  }

  // console.log(" ORIGINAL ARRAY ADMIN", originalAssesssment.current);
  // console.log(" selectedUserAnswer ", selectedUserAnswer)

  const handleChoiceSelection = (qi, ci) => {
    console.log("SELECTE", qi, ci, selectedAssesssment);
    console.log(" QI", qi);
    console.log("CI", ci);

    const selectedUserAnswer = selectedAssesssment.questions.map((q, index) => {
      if (qi === q._id) {
        q.choices &&
          q.choices.map((c, index) => {
            if (ci === c._id) {
              console.log("hello ci maching", c._id);
              c.isTrue = !c.isTrue;
            }
            return c;
          });
      }

      return q;
    });
    if (selectedUserAnswer)
      setSelectedAssessment({
        ...selectedAssesssment,
        questions: selectedUserAnswer,
      });
  };

  //  Comparing TWO ARRAYS VALUE
  console.log(" ORIGINAL ARRAY ADMIN", originalAssesssment.current);

  console.log(
    "------------2ertyuisdxfcgvn------****************",
    selectedAssesssment
  );

  // let count = 0;
  if (selectedAssesssment) {
    // let correct = 0
    // const compareResult = selectedAssesssment.questions.map((q, index) => {
    //   const adminQuestion = originalAssesssment.current.questions[index];
    //   console.log("Admin Question", adminQuestion);
    //   q.choices.map((choice, cIndex) => {
    //     const adminChoices = originalAssesssment.current.questions[index].choices[cIndex];
    //     console.log("Admin Choices", adminChoices);

    //     const objectsEqual = (o1, o2) =>
    // Object.keys(o1).length === Object.keys(o2).length
    //     && Object.keys(o1).every(p => o1.isTrue === o2.isTrue);

    //     console.log( "MACHING CHOICES ",objectsEqual(adminChoices,choice ));
    //     //  find total numer of co
    //   });

    // });
    console.log("====> selected assessment : ", selectedAssesssment);
    console.log("====> original assessment : ", originalAssesssment.current);
    // const original = originalAssesssment.current;
    // let correct = 0;

    // original.questions.forEach((q, qi) => {
    //   let falseCount = 0;
    //   q.choices.forEach((c, ci) => {
    //     const sq = selectedAssesssment.questions;
    //     const ac = sq[qi].choices[ci];
    //     if ((c.isTrue && !ac.isTrue) || (!c.isTrue && ac.isTrue)) {
    //       falseCount += 1;
    //     }

    //   });

    //   if (falseCount === 0  ) {

    //     correct += 1;
    //   }

    //   console.log("====> TOTAL Marks: ",correct* q.marks);

    // });
    // console.log("====> correct questions: ", correct);
  }

  const renderChoices = (questionId, choiceObj) => {
    return (
      <input
        checked={choiceObj.isTrue}
        type="checkbox"
        onClick={() => handleChoiceSelection(questionId, choiceObj._id)}
      />
    );
  };

  const renderAssesmentQuestions = () => {
    console.log("------------------****************", selectedAssesssment);
    return (
      selectedAssesssment &&
      selectedAssesssment.questions.map((assess) => (
        <div className="questions-page">
          <ul>
            {assess.question}
            <li>
              {assess.choices.map((choice) => (
                <li className="choices">
                  {renderChoices(assess._id, choice)}
                  {choice.name}
                </li>
              ))}
            </li>
          </ul>
        </div>
      ))
    );
  };

  const updateTimer = () => {
    setTimer((old) => {
      const updatedTimer = {
        minutes: Number(old.minutes),
        seconds: Number(old.seconds),
      };
      if (
        Number(old.seconds) === 1 &&
        Number(updatedTimer.seconds) === 1 &&
        Number(updatedTimer.minutes) !== 0
      ) {
        updatedTimer.minutes = Number(old.minutes) - 1;
        updatedTimer.seconds = 59;
      } else {
        updatedTimer.minutes = Number(old.minutes);
        updatedTimer.seconds = Number(old.seconds) - 1;
      }
      if (Number(updatedTimer.minutes) < 10) {
        updatedTimer.minutes = "0" + updatedTimer.minutes;
      }
      if (Number(updatedTimer.seconds) < 10) {
        updatedTimer.seconds = "0" + updatedTimer.seconds;
      }
      if (
        Number(updatedTimer.seconds) < 1 &&
        Number(updatedTimer.minutes) < 1
      ) {
        clearInterval(interval.current);
      }
      return updatedTimer;
    });
  };

  return (
    <Layout>
      Length{" "}
      {/* {assement && assement.assesments
        ? assement.assesments.length
        : "length is null"}
      { */}
      <div>
        Time : {timer.minutes} : {timer.seconds}
      </div>
      <Row>
        {showAlert && (
          <Alert
            variant={alert.variant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
      </Row>
      {renderAssesmentQuestions()}
      <Row>
        <Col>
          <Button
            variant="primary"
            type="submit"
            onClick={handleAssementSubmit}
          >
            Submit Test
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};
export default QuestionPage;

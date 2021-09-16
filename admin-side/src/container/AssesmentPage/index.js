import React, { useEffect, useState } from 'react'
import { Container, Row, Form, Col, Button, Alert } from 'react-bootstrap'
import CustomCheck from '../../components/CustomCheck'
import InputField from '../../components/InputField'
import Layout from '../../components/Layout'
import BooleanType from '../../components/CustomSwitch';
import { addAssesment, fetchedAllAssesments } from '../../actions/assesment.action';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { useHistory } from 'react-router-dom'

/**
* @author
* @function AssesmentPage
**/

const AssesmentPage = (props) => {

    const [name, setName] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [questions, setQuestions] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory()
    const [alert, setAlert] = useState({
        variant: "success",
        message: "",
    })
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        handleAddMoreQuestion();

    }, [])

    // submit form 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("====> assesmet : ", name);
        console.log("====> questi : ", questions);

        const testPaper = {
            name,
            questions,
            totalTime
        }


        dispatch(addAssesment(testPaper)).then((res => {
            console.log("response add ======> ", res);

            const { message } = res.data;

            if (res.status === 201) {
                console.log(" res.status", res.status);
                setAlert({ ...alert, message, variant: "success" });
                setShowAlert(true);
                setTimeout(() => {
                    history.push('/');
                }, 1000)
            }


        }
        )).catch(function (error) {
            const { response } = error
            console.log("response error", response)
            if (response) {
                const { status } = response;
                //   console.log("===>", data);
                const { message } = response.data;
                console.log("===>", status);
                console.log(" message===>", message);

                if (status === 400) {

                    setAlert({ ...alert, message, variant: "danger" });

                    setShowAlert(true)
                }

            }
        });

    }

    const handleAddMoreQuestion = () => {

        const questionObj = {
            question: "",
            isQuestionBooleanType: false,
            choices: [{
                name: '',
                isTrue: false,
            }, {
                name: '',
                isTrue: false,
            }, {
                name: '',
                isTrue: false,
            }, {
                name: '',
                isTrue: false,
            }]
        }
        setQuestions([...questions, questionObj]);

        // we have to save this data 
    }

    const handleCheckbox = (i) => {
        const updatedQuestion = questions.map((q, index) => {
            if (i === index) {
                q.isQuestionBooleanType = !q.isQuestionBooleanType;
                if (!q.isQuestionBooleanType) {
                    q.choices = [{
                        name: '',
                        isTrue: false,
                    }, {
                        name: '',
                        isTrue: false,
                    }, {
                        name: '',
                        isTrue: false,
                    }, {
                        name: '',
                        isTrue: false,
                    }];
                } else {
                    q.choices = [{
                        name: 'True',
                        isTrue: false,
                    }, {
                        name: 'False',
                        isTrue: false,
                    }];
                }
            }
            return q;
        });
        setQuestions(updatedQuestion)
    }
    const handleQuestionChange = (e, i) => {
        const { value } = e.target;
        const updatedQuestion = questions.map((q, index) => {
            if (i === index) {
                q.question = value;
            }
            return q;
        });
        setQuestions(updatedQuestion)
    }

    const handleQuesionMarks = (e, i) => {
        const { value } = e.target;
        const updatedQuestion = questions.map((q, index) => {
            if (i === index) {
                q.marks = value;
            }
            return q;
        });
        setQuestions(updatedQuestion);

    }

    const handleChoiceSelection = (ci, qi, isQuestionBooleanType) => {
        const updatedQuestion = questions.map((q, index) => {
            if (qi === index) {
                q.choices && q.choices.forEach((c, cIndex) => {
                    if (isQuestionBooleanType) {
                        c.isTrue = !c.isTrue;
                        if (ci === cIndex) {
                            c.isTrue = true;
                        } else {
                            c.isTrue = false;
                        }
                    }
                    else {
                        if (ci === cIndex) {
                            c.isTrue = !c.isTrue;
                        }
                    }

                });
            }
            return q;
        });
        setQuestions(updatedQuestion)
    }
    const handleChoiceChange = (e, ci, qi) => {
        const { value } = e.target;
        const updatedQuestion = questions.map((q, index) => {
            if (qi === index) {
                q.choices && q.choices.forEach((c, cIndex) => {
                    if (ci === cIndex) {
                        c.name = value;
                    }
                });
            }
            return q;
        });
        setQuestions(updatedQuestion)
    }

    const renderChoice = (choice, choiceIndex, questionIndex, isQuestionBooleanType) => {
        return (<div className="grid-item">
            <CustomCheck
                type="checkbox"
                placeholder="enter choice"
                checked={choice.isTrue}
                value={choice.name}
                readOnly={isQuestionBooleanType}
                onChange={(e) => handleChoiceChange(e, choiceIndex, questionIndex)}
                onClick={() => handleChoiceSelection(choiceIndex, questionIndex, isQuestionBooleanType)}
            />
        </div>)
    }

    const renderQuestionItem = (q, i) => {

        return <div>

            <Row>
                <Col sm="10">
                    <InputField
                        Label="Question"
                        placeholder={`Enter question Name ${i}`}
                        type="text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(e, i)}
                    />
                </Col>
                <Col sm="2" >
                    <InputField
                        placeholder={` Marks`}
                        type="text"
                        value={q.marks}
                        onChange={(e) => handleQuesionMarks(e, i)}
                    />
                </Col>

            </Row>
            <BooleanType
                Label="BooleanType"
                type="switch"
                checked={q.isQuestionBooleanType}
                onClick={() => handleCheckbox(i)}
            />

            <div className="grid-container">
                {
                    q.choices && q.choices.map((c, ci) => {
                        return renderChoice(c, ci, i, q.isQuestionBooleanType)
                    })
                }

            </div>
        </div>
    }


    return (
        <Layout>
            <Container>
                {showAlert && <Alert variant={alert.variant} onClose={() => setShowAlert(false)} dismissible>
                    {alert.message}
                </Alert>
                }
                <Row className="header-row">
                    <Form className="form-data" onSubmit={handleSubmit}>

                        <Row>
                            <Col sm="9">
                                <InputField
                                    Label="Assesment Name"
                                    placeholder="Enter assesment Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>

                            <Col sm="3">

                                <InputField
                                    placeholder="Time in Min"
                                    type="text"
                                    value={totalTime}
                                    onChange={(e) => setTotalTime(e.target.value)}
                                />
                            </Col>

                        </Row>

                        {questions.map((question, i) => {
                            return renderQuestionItem(question, i);


                        })}




                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="warning" onClick={handleAddMoreQuestion} >
                                Add Question
                            </Button>
                        </div>



                    </Form>


                </Row>
            </Container>

        </Layout>
    )

}

export default AssesmentPage
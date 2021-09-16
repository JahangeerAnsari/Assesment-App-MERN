class validateAssements {

    // identifying errors in data received from request
    identifyErrors(errors, res) {
        //check validation errors
        if (!errors.isEmpty()) {
            let errorParam = errors.array()[0].param;
            return res.status(400).json({

                message: " Invalid/Missing " + errorParam + " !",
                error: errors.array()
            });
        }
    }

    /**---- ASSESSMENT FORM VALIDATION -------- */
    //assessment name validation
    validateName(assessment, res, error) {

        if (assessment) {
            let name = assessment.name;

            if (!name) {
                return res.status(400).json({
                    message: "Please provide an assessment name!",
                    error
                });
            }
        }
    }

    // tota time validation

    validateTime(assessment, res, error) {

        if (assessment) {
            let timeDuration = assessment.totalTime;
            
            if (!timeDuration) {
                return res.status(400).json({
                    message: "Please provide Assesment  Time  Duration!",
                    error
                });
            }
        }
    }


    //Questions[] object validation
    validateQuestions(assessment, res, error) {
        console.log('assessment: ' + JSON.stringify({ assessment }));
        if (assessment) {
            if (assessment.questions) {
                let questions = assessment.questions;
                console.log('questions: ' + JSON.stringify({ questions }));
                console.log('length: ' + questions.length);
                if (questions.length == 0) {
                    return res.status(400).json({
                        message: "An assessment must contains atleast one Question!",
                        error
                    });
                } else {
                    let questionCounter = 0;
                    //iterate over the loop
                    for (let q of questions) {
                        ++questionCounter;
                        console.log('\n\nsingle question: ' + JSON.stringify({ q }));
                        console.log('\n\nquestion is : ' + q.question);
                        //check for question title
                        if (!q.question) {

                            console.log('question is null');
                            return res.status(400).json({
                                message: "Question " + questionCounter + " should not be null",
                                error
                            });
                        }
                        if (!q.marks) {

                            console.log('question is null');
                            return res.status(400).json({
                                message: "Marks of " + questionCounter + " should not be null",
                                error
                            });
                        }
                        else if (q.question) {
                            console.log('question is not null: ' + q.question);
                            console.log('is booolean : ' + q.isQuestionBooleanType);

                            //now checking whether the questionType is boolean or not
                            if (q.isQuestionBooleanType) {

                                console.log('boolean quetion type....');
                                //question type is boolean
                                let choiceCounter = 0;

                                //get the choice object of index which is for boolean question type
                                let choice = q.choices[0];
                                //now replace choices of the question since it contains extra 3-choices, since choices are 4
                                //if choice answer is true then we set choice name as true or else false
                                if (choice.isTrue)
                                    choice.name = "True";
                                else
                                    choice.name = "False";
                                q.choices = [choice];
                                let choices = q.choices;
                                console.log('boolean question choices : ' + JSON.stringify({ choices }));
                                // if (choice.isQuestionBooleanType) {
                                //     return res.status(400).json({
                                //         message: 'boolean question choices not bee null',
                                //         error
                                //     })

                                // }

                                const trueChoices = choices.filter(choice => choice.isTrue);
                                console.log("count =-------->", res)
                                if(trueChoices.length === 2) {
                                    return res.status(400).json({
                                        message: 'Both choices should be checked',
                                        error
                                    })
                                }
                                if(trueChoices.length === 0) {
                                    return res.status(400).json({
                                        message: 'Atleast one choice should be checked',
                                        error
                                    })
                                }
                                if(trueChoices.length === 4) {
                                    return res.status(400).json({
                                        message: 'Atleast one choice should be checked',
                                        error
                                    })
                                }

                            }
                            else {
                                console.log('\n\nquetion type is not boolean....');
                                //question type is not the boolean
                                let choiceCounter = 0;
                                 let choices = q.choices;

                                const trueChoices = choices.filter(choice => choice.isTrue);
                                if(trueChoices.length === 0) {
                                    return res.status(400).json({
                                        message: 'Atleast one choice should be checked',
                                        error
                                    })
                                }
                                for (let c of q.choices) {
                                    ++choiceCounter;
                                    if (!c.name) {
                                       
                                        console.log('choice is null');
                                        return res.status(400).json({

                                            message: "Choice " + choiceCounter + " of question " + questionCounter + " should not be null",
                                            error
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**---- ASSESSMENT FORM VALIDATION - END-------- */
}

module.exports = validateAssements;

//exporting
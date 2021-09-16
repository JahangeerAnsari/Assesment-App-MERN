const UserAssesment = require("../modals/user.assement");

exports.writeAssesment = (req, res) => {
  // const {assesments, attempt,score,wrong} = req.body
  // const newUserAssemet = new UserAssesment({
  //     assesments,
  //      attempt,score,
  //      wrong
  // });
  // console.log("NEW ASSEMENTS",newUserAssemet)
  // newUserAssemet.save((error, userAssesments) => {
  //     if (error) {
  //         return re.status(400).json({
  //             message: 'Could not save',
  //             error
  //         })
  //     }
  //     if (userAssesments) {
  //         return res.status(201).json({
  //             message: 'User has writen aassesment',
  //             userAssesments
  //         })
  //     }

  // })
  const { assessmentId, attempt, score, wrong } = req.body;
  console.log("===> user in req : ", req.user);
  console.log("===> data : ", { assessmentId, attempt, score, wrong });
  try {
    const newUserAssemet = new UserAssesment({
      userId: req.user._id,
      assesments: [
        {
          assessmentId,
          attempt,
          score,
          wrong,
        },
      ],
    });
    newUserAssemet.save((error, userAssements) => {
      if (error) {
        console.log("===> 1", error);
        return res.status(400).json({
          message: "Something went  wrong",
          error,
        });
      }
      console.log("ERRPRRRRRRRR", error);
      if (userAssements) {
        console.log("===> 2", userAssements);

        return res.status(201).json({
          message: "New Assements has been Added",
          userAssements,
        });
      }
      console.log("===> 3");

      return res.status(400).json({
        error: " could not add !UserAssesment",
      });
    });
  } catch (error) {
    console.log("===> error : ", error);

    res.status(400).json({
      error,
    });
  }
};

// FETCHED ASSEMENTS BY ASSESMENTID
exports.getUserAssesments = async (req, res) => {

  console.log("=====++++++++++ User id",   req.user );
   try {
    const assesments = await UserAssesment.find({ userId: req.user._id }).sort({_id:-1});
    console.log("1 %%%%%%%%%%%%%%%%%% FETCHE ",assesments)
    if (assesments) {
      console.log(" 2 $$$$$$$$$$$$$$$$$$ FETCHE ",assesments)
      return res.status(200).json({
        message: "Fetched User Assesment BY Id ----",
        assesments,
      });
    }
    return res.status(200).json({
      message: "No assessments found of the user",
    });
  } catch (error) {
   return res.status(400).json({
      message: "Could not Fetched User Assesment",
      error,
    });
  }
};

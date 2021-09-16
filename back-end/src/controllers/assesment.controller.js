const Assesment = require('../modals/assesment')
// const slugify = require('slugify');
const validateAssements = require('../validators/assesment.validates');
exports.addAssesments = async (req, res) => {

    const { name, questions, totalTime,marks,adminId } = req.body;
 console.log("req.body---------", req.body);
    let validate = new validateAssements();
    
    // NAME VALIDATION
    let error = validate.validateName(req.body, res) ;
      if(error){
        return error;
      }

       error = validate.validateTime(req.body, res) ;
      if(error){
        return error;
      }
    
    //  // Qestion validat
      error = validate.validateQuestions(req.body, res);
      if(error){
        return error;
      }
        


      try {
        //  all success cases
        console.log('\n\n$$$$$$$$$$$$$$$$$$$$$$$....');
      const isUserExits = await Assesment.findOne({ adminId });

      const assesment =   await  Assesment.findOne({ name :req.body.assessmentName});
        if(assesment){
          res.status(200).json({
             message:'Assesment Already Present',
             assesment
          })
        } else{
          //  if(isUserExits){

             const newAssesments = new Assesment({
              name, questions, totalTime, 
              marks
             });

               newAssesments.save((error, assememtData) =>{
                 console.log("==============> error , assememtData : ", error, assememtData)
                   if(error){
                  return res.status(400).json({
                    message:'something went wrong ',
                    error
                  })
                 }

                 if(assememtData){
                  return res.status(201).json({
                    message:'New Assement has been Created..',
                    assememtData
                  })
                 }
                 return res.status(400).json({
                  error:'Assessment could not added!',
                })
             })

          //  }
          //  return res.status(400).json({
          //   error:'user not exists!',
          // })
        }
        
      } catch (error) {
       console.log("error", error) 
      }

    }
    


//  FETCHED ALL ASSESMENTS
exports.getAllAssements = (req,res) => {
    
  Assesment.find({}).sort({_id:-1}).exec((error, assesments) =>{
     if(error){
 res.status(400).json({
  message:'Could not Fetched..',
  error
})
     }

     if(assesments){
      return res.status(200).json({
        message:'Fetched all assesmet ',
        assesmentList:assesments
      })
    }
  })

}

// FETCHED ASSEMENTS BY ASSESMENTID
exports.getAssementsById = (req,res) => {
  
  Assesment.find({_id: req.params.assesmentId}).exec((error, assesments) =>{
    if(error){
res.status(400).json({
 message:'Could not Fetched Assesment',
 error
})
    }

    if(assesments){
     return res.status(200).json({
       message:'Fetched Assesment BY Id',
       assesmentList: assesments
     })
   }
 })
  

}
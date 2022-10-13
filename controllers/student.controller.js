const student = require("../model/student.model");

exports.create = (req, res) => {
  res.render("index", {
    page_title: "Home",
  });
};

/**
 * @Method insert
 * @Description Insert User Data
 */

exports.insert = async (req, res) => {
  try {
    req.body.firstName = req.body.firstName.trim();
    req.body.lastName = req.body.lastName.trim();
    if (!req.body.firstName && !req.body.lastName) {
      console.log("Field should not be empty");
      res.redirect("/");
    } else {
      let isEmailExist = await student.find({ email: req.body.email });
      if (!isEmailExist.length) {
        let isContactNumberExist = await student.find({ contactNumber: req.body.contactNumber });
          if (!isContactNumberExist.length) {
            req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
            console.log(req.body);
    
            let saveData = await student.create(req.body);
            console.log(saveData);
            if (saveData && saveData._id) {
              console.log("Data Added Successfully");
              res.redirect("/student-view");
            } else {
              console.log("Data Not Added");
              res.redirect("/");
            }
          } else { 
            console.log("Contact Number Already exists");
        res.redirect("/");
          }
        /* check contact validation*/
      } else {
        console.log("Email Already exists");
        res.redirect("/");
      }
    }
  } catch (err) {
    throw err;
  }
};

/**
 * @Method studentView
 * @Description view student data
 */

exports.studentView = async (req, res) => {
  try {
    let studentData = await student.find({});
    // console.log(studentData);
    res.render("studentView", {
      page_title: "student || view",
      studentData,
    });
  } catch (err) {
    throw err;
  }
};

/**
 * @Method delete
 * @Description Delete Data
 * @Delete Hard delete
 */

exports.delete = async (req, res) => {
  try {
    let deleteData = await student.findByIdAndRemove(req.params.id);
    if (deleteData) {
      console.log("Data Deleted Successfully...");
      res.redirect("/student-view");
    } else {
      console.log("Something went wrong...");
    }
  } catch (err) {
    throw err;
  }
};

/**
 * @Method edit
 * @Description edit student data
 *
 *
 */

exports.edit = async (req, res) => {
  try {
    let studentData = await student.find({ _id: req.params.id });
    console.log(studentData[0]);

    res.render("edit", {
      page_title: "Edit",
      response: studentData[0],
    });
    // console.log(studentData);
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @Methode update
 * @Description Update student Data
 *
 */

exports.update = async (req, res) => {
  try {
    let studentUpdate = await student.findByIdAndUpdate(req.body.id, req.body);
    if (studentUpdate && studentUpdate._id) {
      console.log("Student Data Updated");
      res.redirect("/student-view");
    } else {
      console.log("Somthing went wrong");
      res.redirect("/student-view");
    }
  } catch (err) {
    throw err;
  }
};

//H.W
//Ready new template 

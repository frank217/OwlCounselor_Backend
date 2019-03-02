
var express = require('express');
var router = express.Router();

router.post("/", function (req, response) {
    /*
    * POST /api/course
    */
   var body = req.body.json();
   console.log("[POST /api/course] body: ", body);

   var major = body.major;
   var degree = body.degree;


    var res = {

        courses: [
            {
                "name": "COMP140",
            },
            {
                "name": "COMP182",
            },
            {
                "name": "COMP215",
            },
        ],

    };

    response.json(res);
   
});

module.exports = router;
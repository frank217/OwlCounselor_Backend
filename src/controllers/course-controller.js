
var express = require('express');
var router = express.Router();

router.post("/", function (req, response) {
    /*
    * POST /api/course
    */
   var body = req.body;
   console.log("[POST /api/course] body: ", body);

   var major = body.major;
   var degree = body.degree;

    var res = {
        
        courses: [
            {
                "id": "1001",
                "name": "COMP 140",
            },
            {
                "id": "1002",
                "name": "COMP 182",
            },
            {
                "id": "1003",
                "name": "COMP 215",
            },
        ],

    };

    response.json(res);
   
});

module.exports = router;
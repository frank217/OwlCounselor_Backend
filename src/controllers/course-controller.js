
var express = require('express');
var router = express.Router();

var course = {'COMP427': {'sem': '1', 'prereq': [['COMP310'], ['COMP321']]}, 'COMP424': {'sem': '0', 'prereq': [[]]}, 'COMP425': {'sem': '0', 'prereq': [['COMP326']]}, 'COMP422': {'sem': '0', 'prereq': [['COMP321']]}, 'COMP420': {'sem': '0', 'prereq': [['COMP421']]}, 'COMP421': {'sem': '1', 'prereq': [['COMP215'], ['COMP321']]}, 'COMP581': {'sem': '1', 'prereq': [[]]}, 'COMP580': {'sem': '1', 'prereq': [[]]}, 'COMP582': {'sem': '0', 'prereq': [[]]}, 'COMP504': {'sem': '0', 'prereq': [[]]}, 'COMP506': {'sem': '1', 'prereq': [[]]}, 'COMP503': {'sem': '1', 'prereq': [['COMP382'], ['COMP215', 'COMP409', 'COMP509']]}, 'COMP502': {'sem': '1', 'prereq': [[]]}, 'COMP347': {'sem': '1', 'prereq': [['COMP182'], []]}, 'COMP509': {'sem': '0', 'prereq': [[]]}, 'COMP340': {'sem': '0', 'prereq': [['COMP140'], []]}, 'COMP450': {'sem': '0', 'prereq': [['COMP321'], ['COMP215']]}, 'COMP140': {'sem': '2', 'prereq': [[]]}, 'COMP215': {'sem': '0', 'prereq': [['COMP182']]}, 'COMP590': {'sem': '2', 'prereq': [[]]}, 'COMP591': {'sem': '0', 'prereq': [[]]}, 'COMP513': {'sem': '1', 'prereq': [[]]}, 'COMP511': {'sem': '1', 'prereq': [['COMP310']]}, 'COMP290': {'sem': '2', 'prereq': [[]]}, 'COMP690': {'sem': '2', 'prereq': [[]]}, 'COMP696': {'sem': '0', 'prereq': [[]]}, 'COMP611': {'sem': '0', 'prereq': [[]]}, 'COMP440': {'sem': '0', 'prereq': [['COMP310'], [], []]}, 'COMP448': {'sem': '0', 'prereq': [['COMP182']]}, 'COMP360': {'sem': '1', 'prereq': [['COMP321'], ['COMP182'], [], []]}, 'COMP560': {'sem': '1', 'prereq': [[]]}, 'COMP607': {'sem': '1', 'prereq': [[]]}, 'COMP600': {'sem': '2', 'prereq': [[]]}, 'COMP007': {'sem': '0', 'prereq': [[]]}, 'COMP800': {'sem': '2', 'prereq': [[]]}, 'COMP576': {'sem': '0', 'prereq': [[]]}, 'COMP571': {'sem': '0', 'prereq': [[]]}, 'COMP301': {'sem': '1', 'prereq': [[]]}, 'COMP541': {'sem': '1', 'prereq': [['COMP310']]}, 'COMP540': {'sem': '1', 'prereq': [[], []]}, 'COMP543': {'sem': '0', 'prereq': [[]]}, 'COMP545': {'sem': '1', 'prereq': [[]]}, 'COMP544': {'sem': '0', 'prereq': [[]]}, 'COMP547': {'sem': '1', 'prereq': [[]]}, 'COMP548': {'sem': '1', 'prereq': [[]]}, 'COMP380': {'sem': '0', 'prereq': [['COMP182']]}, 'COMP310': {'sem': '2', 'prereq': [['COMP215']]}, 'COMP311': {'sem': '0', 'prereq': [['COMP215']]}, 'COMP382': {'sem': '0', 'prereq': [['COMP182']]}, 'COMP182': {'sem': '1', 'prereq': [['COMP140']]}, 'COMP105': {'sem': '0', 'prereq': [[]]}, 'COMP650': {'sem': '1', 'prereq': [[]]}, 'COMP413': {'sem': '0', 'prereq': [['COMP310']]}, 'COMP412': {'sem': '0', 'prereq': [['COMP310', 'COMP215'], ['COMP321']]}, 'COMP411': {'sem': '1', 'prereq': [['COMP310']]}, 'COMP410': {'sem': '1', 'prereq': [['COMP310']]}, 'COMP496': {'sem': '0', 'prereq': [[]]}, 'COMP491': {'sem': '2', 'prereq': [[]]}, 'COMP490': {'sem': '2', 'prereq': [[]]}, 'COMP390': {'sem': '2', 'prereq': [[]]}, 'COMP557': {'sem': '0', 'prereq': [['COMP310'], [], []]}, 'COMP554': {'sem': '0', 'prereq': [[]]}, 'COMP550': {'sem': '0', 'prereq': [['COMP321'], ['COMP215']]}, 'COMP326': {'sem': '0', 'prereq': [[]]}, 'COMP321': {'sem': '1', 'prereq': [[], ['COMP215']]}, 'COMP322': {'sem': '1', 'prereq': [['COMP215']]}, 'COMP408': {'sem': '1', 'prereq': [[]]}, 'COMP409': {'sem': '0', 'prereq': [['COMP215'], ['COMP182']]}, 'COMP645': {'sem': '1', 'prereq': [[]]}, 'COMP403': {'sem': '1', 'prereq': [['COMP382'], ['COMP215', 'COMP409', 'COMP509']]}, 'COMP485': {'sem': '0', 'prereq': [[]]}, 'COMP480': {'sem': '1', 'prereq': [[]]}, 'COMP481': {'sem': '1', 'prereq': [[]]}, 'COMP522': {'sem': '1', 'prereq': [['COMP321'], ['COMP425']]}, 'COMP521': {'sem': '1', 'prereq': [['COMP215'], ['COMP321']]}, 'COMP526': {'sem': '1', 'prereq': [['COMP425']]}, 'COMP330': {'sem': '0', 'prereq': [[], ['COMP215']]}, 'COMP431': {'sem': '2', 'prereq': [[]]}, 'COMP430': {'sem': '2', 'prereq': [['COMP215'], ['COMP182']]}, 'COMP435': {'sem': '0', 'prereq': [[]]}, 'COMP436': {'sem': '0', 'prereq': [['COMP427', 'COMP541', 'COMP421', 'COMP521']]}, 'COMP539': {'sem': '1', 'prereq': [['COMP504']]}, 'COMP530': {'sem': '1', 'prereq': [['COMP321'], ['COMP430']]}, 'COMP531': {'sem': '2', 'prereq': [[]]}, 'COMP532': {'sem': '0', 'prereq': [['COMP421', 'COMP521']]}, 'COMP533': {'sem': '2', 'prereq': [[]]}, 'COMP534': {'sem': '0', 'prereq': [['COMP321']]}, 'COMP535': {'sem': '1', 'prereq': [[]]}, 'COMP536': {'sem': '0', 'prereq': [['COMP427', 'COMP541', 'COMP421', 'COMP521']]}}

function get_classes(major, degree) {
    var output = [];
    for (key in graph.keys()) {
        output.push({name:key});
    }
    return {courses:output};
}

router.post("/", function (req, response) {
    /*
    * POST /api/course
    */
   var body = req.body;
   console.log("[POST /api/course] body: ", body);

   var major = body.major;
   var degree = body.degree;
   var res = get_classes(major, degree)
    response.json(res);
});


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


router.post("/getstartpoint", function (req, response) {
    /*
    * POST /api/getstartpoint
    */
   var body = req.body;
   console.log("[POST /api/getstartpoint] body: ", body);

   var major = body.major;
   var degree = body.degree;
    
    var res = {
        "courses": [
            {
                "id": "1001",
                "name": "COMP 140",
                "taken": 0,     // -1 = not taken, 0 - 7 semester already taken
                "sems": [0, 1, 2],
            },
            {
                "id": "1002",
                "name": "COMP 182",
                "taken": -1,
                "sems": [1, 3],
            },
            {
                "id": "1003",
                "name": "COMP 215",
                "taken": -1,
                "sems": [2, 4],
            },
        ],
    };
    response.json(res);
});


module.exports = router;
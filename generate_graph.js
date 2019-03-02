const Node = require('./Node');

var course = {"347": {"prev": ["182"]}, "215": {"prev": ["182"]}, "311": {"prev": ["215"]}, "310": {"prev": ["215"]}, "330": {"prev": ["215"]}, "130": {"prev": [""]}, "340": {"prev": ["140"]}, "182": {"prev": ["130; 140; 160"]}, "322": {"prev": ["215"]}, "321": {"prev": ["220; 215"]}, "403": {"prev": ["382; 215"]}, "421": {"prev": ["215; 321"]}, "420": {"prev": ["421"]}, "422": {"prev": ["321"]}, "425": {"prev": [""]}, "424": {"prev": [""]}, "427": {"prev": ["310; 321"]}, "408": {"prev": [""]}, "140": {"prev": [""]}, "440": {"prev": ["310"]}, "380": {"prev": ["182"]}, "382": {"prev": ["182"]}, "160": {"prev": [""]}, "435": {"prev": [""]}, "410": {"prev": ["310"]}, "411": {"prev": ["211", " 310"]}, "412": {"prev": ["321; 322", " 310", " 215"]}, "413": {"prev": ["310"]}, "436": {"prev": [""]}, "326": {"prev": ["220"]}, "430": {"prev": [""]}, "431": {"prev": ["310", " 321"]}}

var course_arr = Object.keys(course);

var graph = [];

for (var i = 0; i < course_arr.length; i++) {
    var course_id = course_arr[i];
    var temp_node = new Node(course_id, course[course_id].prev)
    graph.push(temp_node)
}

module.exports = graph;


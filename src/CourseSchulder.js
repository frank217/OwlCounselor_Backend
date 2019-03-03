



/* Static Degree requirement */
var required_class = [["COMP140"],["COMP182"],["COMP215"],["COMP310"],["COMP321"],["COMP322"],["COMP382"],["COMP411","COMP412"],["COMP421"]]
var bottomlevelCourse = [] 
var toplevelCourse = []
// Elective : 2 course required (BS and BA)

// Cap : 4 -5 300 level or higher (BS)



/* Data for hashing static data */ 
var graph = require("./generate_graph");
var class_hash = {}
var class_rev_hash = {}
// TODO : add semester once it is in the data 
for (i=0; i<graph.length; i++) {
    prereqs = graph[i].prev;
    sem = graph[i].sem
    // console.log(graph[i].id)
    // console.log(prereqs)
    // console.log(graph[i].sem)
    // Add to prerequisite of class
    class_hash[graph[i].id] = {"prereq":graph[i].prev,"semavail":sem};
    // Add to postrequisite of class
    if (!(graph[i].id in class_rev_hash)) {
        class_rev_hash[graph[i].id] = {"postreq":[],"semavail":sem}
    }

    for (j=0; j<prereqs.length; j++) {
        prereq_class = prereqs[j];
        // if (prereq_class=="COMP182" || prereq_class.includes("COMP182")) {
        //     console.log(graph[i].id)
        // }
        if (prereq_class instanceof Array) {
            for (k=0; k<prereq_class.length; k++) {
                if (prereq_class[k] in class_rev_hash) {
                    class_rev_hash[prereq_class[k]]["postreq"].push(graph[i].id);
                } else {
                    class_rev_hash[prereq_class[k]] = {"postreq":[graph[i].id],"semavail":sem}
                }
            }
        } else {
            if (prereq_class in class_rev_hash) {
                class_rev_hash[prereq_class]["postreq"].push(graph[i].id);
            } else {
                class_rev_hash[prereq_class] = {"postreq":[graph[i].id],"semavail":sem}
            }
        }
    }
}
// console.log("prereq for 182",class_hash["COMP182"]["prereq"])
// console.log("class 182 is prereq of",class_rev_hash["COMP182"]["postreq"])
// console.log(class_rev_hash["310"])
// Object.keys(class_rev_hash).forEach(function(course,index) {
//     console.log(course);
//     console.log(class_hash[course]);
//     console.log(class_rev_hash[course]);
// });

function check_valid_semester(courses) {
    for (i=0; i < courses.length; i++) {
        var course = courses[i][0];
        var course_sem = courses[i][1];
        if (course_sem < 0 || course_sem > 7) {
            return false;
        }
        if (class_hash[course][sem] == "0") {
            if (course_sem % 2 == 1) {
                return false;
            }
        } else if (class_hash[course][sem] == "1") {
            if (course_sem % 2 == 0) {
                return false;
            }
        }
    }
    return false;
}

function get_starting_point(major, degree, sem, taken) {
    // Something like this, edit based on where graphs are and such
    var validation = validate(taken, sem)
    var valid_bool = false;
    var courses = [];
    if (validation == "valid") {
        valid = true;
        courses = recommendation([], sem);
    }
    return {valid:valid_bool, message:validation};
}

function validate(taken, sem) {
    var verified = [];
    var remaining = taken;
    while (remaining.length > 0) {
        var flag = true;
        for (r in remaining) {
            if (class_hash[r][prereq].every(elem => verified.indexOf(elem) > -1)) {
                verified.push(r);
                remaining.pop(r);
                flag = false
            }
        }
        if (flag) {
            return "Your courses have inadequate prerequisites!";
        }
    }

    // TODO bfs

    return "valid";
}

function get_classes(major, degree) {
    var output = [];
    for (key in graph.keys()) {
        output.push({name:key});
    }
    return {courses:output};
}

// Add all toplevel course : class with no postrequisite
Object.keys(class_rev_hash).forEach(function(course,index) {
    if (class_rev_hash[course]["postreq"] == "") {
        toplevelCourse.push(course);
    }
});

// Add all bottomlevel course : class with not prerequisite
Object.keys(class_hash).forEach(function(course,index) {
    if (class_hash[course]["prereq"] == "") {
        bottomlevelCourse.push(course)
    }
});
// console.log("bottomlevel Course:",bottomlevelCourse)
// console.log("toplevel Course:",toplevelCourse)



function processData() {
    //TODO save hastable of class : {"prereq":list_classes}
}

// Input are list of tuple(class and term)
function valid(list_class) {
    var classes  = {};
    for (i=0; i<list_class.length; i++) {
        var classname = list_class[i][0];
        var sem = list_class[i][1];
        classes[classname] = sem;
    }
    //TODO : create hashtable datastructure.
    // For each class we put in
    for (i=0; i<list_class.length; i++) {
        var classname = list_class[i][0];
        var sem = list_class[i][1];
        var prereqs = class_hash[classname]['prereq'];
        // console.log(classname, sem, prereqs);
        if (prereqs[0]!= "") {
            // Check if all prereq has been valid
            for (j=0; j<prereqs.length; j++) {
                prereq = prereqs[j]
                // Check if any cop-req is in our class
                flag = false;
                for (k=0; k<prereq.length; k++) {
                    // If prereq exist in classes and is before current class.
                    if (prereq[k] in classes && classes[prereq[k]]<sem) {
                        flag = true;
                    }
                }
                if (!flag) {
                    return false;
                }
            }
        }
    }
    return true;
}

/* Helper for checking if course is requirement */
function isitRequirement(course) {
    for (i=0;required_class.length;i++) {
        courseSet = required_class[i];
        if (courseSet.includes(course)) return true;
    }
    return false;
}

function recommendation(list_class,this_term) {

    var maxBound =5;
    /*  ------ Process hard_req, soft_req, elective ------ */
    var courses = {};
    // Add hard_req
    for (i=0; i<list_class.length; i++) {
        course = list_class[i][0];
        sem = list_class[i][1];
        courses[course] = {"type":"hardreq","sem":sem}
    }


    // Add soft_req
    // console.log(required_class)
    for (i=0;i<required_class.length;i++) {
        courseSet = required_class[i];
        nonetaken = true;
        for (j=0; j<courseSet.length;j++) {
            course = courseSet[j]
            if (course in courses) nonetaken = false;
            if (!(course in courses)) {
                // maxbound is not on the semeester
                
                if (class_hash[course]["semavail"] ==2) {
                    courses[course] = {"type":"softreq","upperbound":maxBound,"lowerbound":parseInt(this_term)}
                } else {
                    if (class_hash[course]["semavail"]!= maxBound%2) {
                        console.log(course)
                        console.log(class_hash[course]["semavail"],maxBound%2)
                        courses[course] = {"type":"softreq","upperbound":maxBound-1,"lowerbound":parseInt(this_term)}
                    } else {
                        courses[course] = {"type":"softreq","upperbound":maxBound,"lowerbound":parseInt(this_term)}
                    }
                }
            }
        }
        // None of the corequisite is taken any become soft requirement
        if (nonetaken) {
            for (j=0; j<courseSet.length;j++) {
                course = courseSet[j]
                if (!(course in courses)) {
                    // maxbound is not on the semeester
                    if (class_hash[course]["semavail"] ==2) {
                        courses[course] = {"type":"softreq","upperbound":maxBound,"lowerbound":parseInt(this_term)}
                    } else {
                        if (class_hash[course]["semavail"]!= maxBound%2) {
                            courses[course] = {"type":"softreq","upperbound":maxBound-1,"lowerbound":parseInt(this_term)}
                        } else {
                            courses[course] = {"type":"softreq","upperbound":maxBound,"lowerbound":parseInt(this_term)}
                        }
                    }
                }
            }
        // At least one is taken : other classes are elective
        } else {
            for (j=0; j<courseSet.length;j++) {
                course = courseSet[j];
                if (!(course in courses)) {
                    // maxbound is not on the semeester
                    if (class_hash[course]["semavail"] ==2) {
                        courses[course] = {"type":"elective","upperbound":maxBound,"lowerbound":parseInt(this_term)}
                    } else {
                        if (class_hash[course]["semavail"]!= maxBound%2) {
                            courses[course] = {"type":"elective","upperbound":maxBound-1,"lowerbound":parseInt(this_term)}
                        } else {
                            courses[course] = {"type":"elective","upperbound":maxBound,"lowerbound":parseInt(this_term)}
                        }
                    }
                }
            }
        }
    }
    // Add elective
    Object.keys(class_hash).forEach(function(course,index) {
        if (!(course in courses)) {
            courses[course] = {"type":"elective","upperbound":maxBound,"lowerbound":parseInt(this_term)}
        }
    });

    // // prints the course
    // Object.keys(courses).forEach(function(course,index) {
    //     console.log(course,courses[course]);
    // });
    /* ----------- Algorithm start ----------- */

    /* -- Set uperbounds of classes -- */

    // Run BFS : should work fine unless there is cycle which doesn't make sense(edgecase consideration)
    // If cycle ever occurs check cycle checker for it)
    queue = [];
    for (i = 0 ; i <toplevelCourse.length;i++) {
        course = toplevelCourse[i]
        if (courses[course]["type"] == "hardreq") {
            term  = courses[course]["sem"]
        } else {
            term  = courses[course]["upperbound"]
        } 
        queue.unshift([course,parseInt(term)]);
    }

    for (i = 0 ; i <list_class.length;i++) {
        course = list_class[i][0];
        // console.log(course,courses[course])
        if (courses[course]["type"] == "hardreq") {
            term  = courses[course]["sem"]
        } else {
            term  = courses[course]["upperbound"]
        } 
        queue.unshift([course,parseInt(term)]);
    }


    while (queue.length) {
        node = queue.pop();
        course = node[0];
        term = node[1];
        // add classes into class_range if not fixed then get is prereqs.
        if (courses[course]["type"] != "hardreq") {
            // console.log(course,term,courses[course]["upperbound"])

            if (term < courses[course]["upperbound"]) {
                // console.log(course,term)
                courses[course]["upperbound"] = term
            }
        }
        // Add hardreq and softreq prereq to queue
        if (courses[course]["type"] != "elective") { 
            prereqs = class_hash[course]["prereq"]
            for (i=0; i < prereqs.length; i++) { 
                prereq = prereqs[i];
                for (j=0; j < prereq.length;j++) {
                    single_prereq = prereq[j]
                    // if (class_hash[course]["semavail"] ==2 ) {
                        queue.unshift([single_prereq,term-1])
                    // } else {
                    //     if (class_hash[single_prereq]["semavail"] != (term)%2) {
                    //         queue.unshift([single_prereq,term-2])
                    //     } else{
                    //         queue.unshift([single_prereq,term-1])
                    //     }
                    // }
                }
            }
        }
    }

    // Object.keys(courses).forEach(function(course,index) {
    //     if (courses[course]["type"]== "softreq"){
    //         console.log(course,courses[course]);
    //     }
    // });


    /* -- Set uperbounds of classes -- */
    queue = [];
    for (i = 0 ; i <bottomlevelCourse.length;i++) {
        course = bottomlevelCourse[i]
        if (courses[course]["type"] == "hardreq") {
            term  = courses[course]["sem"]
        } else {
            term  = courses[course]["lowerbound"]
        } 
        queue.unshift([course,parseInt(term)]);
    }

    for (i = 0 ; i <list_class.length;i++) {
        course = list_class[i][0];
        // console.log(course,courses[course])
        if (courses[course]["type"] == "hardreq") {
            term  = courses[course]["sem"]
        } else {
            term  = courses[course]["lowerbound"]
        } 
        queue.unshift([course,parseInt(term)]);
    }

    // console.log(queue)

    while (queue.length) {
        node = queue.pop();
        course = node[0];
        term = node[1];
        // console.log(course)
        // add classes into class_range if not fixed then get is prereqs.
        if (courses[course]["type"] != "hardreq") {
            // console.log(course,term,courses[course]["lowerbound"])
            if (term > courses[course]["lowerbound"]) {
                // console.log(course,term)
                courses[course]["lowerbound"] = term
            }
        }

        // Add hardreq and softreq prereq to queue
        if (courses[course]["type"] != "elective") { 
            prereqs = class_rev_hash[course]["postreq"]
            console.log(prereqs)
            for (i=0; i < prereqs.length; i++) { 
                prereq = prereqs[i];
                console.log(prereq)
                // for (j=0; j < prereq.length;j++) {
                //     single_prereq = prereq[j];
                    // console.log(single_prereq)
                queue.unshift([prereq,term+1]);
                // }
            }
        }
    }
    Object.keys(courses).forEach(function(course,index) {
        if (courses[course]["type"]== "softreq"){
            console.log(course,courses[course]);
        }
    });


}


function getSemesters(course_name, lowerbound, upperbound) {
    var sems = []
    var sem = class_hash[course_name];
    if (sem == "0" || sem == "1") {
        for (i=lowerbound; i<upperbound; i+= 2) {
            sems.push(i);
        }
    } else {
        for (i=lowerbound; i<upperbound; i++) {
            sems.push(i);
        }
    }
    return sems;
}

// Return id, name, taken, sems
function convert_to_output(courses) {
    var output = [];
    for (var course in courses) {
        course_data = courses[course];
        var course_output = {};
        var taken = -1;
        var sems = [];
        if (course_data[type] == "hardreq") {
            var course_sem = course_data[sem];
            taken = course_sem;
            sems.push(course_sem);
        } else {
            sems = getSemesters(course, course_data[lowerbound], course_data[upperbound]);
        }
        output.push({name:course, taken:taken, sems:sems});
    }
    return output;
}


function getstartPoint(startterm) {
    return convert_to_output(recommendation([],startterm))
}

// input1 = [['130',0],['182',1]]
// console.log(valid(input1) + "should be True")
// input2 = [["130",0],["182",0]]
// console.log(valid(input2) + "should be False")
// input3 = [["130",0],["182",1],["215",2],["321",3]]
// console.log(valid(input3) + "should be False")
// input4 = [["130",0],["182",1],["220",1],["215",2],["321",3]]
// console.log(valid(input4) + "should be True")


// input4 = [["COMP140",0],["COMP182",1],["COMP321",5]]
// console.log(recommendation(input4,2) + "should be True")

// input4 = [["COMP140",0],["COMP182",1],["COMP321",5]]
// console.log(recommendation(input4,2) + "should be True")
input4 = []
console.log(recommendation(input4,0) + "should be True")



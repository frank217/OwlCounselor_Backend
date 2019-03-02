



/* Static Degree requirement */
var required_class = [["COMP140","COMP160"],["COMP182"],["COMP215"],["COMP310"],["COMP321"],["COMP322"],["COMP382"],["COMP411","COMP412"],["COMP421"]]
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
    class_hash[graph[i].id] = {"prereq":graph[i].prev,"sem":sem};
    // Add to postrequisite of class
    if (!(graph[i].id in class_rev_hash)) {
        class_rev_hash[graph[i].id] = {"postreq":[],"sem":sem}
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
                    class_rev_hash[prereq_class[k]] = {"postreq":[graph[i].id],"sem":sem}
                }
            }
        } else {
            if (prereq_class in class_rev_hash) {
                class_rev_hash[prereq_class]["postreq"].push(graph[i].id);
            } else {
                class_rev_hash[prereq_class] = {"postreq":[graph[i].id],"sem":sem}
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
                courses[course] = {"type":"softreq","upperbound":8,"lowerbound":parseInt(this_term)}
            }
        }
        // None of the corequisite is taken any become soft requirement
        if (nonetaken) {
            for (j=0; j<courseSet.length;j++) {
                course = courseSet[j]
                if (!(course in courses)) {
                    courses[course] = {"type":"softreq","upperbound":8,"lowerbound":parseInt(this_term)}
                }
            }
        // At least one is taken : other classes are elective
        } else {
            for (j=0; j<courseSet.length;j++) {
                course = courseSet[j]
                if (!(course in courses)) {
                    courses[course] = {"type":"elective","upperbound":8,"lowerbound":parseInt(this_term)}
                }
            }
        }
    }
    // Add elective
    Object.keys(class_hash).forEach(function(course,index) {
        if (!(course in courses)) {
            courses[course] = {"type":"elective","upperbound":8,"lowerbound":parseInt(this_term)}
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
                    queue.unshift([single_prereq,term-1])
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

    console.log(queue)

    while (queue.length) {
        node = queue.pop();
        course = node[0];
        term = node[1];
        // add classes into class_range if not fixed then get is prereqs.
        if (courses[course]["type"] != "hardreq") {
            // console.log(course,term,courses[course]["lowerbound"])

            if (term > courses[course]["lowerbound"]) {
                console.log(course,term)
                courses[course]["lowerbound"] = term
            }
        }
        // Add hardreq and softreq prereq to queue
        if (courses[course]["type"] != "elective") { 
            prereqs = class_hash[course]["prereq"]
            for (i=0; i < prereqs.length; i++) { 
                prereq = prereqs[i];
                for (j=0; j < prereq.length;j++) {
                    single_prereq = prereq[j]
                    queue.unshift([single_prereq,term+1])
                }
            }
        }
    }


    Object.keys(courses).forEach(function(course,index) {
        if (courses[course]["type"]== "softreq"){
            console.log(course,courses[course]);
        }
    });


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

input4 = [["COMP140",0],["COMP182",1],["COMP321",5]]
console.log(recommendation(input4,2) + "should be True")



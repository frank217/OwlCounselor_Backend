

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


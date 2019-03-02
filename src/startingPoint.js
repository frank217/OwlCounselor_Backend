

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
    return JSON.stringify(output);
}




function get_starting_point(major, degree, sem, taken) {
    // Something like this, edit based on where graphs are and such
    var graph = get_graph(major, degree);
    var validation = validate(graph, sem, taken)
    var valid = true;
    var courses = [];
    if (validation == "valid") {
        valid = true;
        assume_taken_dates(graph, sem, taken);
        courses = get_classes(graph);
    }
    return valid, validation, courses;
}

function validate(graph, sem, taken) {
    
}

function assume_taken_dates(graph, sem, taken) {

}

function get_classes(graph) {

}
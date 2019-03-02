

// Assume proper course graph is loaded 

function getStartingPoint(major, degree, sem, taken) {
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
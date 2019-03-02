// class node {
//     constructor(data) {
//         this.id = data[0]; //code 440, 410 etc
//         this.sem = data[1]; // 0 = fall, 1 = spring, 2 = fall,spring
//         this.prereq = data[3]; // List of nodes
//     }
//     get prereq() {
//         return this.prereq;
//     }
//     get id() {
//         return this.id;
//     }
//     get sem() {
//         return this.sem;
//     }
// }

var graph = require("./generate_graph");
var class_hash = {}
for (i=0; i<graph.length; i++) {
    prereqs = graph[i].prev;
    for (j=0; j<prereqs.length;j++) {

        prereqs[j] = prereqs[j].split("; ");
    }
    class_hash[graph[i].id] = {"prereq":graph[i].prev};
}
// console.log(class_hash);

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
        console.log(classname, sem, prereqs);
        if (prereqs[0]!="") {
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

// input1 = [['130',0],['182',1]]
// console.log(valid(input1) + "should be True")
// input2 = [["130",0],["182",0]]
// console.log(valid(input2) + "should be False")
input3 = [["130",0],["182",1],["215",2],["321",3]]
console.log(valid(input3) + "should be False")
// input4 = [["130",0],["182",1],["220",1],["215",2],["321",3]]
// console.log(valid(input4) + "should be True")
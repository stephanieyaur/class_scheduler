// Input: "MWF" "TuThu"
// Output: [0, 0, 0, 0, 0] where each index is whether the class meets on a day (0 DN meet, 1 meets) from MTuWThuF
const getDays = (days) => {
    var output = [0, 0, 0, 0, 0];
    const expected = ["M", "Tu", "W", "Th", "F"];
    expected.forEach((d, i) => {
        if (days.includes(d)) {
            output[i] = 1
        }
    });
    return output;
}

// Input: ["13:00","13:50"]
// Ouput: [13.00. 13.50]
const getTimes = (times) => {
    var output = [null, null];
    times.forEach((t, i) => {
        var splitHrMin = t.split(":");
        output[i] = parseInt(splitHrMin[0]) + (parseInt(splitHrMin[1]) * 0.01);
    });
    return output;
}

// Input:
// i.e. {
//     "term": "Winter",
//     "number": "330",
//     "meets": "MWF 13:00-13:50",
//     "title": "HCI"
// }
// Output: [[0, 0, 0, 0, 0], [13.00, 13.50]]
const getDaysAndTimes = (course) => {
    var meets = course.meets;
    var splitBySpace = meets.split(" ");
    var daysArr = getDays(splitBySpace[0]);
    var timeArr = getTimes(splitBySpace[1].split("-"));
    return [daysArr, timeArr];
}

// Input: [[0, 0, 0, 0, 0], [13.00, 13.50]]
// Output: bool
const checkConflict = (meet, selectedClassesMeets) => {
    for (var x of selectedClassesMeets) {
        for (var d=0; d<x[0].length; d++) {
            if (x[0][d] == meet[0][d]) {
                var startTime = meet[1][0];
                var endTime = meet[1][1];
                if ((startTime <= x[1][1] && startTime >= x[1][0]) || (endTime <= x[1][1] && endTime >= x[1][0])){
                    return true;
                }
            };
        };
    };
    return false;
}

const driver = (course, courseJson, selectedClassesMeets, setSelectedClassesMeets, selectedClasses, setSelectedClasses) => {
    var courseData = courseJson[course];
    var meet = getDaysAndTimes(courseData);
    if (!checkConflict(meet, selectedClassesMeets)){
        setSelectedClasses([...selectedClasses, course]);
        setSelectedClassesMeets([...selectedClassesMeets, meet]);
    }
}

export default driver;
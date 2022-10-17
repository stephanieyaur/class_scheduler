export const isClassSelected = (courseNum, selectedClasses) => {
    for (var i=0; i<selectedClasses.length; i++){
        if (courseNum == selectedClasses[i]) return true;
    }
    return false;
}

// Input: anything but should be in form "MTuWThF"
const validDays = (val) => {
    var i = 0;
    while (i<val.length){
        if (val[i] == "M" || val[i] == "W" || val[i] == "F") {
            i++;
            continue;
        }
        if (val[i] == "T"){
            if (i!=val.length-1 && (val[i+1] == "u" || val[i+1] == "h")){
                i+=2;
                continue;
            } 
        }
        return false;
    }
    return true;
}


// Input: anything but should be in form "MTuWThF 12:00-12:50"
export const isValidMeetSyntax = (val) => {
    if (val === "" || val === null) return false;
    // need space between days and times
    if (val.split(" ").length !== 2) return false;
    // need days of week
    var daysAndTimes = val.split(" ");
    if (getDays(daysAndTimes[0]).filter(x => x===0).length === 5 || !validDays(daysAndTimes[0])) return false;
    // need range of times
    if (daysAndTimes[1].split("-").length !== 2) return false;
    // need two valid times
    var times = daysAndTimes[1].split("-");
    for (var i = 0; i<2; i++){
        if (times[i].split(":").length !== 2) return false;
        var hourAndMin = times[i].split(":");
        if (parseInt(hourAndMin[0]) < 0 || parseInt(hourAndMin[0]) > 24) return false;
        if (isNaN(hourAndMin[0])===true || hourAndMin[0].length !== 2 || parseInt(hourAndMin[0]) < 0 || parseInt(hourAndMin[0]) > 24) return false;
        if (isNaN(hourAndMin[1])===true || hourAndMin[1].length !== 2 || parseInt(hourAndMin[1]) < 0 || parseInt(hourAndMin[1]) > 59) return false;
    }
    return true;
}


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
// "MWF 13:00-13:50",
// Output: [[0, 0, 0, 0, 0], [13.00, 13.50]]
export const getDaysAndTimes = (meets) => {
    var splitBySpace = meets.split(" ");
    var daysArr = getDays(splitBySpace[0]);
    var timeArr = getTimes(splitBySpace[1].split("-"));
    return [daysArr, timeArr];
}

// Input: [[0, 0, 0, 0, 0], [13.00, 13.50]]
// Output: bool
export const checkConflictAdd = (meet, selectedClassesMeets) => {
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

// Input: [[0, 0, 0, 0, 0], [13.00, 13.50]]
// Output: bool
export const checkConflictReplace = (courseNum, meet, selectedClasses, selectedClassesMeets) => {
    if (selectedClasses) {
        for (var i=0; i<selectedClasses.length; i++) {
            if (selectedClasses[i] !== courseNum) {
                var x = selectedClassesMeets[i]
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
        };
    }
    return false;
}

// Input: course meeting time textbox val, "F101", ["F101", "F102"], [[[0,0,0,0,0], [13.00, 13.50]],[[0,0,0,0,0], [13.00, 13.50]]]
export const isValidMeet = (val, courseNum, selectedClasses, selectedClassesMeets) => {
    console.log(selectedClasses);
    if (!isValidMeetSyntax(val)) return false;
    var meet = getDaysAndTimes(val);
    if (checkConflictReplace(courseNum, meet, selectedClasses, selectedClassesMeets)) return false;
    return true;
}

export const driver = (course, courseJson, selectedClassesMeets, setSelectedClassesMeets, selectedClasses, setSelectedClasses) => {
    var courseData = courseJson[course];
    var meet = getDaysAndTimes(courseData.meets);
    if (!checkConflictAdd(meet, selectedClassesMeets)){
        setSelectedClasses([...selectedClasses, course]);
        setSelectedClassesMeets([...selectedClassesMeets, meet])
    }
}
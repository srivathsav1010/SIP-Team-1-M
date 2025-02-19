const subjects = ["SIP", "EEP"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["9:00 - 10:00 AM", "10:00 - 11:00 AM", "11:00 - 12:00 PM", "1:00 - 2:00 PM", "2:00 - 3:00 PM", "3:00 - 4:00 PM"];
const sections = Array.from({ length: 14 }, (_, i) => `Section ${i + 1}`);
const sipSections = sections.slice(0, 7);
const eepSections = sections.slice(7);
const facultySIP = Array.from({ length: 25 }, (_, i) => `SIP Faculty ${i + 1}`);
const facultyEEP = Array.from({ length: 25 }, (_, i) => `EEP Faculty ${i + 1}`);

function getRandomFaculty(facultyList, assignedFaculties) {
    let availableFaculties = facultyList.filter(f => !assignedFaculties.includes(f));
    if (availableFaculties.length === 0) return null;
    return availableFaculties[Math.floor(Math.random() * availableFaculties.length)];
}

function generateTimetable() {
    let timetable = {};
    let facultySchedule = {};
    
    days.forEach(day => {
        timetable[day] = [];
        let assignedFaculties = [];
        let availableTimeSlots = [...timeSlots];
        
        sipSections.forEach(section => {
            if (availableTimeSlots.length < 2) return;
            let faculty = getRandomFaculty(facultySIP, assignedFaculties);
            if (faculty) assignedFaculties.push(faculty);
            let periods = availableTimeSlots.splice(0, 2);
            timetable[day].push({ section, time: periods.join(", "), subject: "SIP", faculty });
        });
        
        eepSections.forEach(section => {
            if (availableTimeSlots.length < 3) return;
            let faculty = getRandomFaculty(facultyEEP, assignedFaculties);
            if (faculty) assignedFaculties.push(faculty);
            let periods = availableTimeSlots.splice(0, 3);
            timetable[day].push({ section, time: periods.join(", "), subject: "EEP", faculty });
        });
    });
    return timetable;
}

function displayTimetable(timetable) {
    for (const day in timetable) {
        console.log(`\n${day}`);
        console.log("----------------------------");
        timetable[day].forEach(session => {
            console.log(`${session.section} | ${session.time} - ${session.subject} | Faculty: ${session.faculty}`);
        });
    }
}

const randomTimetable = generateTimetable();
displayTimetable(randomTimetable);

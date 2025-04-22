const readline = require("readline-sync");

function getUserInput(promptMessage, defaultValue) {
    let input = readline.question(`${promptMessage} (Default: ${defaultValue}): `);
    return input ? parseInt(input) : defaultValue;
}

const totalSections = getUserInput("Enter the total number of sections", 14);
const sipCount = getUserInput("Enter the number of SIP sections", Math.ceil(totalSections / 2));
const eepCount = getUserInput("Enter the number of EEP sections", totalSections - sipCount);
const totalFaculty = getUserInput("Enter the total number of faculty", 30);

const subjects = ["SIP", "EEP"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const sipTimeSlots = [
    "10:10 - 12:10 PM", "1:00 - 3:00 PM"
];
const eepTimeSlots = [
    "9:10 - 12:10 PM", "12:10 - 4:00 PM (Lunch Break: 1:10 - 2:00 PM)"
];

const sections = Array.from({ length: totalSections }, (_, i) => `Section ${i + 1}`);
const sipSections = sections.slice(0, sipCount);
const eepSections = sections.slice(sipCount, sipCount + eepCount);
const facultyMembers = Array.from({ length: totalFaculty }, (_, i) => `Faculty ${i + 1}`);

function getRandomFaculty(assignedFaculties) {
    let availableFaculties = facultyMembers.filter(f => !assignedFaculties.includes(f));
    if (availableFaculties.length === 0) return null;
    return availableFaculties[Math.floor(Math.random() * availableFaculties.length)];
}

function generateTimetable() {
    let timetable = {};
    let sectionAssignedDays = {};
    sections.forEach(section => (sectionAssignedDays[section] = false));
    
    days.forEach(day => {
        timetable[day] = [];
        let assignedFaculties = [];
        
        sipSections.forEach(section => {
            if (sectionAssignedDays[section]) return;
            let faculty = getRandomFaculty(assignedFaculties);
            if (faculty) assignedFaculties.push(faculty);
            let time = sipTimeSlots[Math.floor(Math.random() * sipTimeSlots.length)];
            timetable[day].push({ section, time, subject: "SIP", faculty });
            sectionAssignedDays[section] = true;
        });
        
        eepSections.forEach(section => {
            if (sectionAssignedDays[section]) return;
            let faculty = getRandomFaculty(assignedFaculties);
            if (faculty) assignedFaculties.push(faculty);
            let time = eepTimeSlots[Math.floor(Math.random() * eepTimeSlots.length)];
            timetable[day].push({ section, time, subject: "EEP", faculty });
            sectionAssignedDays[section] = true;
        });
    });
    
    return timetable;
}

function displayTimetable(timetable) {
    console.log(`Total Faculty: ${totalFaculty}`);
    for (const day in timetable) {
        console.log(`\n${day}`);
        console.log("----------------------------");
        timetable[day].forEach(session => {
            console.log(`${session.section} | ${session.time} - ${session.subject} | Faculty: ${session.faculty}`);
        });
    }
}

function renderTimetable(timetable) {
    let html = `
        <table>
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>DAY</th>
              <th>CLASS</th>
              <th>SESSION</th>
              <th>FACULTY-1</th>
              <th>FACULTY-2</th>
              <th>FACULTY-3</th>
            </tr>
          </thead>
          <tbody>
    `;

    let serialNumber = 1;
    for (const day of days) {
        timetable[day].forEach((session) => {
            html += `
                <tr>
                  <td>${serialNumber++}</td>
                  <td>${day}</td>
                  <td>${session.section}</td>
                  <td>${session.time}</td>
                  <td>${session.faculty || ""}</td>
                  <td></td>
                  <td></td>
                </tr>
            `;
        });
    }

    html += `
          </tbody>
        </table>
    `;

    document.getElementById("output").innerHTML = html;
}

function showPage(id) {
  const pages = ["home", "login", "timetable", "contact"];
  pages.forEach(page => {
    document.getElementById(page).style.display = page === id ? "block" : "none";
  });
}

const randomTimetable = generateTimetable();
displayTimetable(randomTimetable);

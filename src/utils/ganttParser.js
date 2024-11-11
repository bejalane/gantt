const moment = require('moment');

// Sample tasks input
const tasks = [
    { name: 'get data', assignee: 1, estimation: 3 },
    { name: 'create table', assignee: 1, estimation: 2 },
    { name: 'create backend pagination', assignee: 2, estimation: 1.5 },
];

// Sample settings input
const startH1 = '2024-11-11';
const globalSettings = {
    assignees: {
        'Shir': { startDate: startH1 }, 
        'adi': { startDate: startH1 },
        'Alex': { startDate: startH1 },
        'Tal': { startDate: startH1 },
        
    },
    weekends: ['Friday', 'Saturday'], // weekends are Sat-Sun
    holidays: ['2024-10-05'], // custom holidays
};

// Helper function to check if a day is a weekend
function isWeekend(date, weekends) {
    const dayOfWeek = moment(date).format('dddd');
    return weekends.includes(dayOfWeek);
}

// Helper function to check if a day is a holiday
function isHoliday(date, holidays) {
    return holidays.includes(moment(date).format('YYYY-MM-DD'));
}

// Helper function to get next working day (skipping weekends and holidays)
function getNextWorkingDay(startDate, weekends, holidays) {
    let currentDate = moment(startDate);
    while (
        isWeekend(currentDate, weekends) ||
        isHoliday(currentDate, holidays)
    ) {
        currentDate = currentDate.add(1, 'days');
    }
    return currentDate;
}

// Main function to create a Gantt chart for tasks
function buildGantt(tasks, settings) {
    const gantt = [];

    const assigneeWorkDays = {}; // Track the last working day for each assignee

    tasks.forEach((task) => {
        const assigneeId = task.assignee;
        const estimation = task.estimation;
        console.log(assigneeWorkDays[assigneeId]);
        if (!assigneeWorkDays[assigneeId]) {
            // If it's the first task for this assignee, set their start date
            assigneeWorkDays[assigneeId] = moment(
                settings.assignees[assigneeId].startDate
            );
        }

        // Find the next working day start for the assignee
        let taskStartDate = getNextWorkingDay(
            assigneeWorkDays[assigneeId],
            settings.weekends,
            settings.holidays
        );

        // Calculate task end date by adding estimation (in days) while skipping weekends/holidays
        let daysToAdd = estimation;
        let taskEndDate = taskStartDate.clone();
        
        while (daysToAdd > 0) {
            
            taskEndDate = taskEndDate.add(1, 'days');
            if (
                !isWeekend(taskEndDate, settings.weekends) &&
                !isHoliday(taskEndDate, settings.holidays)
            ) {
                daysToAdd -= 1;
            }
        }

        // Record the Gantt chart entry
        gantt.push({
            assigneeId,
            taskName: task.name,
            startDate: taskStartDate.format('YYYY-MM-DD'),
            endDate: taskEndDate.format('YYYY-MM-DD'),
        });

        // Update the last working day for this assignee
        assigneeWorkDays[assigneeId] = taskEndDate;
    });

    return gantt;
}

// Call the function and output the Gantt chart
export const ganttChart = buildGantt(tasks, (settings = globalSettings));
console.log(ganttChart);

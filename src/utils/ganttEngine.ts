import moment from 'moment';

// Define types for tasks and settings
type Task = {
    id: string;
    name: string;
    assignee: string;
    estimation: number; // In days, can be a decimal
};

type AssigneeSettings = {
    start: string;
};

type Settings = {
    assignees: Record<string, AssigneeSettings>; // Map of assignee IDs to their settings
    weekends: string[]; // List of weekend days (e.g., ['Saturday', 'Sunday'])
    holidays: string[]; // List of holidays in 'YYYY-MM-DD' format
};

type GanttEntry = {
    id: string;
    assigneeId: string;
    taskName: string;
    start: string;
    end: string;
};

// Sample tasks input
// const tasks: Task[] = [
//     { name: 'get data', assignee: 1, estimation: 3 },
//     { name: 'create table', assignee: 1, estimation: 2 },
//     { name: 'create backend pagination', assignee: 2, estimation: 1.5 },
// ];

// Sample settings input
const settings: Settings = {
    assignees: {
        Alex: { start: '2024-10-22' },
        Grom: { start: '2024-10-28' },
    },
    weekends: ['Friday', 'Saturday'],
    holidays: ['2024-10-05'],
};

// Helper function to check if a day is a weekend
export function isWeekend(
    date: moment.Moment,
    weekends: string[] = ['Friday', 'Saturday']
): boolean {
    const dayOfWeek = date.format('dddd');
    return weekends.includes(dayOfWeek);
}

// Helper function to check if a day is a holiday
export function isHoliday(
    date: moment.Moment,
    holidays: string[] = settings.holidays
): boolean {
    return holidays.includes(date.format('YYYY-MM-DD'));
}

// Helper function to get the next working day (skipping weekends and holidays)
function getNextWorkingDay(
    start: moment.Moment,
    weekends: string[],
    holidays: string[]
): moment.Moment {
    let currentDate = moment(start);
    while (
        isWeekend(currentDate, weekends) ||
        isHoliday(currentDate, holidays)
    ) {
        currentDate = currentDate.add(1, 'days');
    }
    return currentDate;
}

// Main function to create a Gantt chart for tasks
export function buildGantt(tasks: Task[]): GanttEntry[] {
    const gantt: GanttEntry[] = [];
    const assigneeWorkDays: Record<string, moment.Moment> = {};

    tasks.forEach((task) => {
        const id = task.id;
        const assigneeId = task.assignee;
        const estimation = task.estimation;
        console.log(assigneeId);

        // If it's the first task for this assignee, set their start date
        if (!assigneeWorkDays[assigneeId]) {
            assigneeWorkDays[assigneeId] = moment(
                settings.assignees[assigneeId]?.start
            );
        }

        // Find the next working day start for the assignee
        const taskStartDate = getNextWorkingDay(
            assigneeWorkDays[assigneeId],
            settings.weekends,
            settings.holidays
        );

        // Calculate task end date by adding estimation (in days) while skipping weekends/holidays
        let daysToAdd = estimation;
        let taskEndDate = taskStartDate.clone();
        let i = 0;
        while (daysToAdd > 0) {
            taskEndDate = taskEndDate.add(i > 0 ? 1 : 0, 'days');
            i = i + 1;
            if (
                !isWeekend(taskEndDate, settings.weekends) &&
                !isHoliday(taskEndDate, settings.holidays)
            ) {
                daysToAdd -= 1;
            }
        }

        // Record the Gantt chart entry
        gantt.push({
            id,
            assigneeId,
            taskName: task.name,
            start: taskStartDate.format('YYYY-MM-DD'),
            end: taskEndDate.format('YYYY-MM-DD'),
        });

        // Update the last working day for this assignee
        assigneeWorkDays[assigneeId] = taskEndDate;
    });

    return gantt;
}

// Call the function and export the result
export const ganttChart = (tasks: Task[]) => buildGantt(tasks);

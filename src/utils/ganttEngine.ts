import moment from 'moment';
import { Task } from '../interfaces/Task';
import { AssigneeSettings } from '../interfaces/AssigneeSettings';
// import { v4 as uuidv4 } from 'uuid';

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
    parent?: string;
    epic?: string;
    eta?: number;
};

// Sample tasks input
// const tasks: Task[] = [
//     { name: 'get data', assignee: 1, estimation: 3 },
//     { name: 'create table', assignee: 1, estimation: 2 },
//     { name: 'create backend pagination', assignee: 2, estimation: 1.5 },
// ];

// Sample settings input
const globalSettings: Settings = {
    assignees: {},
    weekends: ['Friday', 'Saturday'],
    holidays: [
        '2025-04-12',
        '2025-04-13',
        '2025-04-30',
        '2025-05-01',
        '2025-06-01',
        '2025-06-02',
        '2025-09-22',
        '2025-09-23',
        '2025-09-24',
        '2025-10-01',
        '2025-10-01',
        '2025-10-06',
        '2025-10-07',
        '2025-10-13',
        '2025-10-14',
    ],
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
    holidays: string[] = globalSettings.holidays
): boolean {
    return holidays.includes(date.format('YYYY-MM-DD'));
}

// Helper function to get the next working day (skipping weekends and holidays)
function getNextWorkingDay(
    start: moment.Moment,
    weekends: string[],
    holidays: string[],
    vacation: string[]
): moment.Moment {
    let currentDate = moment(start);
    while (
        isWeekend(currentDate, weekends) ||
        isHoliday(currentDate, holidays) ||
        isHoliday(currentDate, vacation)
    ) {
        currentDate = currentDate.add(1, 'days');
    }
    return currentDate;
}

// Main function to create a Gantt chart for tasks
export function buildGantt({
    tasks,
    assigneeSettings,
}: {
    tasks: Task[];
    assigneeSettings: AssigneeSettings;
}): GanttEntry[] {
    const settings = { ...globalSettings, assignees: assigneeSettings };
    const gantt: GanttEntry[] = [];
    const assigneeWorkDays: Record<string, moment.Moment> = {};

    tasks.forEach((task) => {
        // let currentEpicId = '';
        // if (task.epic && !gantt.find((item) => item.taskName === task.epic)) {
        //     currentEpicId = uuidv4();
        //     gantt.push({
        //         id: currentEpicId,
        //         assigneeId: '',
        //         taskName: task.epic,
        //         start: '',
        //         end: '',
        //     });
        // }
        const id = task.id;
        const assigneeId: string = task.assignee;
        const estimation = task.estimation;

        // If it's the first task for this assignee, set their start date
        if (!assigneeWorkDays[assigneeId]) {
            assigneeWorkDays[assigneeId] = moment(
                settings.assignees[assigneeId].startDate
            );
        }

        // Find the next working day start for the assignee
        const taskStartDate = getNextWorkingDay(
            assigneeWorkDays[assigneeId],
            settings.weekends,
            settings.holidays,
            settings.assignees[assigneeId].vacationDates
        );

        // Calculate task end date by adding estimation (in days) while skipping weekends/holidays
        let daysToAdd = estimation;
        let taskEndDate = taskStartDate.clone();
        let i = 0;
        while (daysToAdd > 0) {
            console.log('daysToAdd: ', task.name, daysToAdd);
            if (daysToAdd !== 1) {
                taskEndDate = taskEndDate.add(1, 'days');
            }
            if (
                !isWeekend(taskEndDate, settings.weekends) &&
                !isHoliday(taskEndDate, settings.holidays) &&
                !isHoliday(
                    taskEndDate,
                    settings.assignees[assigneeId].vacationDates
                )
            ) {
                daysToAdd -= 1;
            }
            i = i + 1;
        }

        // Record the Gantt chart entry
        if (estimation) {
            const createdTask: GanttEntry = {
                id: id || task.name,
                assigneeId,
                taskName: task.name,
                start: taskStartDate.format('YYYY-MM-DD'),
                end: taskEndDate.format('YYYY-MM-DD'),
                epic: task.epic,
                eta: task.estimation,
            };

            // if (currentEpicId) {
            //     createdTask.parent = currentEpicId;
            // }
            gantt.push(createdTask);

            // Update the last working day for this assignee
            assigneeWorkDays[assigneeId] = taskEndDate.clone().add(1, 'days');
        }
    });
    console.log('gantt: ', gantt);
    return gantt;
}

// Call the function and export the result
export const ganttChart = ({
    tasks,
    assigneeSettings,
}: {
    tasks: Task[];
    assigneeSettings: AssigneeSettings;
}) =>
    buildGantt({
        tasks,
        assigneeSettings,
    });

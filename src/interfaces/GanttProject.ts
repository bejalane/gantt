import { AssigneeSettings } from './AssigneeSettings';
import { Task } from './Task';

export type GanttProject = {
    name: string;
    data: {
        tasks: Task[];
        assigneeSettings: AssigneeSettings;
    };
    id: string;
};

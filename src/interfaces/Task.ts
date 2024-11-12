export type Task = {
    id?: string;
    name: string;
    assignee: string;
    estimation: number; // In days, can be a decimal
    epic?: string;
};

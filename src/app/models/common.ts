export enum ETaskState {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed'
}

export enum EPriorityValue {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export enum EPriorityLabel {
    P1 = 'P1',
    P2 = 'P2',
    P3 = 'P3'
}

export type TPriorities = {
    label: EPriorityLabel;
    value: EPriorityValue;
}[];

export type TUserRegister = {
    name: string;
    email: string;
    password: string;
}

export type TUserLogin = {
    email: string;
    password: string;
}
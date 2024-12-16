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

export type TTask = {
    title: string;
    status: ETaskState;
    priority: EPriorityValue;
    dueDate: string;
    userId: string;
}

export type TTaskUpdate = {
    id: number;
    title: string;
    status: ETaskState;
    priority: EPriorityValue;
    due_date: string;
    deleted_at?: string;
}

export type TUserLoginResponse = {
    message: string;
    token: string;
    userDetails: TUserDetails;
}

export type TUserDetails = {
    userId: string;
    name: string;
    email: string;
}
export type TCommonResponse = {
    message: string;
}
export interface IToastModel<T extends ToastColor> {
    color: T
    text: string;
    success?: (message: string) => void;
    error?: (error: Error) => void;
    warn?: (message: string) => void;
}

export enum ToastColor {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warning'
}
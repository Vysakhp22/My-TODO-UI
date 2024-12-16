export class CommonRoute {
    private static readonly baseUrl = 'http://localhost:3000';

    public static readonly login = `${this.baseUrl}/user/login`;

    public static readonly register = `${this.baseUrl}/user/signup`;

    public static readonly addTask = `${this.baseUrl}/todo/createTask`;

    public static readonly updateTask = `${this.baseUrl}/todo/updateTask`;

    public static readonly taskList = `${this.baseUrl}/todo/tasks`;

    public static readonly getTaskById = `${this.baseUrl}/todo/getTasks`;

    public static readonly deleteTask = `${this.baseUrl}/todo/deleteTask`;

}
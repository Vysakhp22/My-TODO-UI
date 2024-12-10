export class CommonRoute {
    private static readonly baseUrl = 'http://localhost:3000';

    public static readonly login = `${this.baseUrl}/user/login`;
    
    public static readonly register = `${this.baseUrl}/user/signup`;
}
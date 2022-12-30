export class AuthResponse {
    constructor(
        public isSuccess: boolean = false,
        public message: string | null = null,
        public accessToken: string | null = null,
        public refreshToken: string | null = null,
        public username: string | null = null,
        public permissionsLevel: string | null = null
    ) {}
}
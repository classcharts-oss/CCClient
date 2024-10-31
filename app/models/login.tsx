export interface LoginResponse extends Response {
    meta: {
        session_id: string
    }
}
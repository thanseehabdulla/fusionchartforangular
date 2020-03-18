// interface to represent user

export interface User {
    success: string,
    message: string,
    token: string,
    user: {
        name: string,
        email: string
    },
    expires: {
        expires_in: string,
        expires_timestamp: number
    }
}
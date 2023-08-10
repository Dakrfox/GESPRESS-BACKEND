export type BasicResponse = {
    message: string
}

/**
 * Error JSON response for Controllers
 */
export type ErrorResponse = {
    error: string,
    message: string
}

/**
 * Auth JSON response for Controllers
 */
 export type AuthResponse = {
    message: string,
    id: string
    token: string
}
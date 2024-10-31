export interface Response {
    data: {} | [] | undefined
    meta: {} | []

    success: number
    expired: number | undefined

    error: string | undefined
}
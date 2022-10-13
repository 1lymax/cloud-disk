import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    )
}

export const getErrorMessage = (err:any) => {
    if (isErrorWithMessage(err)) {
        return err.message
    }
    if ('data' in err && 'message' in err.data) {
        return err.data.message
    }
    if (isFetchBaseQueryError(err)) {
        return 'error' in err ? err.error : JSON.stringify(err.data)
    }
};
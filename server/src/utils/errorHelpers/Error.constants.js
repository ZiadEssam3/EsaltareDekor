module.exports = {
    STATUS_CODES: {
        // 1xx - Informational
        CONTINUE: 100,
        SWITCHING_PROTOCOLS: 101,
        PROCESSING: 102,
        // 2xx - Success
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        // 3xx - Redirection
        MOVED_PERMANENTLY: 301,
        FOUND: 302,
        NOT_MODIFIED: 304,
        // 4xx - Client Errors
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAYMENT_REQUIRED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        CONFLICT: 409,
        GONE: 410,
        UNPROCESSABLE_ENTITY: 422,
        TOO_MANY_REQUESTS: 429,
        // 5xx - Server Errors
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504
    },

    ERRORS: {
        // General
        SOMETHING_WENT_WRONG: 'Something went wrong. Please try again later.',
        SERVER_ERROR: 'Internal server error.',
        ROUTE_NOT_FOUND: 'The requested route does not exist.',
        INVALID_REQUEST: 'Invalid request.',
        REQUEST_TIMEOUT: 'Request timed out. Please try again.',
        // Auth
        UNAUTHORIZED: 'You are not authorized to perform this action.',
        INVALID_CREDENTIALS: 'Invalid email or password.',
        TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
        ACCESS_DENIED: 'Access denied. You do not have permission.',
        // Validation
        VALIDATION_ERROR: 'Invalid request data',
        MISSING_FIELDS: 'Required fields are missing.',
        INVALID_EMAIL_FORMAT: 'Email format is invalid.',
        PASSWORD_TOO_WEAK: 'Password does not meet security requirements.',
        // User-related
        USER_NOT_FOUND: 'User not found.',
        EMAIL_ALREADY_EXISTS: 'Email is already registered.',
        USER_ALREADY_EXISTS: 'User already exists.',
        ACCOUNT_DISABLED: 'Your account has been disabled.',
        // Resource/DB
        RESOURCE_NOT_FOUND: 'Requested resource not found.',
        RESOURCE_CONFLICT: 'Conflict: resource already exists.',
        DATABASE_ERROR: 'A database error occurred.',
        DATA_NOT_SAVED: 'Data could not be saved.',
        // Rate limiting
        RATE_LIMIT_EXCEEDED: 'Too many requests. Please slow down.',
        // File Upload
        FILE_TOO_LARGE: 'Uploaded file is too large.',
        UNSUPPORTED_FILE_TYPE: 'Unsupported file type.'
    }
};

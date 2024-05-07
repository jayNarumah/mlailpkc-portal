export interface Message {
    message: string;
}

export interface HttpClientResponseError {
    statusText: string;
    error: {
        message: ApiError;
    };
}

export interface ApiError {
    error: string;
    message: string;
    statusCode: number;
}

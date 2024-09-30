export const errorResponse = (error) => {
    const response = {
        error: error,
    };

    return response;
};

export const successResponse = (code, status, msg, data) => ({
    meta: {
        code,
        status,
        message: msg,
    },
    data,
});

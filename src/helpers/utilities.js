export const controllerWrapper = fn => async (req, res, next) => {
    try {
        return await fn(req, res, next);
    } catch (err) {
        return next(err);
    }
};

export const isInteger = number => Number.isInteger(Number(number));

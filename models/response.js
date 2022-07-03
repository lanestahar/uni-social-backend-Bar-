const success = (message, results, statusCode) => {
    return {
        message,
        success: true,
        code: statusCode,
        results
    };
};

const error = (message, statusCode) => {

    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        success: false,
        code: statusCode
    }
}

module.exports = {success, error}
 
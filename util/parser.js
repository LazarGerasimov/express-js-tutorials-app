function parseError(error) {
    if (error.name == 'ValidationError') {  // mongoose validation error
        return Object.values(error.errors).map(v => v.message);
    } else if (Array.isArray(error)) {
        return error.map(error => error.msg); // needed for express-validator
    }
    else {
        return error.message.split('\n'); // user error
    }
}

module.exports = {
    parseError
}
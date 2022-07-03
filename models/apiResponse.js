class Response {
    success(message, results){
        return {
            message,
            success: true,
            results
        }
    }

    failure(message) {
        return {
            message,
            success: false,
            
        }
    }
}

module.exports = new Response();
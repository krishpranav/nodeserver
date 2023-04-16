var querrystring = require('querystring')
BufferJoiner = require('bufferjoiner')

module.exports = function() {
    return function(request, response, next) {
        if (!request.method.match(/(PUT|POST|OPTIONS)/)) {
            return next()
        }
        request.rawBody = new BufferJoiner();
        request.on('data', function(chunk) {
            request.rawBody(chunk)
        })

        request.once('end', function() {
            request.rawBody = request.rawBody.join()
            if (!request.headers['content-type']) return
        })
    }
}
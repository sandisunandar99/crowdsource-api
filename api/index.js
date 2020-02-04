const register = (server, options, next) => {
  const preResponse = (request, reply) => {
    let response = request.response
    if (response.isBoom) {
      const reformated = { errors: {} }
      reformated.errors[response.output.statusCode] = [response.output.payload.message]
      return reply(reformated).code(response.output.statusCode)
    }
    return reply.continue()
  }

  server.register(require('./users'))

  server.ext('onPreResponse', preResponse)

  server.route({
    method: 'GET',
    path: '/status',
    config: {
      description: 'Check status',
      notes: 'Return the current status of the API',
      tags: ['api', 'status']
    },
    handler: (request, reply) => {
      return reply({status: 'UP'})
    }
  })
  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
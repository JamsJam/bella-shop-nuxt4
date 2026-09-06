import { getRequestURL, getResponseStatus } from 'h3'

export default defineNitroPlugin((nitroApp) => {
  const startedAt = new WeakMap<object, number>()

  nitroApp.hooks.hook('request', (event) => {
    startedAt.set(event, performance.now())
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    const start = startedAt.get(event)

    console.log(JSON.stringify({
      type: 'http_request',
      direction: 'incoming',
      timestamp: new Date().toISOString(),
      method: event.method,
      path: getRequestURL(event).pathname,
      status: getResponseStatus(event),
      durationMs: start === undefined ? null : Math.round(performance.now() - start),
    }))

    startedAt.delete(event)
  })
})

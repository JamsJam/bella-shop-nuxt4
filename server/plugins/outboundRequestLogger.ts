export default defineNitroPlugin(() => {
  const originalFetch = globalThis.fetch

  // Nitro forwards external $fetch calls (including $fetch.raw) to native fetch.
  globalThis.fetch = async (input, init) => {
    const start = performance.now()
    const request = input instanceof Request ? input : undefined
    const method = init?.method ?? request?.method ?? 'GET'
    // Exclude credentials, query parameters and fragments from logs.
    let url = '[invalid URL]'
    try {
      const parsed = new URL(request?.url ?? String(input))
      url = `${parsed.origin}${parsed.pathname}`
    } catch {
      // Logging must not change fetch's handling of invalid inputs.
    }

    const log = (status: number | null, outcome: string) => {
      console.log(JSON.stringify({
        type: 'http_request',
        direction: 'outgoing',
        timestamp: new Date().toISOString(),
        method: method.toUpperCase(),
        url,
        status,
        outcome,
        durationMs: Math.round(performance.now() - start),
      }))
    }

    try {
      const response = await originalFetch.call(globalThis, input, init)
      log(response.status, response.ok ? 'success' : 'http_error')
      return response
    } catch (error) {
      log(null, 'network_error')
      throw error
    }
  }
})

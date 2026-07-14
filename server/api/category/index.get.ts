import type CategoryPageDTO from '#shared/dto/categorypage.dto'

export default defineEventHandler(async (event): Promise<CategoryPageDTO> => {
    const config = useRuntimeConfig(event);
    const APIPlatform = config.platformApiBase || 'http://localhost:8000'

    // Fetch the category page data from the platform API
    const categoryPage = await $fetch<CategoryPageDTO>('/page/categories', {
        baseURL: APIPlatform,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return categoryPage
})
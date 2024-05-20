export const getPaginationParams = (query) => {
    const { currentPage = 1, order } = query
    const limit = Number(query.limit) || 0
    const skip = (Number(currentPage) - 1) * limit
    const sort = { [query.sort]: order === 'asc' ? 1 : -1 }
    return { limit, skip, sort }
}

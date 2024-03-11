const PageCount = (responseCount: number, limit: number = 150) => {
    const pageCount = Math.ceil(responseCount / limit)

    return pageCount
}

export {PageCount }
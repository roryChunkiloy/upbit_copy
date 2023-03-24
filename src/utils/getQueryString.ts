'use client'

const getQueryString = (location: Location) => {
    return location.search.substring(1)
}

export default getQueryString
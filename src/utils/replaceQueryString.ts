'use client'

const replaceQueryString = (qs : string) => {
    history.replaceState(null, '', `${location.pathname}?${qs}`)
}

export default replaceQueryString
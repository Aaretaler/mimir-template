import { useEffect, useState } from "react"

interface ReturnType<T> {
    data?: T
    loading: boolean
    error?: string
}

export const  useFetch = <T>(url: string): ReturnType<T> => {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const abortController = new AbortController()

        fetch(url, {  signal: abortController.signal })
        .then(response => {
            if(!response.ok) {
                throw Error('failed to fetch data for that resource')
            }
            return response.json()
        })
        .then(data => {
            setData(data)
            setLoading(false)
            setError(undefined)
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
                setError(err.message)
            }
            setLoading(false)
            setError(err.message);
        })

        return () => abortController.abort()
    }, [url])

    return { data, loading, error }
}
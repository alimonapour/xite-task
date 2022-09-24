import useSWR from 'swr'

const apiUrl =
  'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export function useFetchData() {
  const { data, error } = useSWR(apiUrl, fetcher)
  return {
    allMusicVideos: data?.videos,
    isLoading: !error && !data,
    isError: error,
  }
}

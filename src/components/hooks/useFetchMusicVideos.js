import useSWR from 'swr'

const apiUrl =
  'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json'

function sortByNewestToOld(first, second) {
  return second.release_year - first.release_year
}
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export function useFetchData() {
  const { data, error } = useSWR(apiUrl, fetcher)
  return {
    allMusicVideos: data?.videos.sort(sortByNewestToOld),
    allGenres: data?.genres,
    isLoading: !error && !data,
    isError: error,
  }
}

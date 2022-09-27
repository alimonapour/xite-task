export function filterMusicVideos(
  allMusicVideos,
  releaseYearsFilter,
  genresFilter,
  query,
) {
  let filteredList = allMusicVideos
  if (genresFilter?.length > 0) {
    filteredList = filteredList.filter((musicVideo) =>
      genresFilter.find((i) => i.value === musicVideo.genre_id),
    )
  }

  if (releaseYearsFilter?.length > 0) {
    filteredList = filteredList.filter((musicVideo) =>
      releaseYearsFilter.find((i) => i.value === musicVideo.release_year),
    )
  }

  if (query?.length > 0) {
    filteredList = filteredList.filter(({ artist, title }) => {
      return Object.values({ artist, title }).some((val) =>
        String(val).toLowerCase().includes(query),
      )
    })
  }
  return filteredList
}

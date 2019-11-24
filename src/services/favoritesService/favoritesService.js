
export default {
  deleteFavorite,
  addToFavorite,
  loadFavorites
}

function addToFavorite(cityToAdd, favorites) {
  favorites.push(cityToAdd)
  localStorage.setItem('_favorites', JSON.stringify(favorites))

  return favorites
}
function deleteFavorite({ id }, favorites) {

  const index = favorites.findIndex(favorite => favorite.id === id)
  if (index !== -1) favorites.splice(index, 1)
  localStorage.setItem('_favorites', JSON.stringify(favorites))
  return favorites
}

function loadFavorites() {
  let favorites = localStorage.getItem('_favorites')
  favorites = JSON.parse(favorites)
  if (favorites === null) return favorites = []
  else return favorites

}



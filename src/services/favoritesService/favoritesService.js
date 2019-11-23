
export default {
  deleteFavorite,
  addToFavorite,
  loadFavorites
}



function addToFavorite(cityToAdd, favorites) {
  // const isExist = checkIfFavoriteExist(cityToAdd.id, favorites)
  // if (!isExist) {
    favorites.push(cityToAdd)
    localStorage.setItem('_favorites', JSON.stringify(favorites))

    return favorites
  // }
  // else {
  //   deleteFavorite()
  //   return false
  // }
}


// function checkIfFavoriteExist(cityToAddId, favorites) {
//   const cityToAdd = favorites.find(city => {
//     return city.id === cityToAddId
//   })
//   return cityToAdd
// }

function deleteFavorite({id}, favorites) {
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



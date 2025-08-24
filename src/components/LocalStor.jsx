

export const LocalString = () => {
  return JSON.stringify(localStorage.getItem("ListFav"));
}
export const LocalData = () => {
  return JSON.parse(localStorage.getItem("ListFav"))
}

export const LocalSet = (data) => {
  localStorage.setItem("ListFav", JSON.stringify(data));
}


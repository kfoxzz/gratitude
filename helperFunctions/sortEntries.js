export const sortEntries = (entriesArray) => {
    let newArray = entriesArray.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    return newArray;
}
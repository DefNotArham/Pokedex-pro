function capitalize(str) {
  if (!str) return "";
  const firstLetter = str.charAt(0).toUpperCase();

  const restOfTheWord = str.slice(1);

  return firstLetter + restOfTheWord;
}

export default capitalize;

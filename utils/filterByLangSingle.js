const filterByLangForObject = (obj, lang, title) => {
  lang = lang.charAt(0).toUpperCase() + lang.slice(1).trim();
  const field = `${title}${lang}`.trim();
  const newObj = obj._doc ? obj._doc : obj;
  newObj[title] = newObj[field]
  .log({...newObj});
  return newObj;
};

module.exports = filterByLangForObject;

const filterByLang = (array, lang, title) => {
  lang = lang.charAt(0).toUpperCase() + lang.slice(1).trim();
  const field = `${title}${lang}`.trim();
  let filtered = array.map(element => {
    return {
      ...element,
      [title]: element[field]
    };
  });

  const arr = []

  for(let i = 0; i < filtered.length; i++) {
    if(!filtered[i]._doc) {
      arr.push(filtered[i])
    } else {
      const obj = {...filtered[i]._doc}
      const keys = Object.keys(filtered[i]);
      const lastKey = keys[keys.length - 1];
      obj[lastKey] = filtered[i][lastKey]
      arr.push(obj)
    }
  }

  return arr;
};

module.exports = filterByLang;

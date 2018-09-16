const fs = require('fs');

/**
 * Function that reads the output of getImageLinks,
 *  - Saves the links in an array
 *  - Removes the signing elements of the URL
 *  - Returns an array of unsigned URLS
 */

const unsignImageLinks = () => {
  //Creates the link array
  const linkArr = fs
    .readFileSync('output/imageLinks.txt')
    .toString()
    .split('\n');
  //Unsigns the the links
  const unsignURL = linkArray => {
    let cleanUrls = [];
    let regEx = /\?.*$/g;
    linkArray.forEach(link => {
      let cleanLink = link.replace(regEx, '');
      console.log(cleanLink);
      cleanUrls.push(cleanLink);
    });
    return cleanUrls;
  };
  //Save output of unsignURL in variable
  const unsignedURLs = unsignURL(linkArr);

  return unsignedURLs;
};

console.log(unsignImageLinks());

module.exports = {
  unsignImageLinks
};

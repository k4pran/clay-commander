import Fuse from "fuse.js";

const fuzzyOptions = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.4,
  distance: 1000,
  useExtendedSearch: false
};

const fuzzyRelaxedOptions = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.7,
  distance: 100,
  useExtendedSearch: false
};

const determineCommand = (possibleCommands, requestedCommand) => {
    return requestedCommand
};

// const determineCommand = (possibleCommands, requestedCommand) => {
//     const fuse = new Fuse(possibleCommands, fuzzyOptions);
//     let results = fuse.search(requestedCommand);
//     if (results.length > 0) {
//         return results[0].item;
//     }
//     else {
//         const alternativeFuse = new Fuse(possibleCommands, fuzzyRelaxedOptions);
//         let alternativeResults = alternativeFuse.search(possibleCommands);
//         let altCommands = [];
//         console.log(alternativeResults);
//         alternativeResults.forEach(alternative => {
//             altCommands.push(alternative['item']);
//         });
//         return altCommands;
//     }
// };

export default {determineCommand};
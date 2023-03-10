/**
 * Creates a list of a range of years between 'from' and 'to'
 * @param {number|string} from Number used as the start of the year's range
 * @param {number|string} to Number used as the end of the year's range. Default: new Date().getFullYear()
 * @returns {Array.<number>} List of years based on range (ascending order)
 */
export function composeRangeYears(from, to = new Date().getFullYear()) {
  const fromYear = Number(from);
  let toCounter = Number(to);

  if (Number.isNaN(fromYear)) {
    throw new TypeError(
      `Parameter 'from' should be a number or string with number`
    );
  } else if (Number.isNaN(toCounter)) {
    throw new TypeError(
      `Parameter 'to' should be a number or string with number`
    );
  }

  const years = [];
  while (toCounter >= fromYear) {
    years.push(toCounter);
    toCounter--;
  }
  return years;
}

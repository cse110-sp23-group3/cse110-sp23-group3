/**
 * This is a simple script that checks the value of x.
 */

// This is the value we'll be checking.
const x = 5;

/**
 * This function logs a message depending on the value of x.
 * @param {number} x - The value to check.
 */
function checkValue(x) {
  if (x === 5) {
    console.log('x is 5');
  } else {
    console.log('x is not 5');
  }
}

checkValue(x);

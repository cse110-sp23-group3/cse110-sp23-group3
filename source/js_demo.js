/**
 * This function is used to demo the CI pipeline. It just does random stuff.
 */
function messAroundWithJavascript() {
    let thisVariableIsFalse = true;
    if (thisVariableIsFalse) {
      console.log('There is a paradox in this code.');
      thisVariableIsFalse = false;
    } else {
      console.log('There is still a paradox in this code');
    }
  }
  
  console.log('running');
  for (let i = 0; i < 5; i++) {
    console.log(`i ${i}`);
    messAroundWithJavascript();
  }
  
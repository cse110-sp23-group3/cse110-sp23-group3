function messAroundWithJavascript ()
{
                        let unusedVariable = `This variable is not used in the code.`
                        let thisVariableIsFalse = true
                        if(thisVariableIsFalse) {
                            console.log("There is a paradox in this code.");
                        }
                        else
                            console.log("There is still a paradox in this code")
}

console.log('running');
for (let i = 0 ;i < 5 ;i++) {
    console.log('i ' + i);
    messAroundWithJavascript ();
}

let oldDatabase = 'login=marian12;password=jaromir1,date=2016-12-24;login=janusz422;password=mypassword772,login=witek33;password=mojehaslo23;date=2014-02-54,password=wincenty;login=asdad22;date=2017-12-12';

function loginValidate (string) {
    let iCount = 0;
    for (iIndex in string) {
        if (!isNaN(parseInt(string[iIndex]))) {
            iCount++;
        }
    }
    if (string.length > 0 && iCount >= 2) {
        return true; }
        return false;
    }

function passValidate (string) {
    let iCount = 0;
    for (iIndex in string) {
        if (!isNaN(parseInt(string[iIndex]))) {
            iCount++;
        }
    }
    if (string.length > 0 && iCount >= 1) {
        return true; }
        return false;
    }
    
function dateValidate (string) {
    let year = parseInt(string.slice(0,4));
    let month = parseInt(string.slice(5,7));
    let day = parseInt(string.slice(8,10));
        if (year >= 2016 && month >=1 && month <= 12 && day >= 1 && day <= 31 && string.length === 10) {
            return true;
        } else return false;
   }
function assignIndex(string) {
    if (string.indexOf("login") !== -1) {
        return 0;
    }  else if (string.indexOf("password") !== -1) {
        return 1;
    } else if (string.indexOf("date") !== -1) {
        return 2;
    }
}
    
function splitValidSpit(string, i) {
   let recordSeparator = string.indexOf("=");
   let validRecord = string.substring(recordSeparator+1);
      if (i === 0 && loginValidate(validRecord)) {
            return validRecord;
      } else if (i === 1 && passValidate(validRecord)) {
            return validRecord;
      } else if (i === 2 && dateValidate(validRecord)) { 
            return validRecord; 
      }
    }

function adaptOldData (database) {
    let splitArray = database.split(',');
    let newOrderArray = [];
    while (splitArray.length > 0) {
        let string = splitArray.pop();
        let reorderedArray = [];
        let temp = string.split(';');
            for (k = 0; k < temp.length; k++) {
            let stringTemp = temp[k];
            let index = assignIndex(stringTemp);
            reorderedArray[index] = splitValidSpit(stringTemp, index);
            }
        if (reorderedArray[0] !== undefined && reorderedArray[1] !== undefined && reorderedArray[2] !== undefined) {
        newOrderArray.unshift(reorderedArray.join(","));
        }
    }
    return newOrderArray.join('\n');
}

console.log(adaptOldData(oldDatabase));
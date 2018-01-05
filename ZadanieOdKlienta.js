let oldDatabase = 'login=marian12;password=jaromir1,date=2016-12-24;login=janusz422;password=mypassword772,login=witek33;password=mojehaslo23;date=2014-02-54,password=wincenty;login=asdad22;date=2017-12-12';

function loginValidate (string) {
    let iCount = 0;
    for (iIndex in string) {
        if (!isNaN(parseInt(string[iIndex]))) {
            iCount++;
        }
    }
    if (iCount >= 2) {
        return true; }
        return false;
    }

function passValidate (string) {
    let sTest = string;
    let iCount = 0;
    for (iIndex in sTest) {
        if (!isNaN(parseInt(sTest[iIndex]))) {
            iCount++;
        }
    }
    if (iCount >= 1) {
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


function adaptOldData (database) {
    let splitArray = database.split(',');
    let newOrderArray = [];
    while (splitArray.length > 0) {
        let string = splitArray.pop()
        let reorderedArray = [];
        let temp = string.split(';');
            for (k = 0; k < temp.length; k++) {
            let stringTemp = temp[k]
            if (stringTemp.indexOf("login") !== -1) {
                let recordSeparator = stringTemp.indexOf("=");
                let validRecord = stringTemp.substring(recordSeparator+1);
                if (loginValidate(validRecord)) {
                reorderedArray[0] = (validRecord);
                } else break;
            } else if (stringTemp.indexOf("password") !== -1) {
                let recordSeparator = stringTemp.indexOf("=");
                let validRecord = stringTemp.substring(recordSeparator+1);
                if (passValidate(validRecord)) {
                reorderedArray[1] = (validRecord);
                } else break;
            } else if ((stringTemp.indexOf("date") !== -1)) {
                let recordSeparator = stringTemp.indexOf("=");
                let validRecord = stringTemp.substring(recordSeparator+1);
                if (dateValidate(validRecord)) {
                reorderedArray[2] = (validRecord);
                } else break;
            }
        }
        if (reorderedArray.length > 2) {
        newOrderArray.unshift(reorderedArray.join(","));
        }
    }
    return newOrderArray.join('\n');
}

console.log(adaptOldData(oldDatabase));
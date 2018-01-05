let oldDatabase = 'login=marian12;password=jaromir1,date=2016-12-24;login=janusz422;password=mypassword772,login=witek33;password=mojehaslo23;date=2014-02-54,password=wincenty;login=asdad22;date=2017-12-12';

function stringHasNumberValidation (string, howManyNeeded) {
    let numbersInString = 0;
    for (letter in string) {
        if (!isNaN(parseInt(string[letter]))) {
            numbersInString++;
            if (numbersInString >= howManyNeeded) {
                return true;
            }
        }
    }
    return false;
    }
    
function dateValidate (string) {
    let year = parseInt(string.slice(0,4));
    return year >= 2016;
   }
    
function extractValue(attributes, propertyName) {
    for (let i = 0; i < attributes.length; i++) {
        let attributeKeyValue = attributes[i].split('=');
        if(attributeKeyValue[0] === propertyName) {
            return attributeKeyValue[1];
        }
    }
    return null;
    }

function adaptOldData (database) {
    let arrayOfRecords = database.split(',');
    let newArrayDatabase = [];
    while (arrayOfRecords.length > 0) {
        let separateRecordString = arrayOfRecords.pop();
        let arrayOfRecordAttribures = separateRecordString.split(';');
        let login = extractValue(arrayOfRecordAttribures, 'login');
        let password = extractValue(arrayOfRecordAttribures, 'password');
        let date = extractValue(arrayOfRecordAttribures, 'date');
        if (stringHasNumberValidation(login,1) && stringHasNumberValidation(password,2) && date != null && dateValidate(date)) {
            newArrayDatabase.unshift(`${login},${password},${date}`);
        }
    }
    return newArrayDatabase.join('\n');
}

adaptOldData(oldDatabase);
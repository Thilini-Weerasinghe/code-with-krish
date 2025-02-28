function getMinNumber(num1, num2) {
    // num1 = Number(num1);
    // num2 = Number(num2);
     console.log('num1:', num1, 'num2:', num2);
    if (isNaN(num1) || isNaN(num2)) {
        return {
            status: 400,
            data: {
                error: "both parameter shouldbe numbers"
            }
        };

    }
    return {
        status: 200,
        data: { min: Math.min(num1, num2) },
    };

};

function getMaxNumber(numbers) {

    const convertedNumberArray = numbers.split(',').map(num => parseFloat(num));


    if (convertedNumberArray.some(isNaN)) {
        return {
            status: 400,
            data: {
                error: "All the numbers should be valid numbers"
            }
        }

    }

    return {
        status: 200,
        data: { max: Math.max(...convertedNumberArray) },
    };

}

function getAverageOfGivenNumbers(numbers) {
    const convertedNumberArray = numbers.split(',').map(num => parseFloat(num));

    if (convertedNumberArray.some(isNaN)) {
        return {
            status: 400,
            data: {
                error: "All the numbers should be valid numbers"
            }
        }

    }

    return {
        status: 200,
        data: convertedNumberArray.reduce((x, y) => x + y, 0) / convertedNumberArray.length,
    }


}

function getSortedArray(numbers, type) {
    const convertedNumberArray = numbers.split(',').map(num => parseFloat(num));


    if (convertedNumberArray.some(isNaN)) {
        return {
            status: 400,
            data: {
                error: "All the numbers should be valid numbers"
            }
        }

    }

    const lowerCaseType = type.toLowerCase();

    if (lowerCaseType === 'asc') {

        var done = false;
        while (!done) {
            done = true;
            for (var i = 1; i < convertedNumberArray.length; i += 1) {
                if (convertedNumberArray[i - 1] > convertedNumberArray[i]) {
                    done = false;
                    var tmp = convertedNumberArray[i - 1];
                    convertedNumberArray[i - 1] = convertedNumberArray[i];
                    convertedNumberArray[i] = tmp;
                }
            }
        }
        return {
            status: 200,
            data: convertedNumberArray

        }
    }

    if (lowerCaseType === 'dsc') {
        var done = false;
        while (!done) {
            done = true;
            for (var i = 1; i < convertedNumberArray.length; i += 1) {
                if (convertedNumberArray[i - 1] < convertedNumberArray[i]) {
                    done = false;
                    var tmp = convertedNumberArray[i - 1];
                    convertedNumberArray[i - 1] = convertedNumberArray[i];
                    convertedNumberArray[i] = tmp;
                }
            }
        }
        return {
            status: 200,
            data: convertedNumberArray

        }
    }

    return {
        status: 400,
        data: {
            error: "value of type should be asc or dsc"
        }
    }


}

function getWordCountInArray(numbers, searchWord) {
    const convertedArray = numbers.split(',')

    //console.log(convertedArray);

    let count = 0;

    if (searchWord !== undefined && searchWord !== '') {

        for (let word of convertedArray) {
            // console.log(word);
            if (word === searchWord) {
                count++;
            }
        }

        if (count === 0) {
            return {
                status: 200,
                data: { count: `count is ${count} and we couldn't find any elemement in the array for given word ${searchWord}` }
            }
        }

        return {
            status: 200,
            data: { count: `count is ${count} for the given word  ${searchWord} ` }
        }
    }
    return {
        status: 400,
        data: {
            error: "please provide a valid non empty word for search"
        }
    }


}

module.exports = { getMinNumber, getMaxNumber, getAverageOfGivenNumbers, getSortedArray, getWordCountInArray };
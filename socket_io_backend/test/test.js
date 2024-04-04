function findRange(arr, input) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (input >= arr[i] && input <= arr[i + 1]) {
            if(input == arr[i]){
                return {status:"same",val:arr[i]}
            }
            return {status:"greater",val:arr[i+1]}
        }
    }
    return null; // Input is outside the range of the array
}

const array = [3, 5, 7, 10,14,18,20];
const input = 9;

const range = findRange(array, input);

if (range) {
    console.log(range);
    //console.log(`Input ${input} is between ${range[0]} and ${range[1]}`);
} else {
    console.log(`Input ${input} is outside the range of the array`);
}


//_____________________________________________________________________

// const priceData = {
//     '3hour': 20,
//     '2hour': 30,
//     '5hour': 50,
//     '7hour': 80,
//     '10hour': 150,
//     '12hour':12
//   };
  
//   const extractedValues = Object.keys(priceData)
//     .filter(key => key.endsWith('hour'))
//     .map(key => parseInt(key.replace('hour', '')))
    
  
//   console.log(extractedValues);
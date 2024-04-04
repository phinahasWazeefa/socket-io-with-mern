exports.sortArrayinASC = (arrayToSort,keyToSort)=>{
    arrayToSort.sort((a, b) => {
        if (a.keyName < b.keyName) {
            return -1;
        }
        if (a.keyName > b.keyName) {
            return 1;
        }
        return 0;
    });

    console.log(arrayToSort)
    return arrayToSort
}
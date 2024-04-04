exports.trimTheWord = (word) => {
    try {

        const trimmedWord = word.trim();

        return trimmedWord;


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.standardizeWord = (word) => {
    try {

        const words = word.toLowerCase().split(/\s+/);

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);

        }

        return words.join(" ");

    } catch (error) {
        console.log(error);
        throw error;
    }
}
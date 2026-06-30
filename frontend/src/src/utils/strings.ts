export function capitalize(text: string) {
    const words = text.split(" ");
    const capitalizedWords = words.map(
        (word: string) => word[0].toUpperCase() + word.slice(1)
    );
    const joinedWords = capitalizedWords.join(" ");

    return joinedWords;
}

export function makeKebabCase(text: string) {
    const words = text.split(" ");
    const lowercaseWords = words.map((word: string) => word.toLowerCase());
    const joinedWords = lowercaseWords.join("-");

    return joinedWords;
}

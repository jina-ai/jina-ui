export function checkIfQuestion(text: string) {
    const regexQuestionMark = new RegExp("\\?", "g");
    var wordCount = text.match(/(\w+)/g)?.length || 0;
    return (regexQuestionMark.test(text) && wordCount > 2)
}

export function isValidHttpUrl(text: string) {
    let url;

    try {
        url = new URL(text);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

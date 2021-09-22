export function checkIfQuestion(text: string){
    const regexQuestionMark = new RegExp("\\?", "g");
    var wordCount = text.match(/(\w+)/g)?.length || 0;
    return (regexQuestionMark.test(text) && wordCount > 2)
}


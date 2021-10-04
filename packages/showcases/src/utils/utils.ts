export function checkIfValidSearchString(text: string) {
    var wordCount = text.match(/(\w+)/g)?.length || 0;
    return wordCount >= 2;
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

export const debounce = (callback: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout
    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => callback(...args), delay)
    }
}

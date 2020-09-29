export interface Element {
    rawText: string;

    toHtmlString(): string;
}

export class Paragraph implements Element {
    rawText: string;

    constructor(text: string) {
        this.rawText = text;
    }

    public toHtmlString = (): string => {
        return`<p>${this.rawText}</p>`
    }
}

export class Empty implements Element {
    rawText = "";

    toHtmlString = (): string => {
        return this.rawText;
    }
}

export class Header implements Element {
    rawText: string;

    constructor(text: string) {
        // TODO: Add validation at construction time to avoid incorrectly instantiated Headers.
        this.rawText = text;
    }

    public toHtmlString = (): string => {
        let headerCounter = 1;
        let currentCharacterIndex = 1;
        while (currentCharacterIndex < this.rawText.length && this.rawText[currentCharacterIndex] === '#') {
            headerCounter++;
            currentCharacterIndex++;
        }

        const textAfterHashtags = this.rawText.substring(headerCounter);

        const trimmedText = textAfterHashtags.trim();

        return `<h${headerCounter}>${trimmedText}</h${headerCounter}>`;
    }
}
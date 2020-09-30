import { RowFormatter } from "./RowFormatter";

export interface Element {
    rawText: string;

    toHtmlString(): string;
}

export class Paragraph implements Element {
    private rowFormatter = new RowFormatter();
    
    rawText: string;

    constructor(text: string) {
        this.rowFormatter = new RowFormatter();
        this.rawText = text;
    }

    public toHtmlString = (): string => {
        const linkFormattedText = this.rowFormatter.formatLinks(this.rawText);
        return`<p>${linkFormattedText}</p>`
    }
}

export class Empty implements Element {
    rawText = "";

    toHtmlString = (): string => {
        return this.rawText;
    }
}

export class Header implements Element {
    private rowFormatter = new RowFormatter();

    rawText: string;

    constructor(text: string) {
        this.rowFormatter = new RowFormatter();
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

        const linkFormattedText = this.rowFormatter.formatLinks(trimmedText);

        return `<h${headerCounter}>${linkFormattedText}</h${headerCounter}>`;
    }
}

export class MarkdownConverter {

    public convert = (inputText: string): string => {
        if (inputText == null) {
            throw new Error("Input is null or undefined.");
        }

        if (inputText === "") {
            return inputText;
        }

        if (inputText[0] === '#') {
            let headerCounter = 1;
            let currentCharacterIndex = 1;
            while (currentCharacterIndex < inputText.length && headerCounter < 6 && inputText[currentCharacterIndex] === '#') {
                headerCounter++;
                currentCharacterIndex++;
            }

            const textAfterHashtags = inputText.substring(headerCounter);

            if (!textAfterHashtags.trim()) {
                return "";
            }

            if (textAfterHashtags[0] === ' ') {
                const trimmedText = textAfterHashtags.trim();

                return `<h${headerCounter}>${trimmedText}</h${headerCounter}>`;
            }
        }

        if (inputText.startsWith("# ")) {
            return `<h1>${inputText.substring(2)}</h1>`;
        }

        return `<p>${inputText}</p>`
    }

    public chunkText = (text: string): Element[] => {
        if (text == null) {
            throw new Error("Input is null or undefined.");
        }

        let elements: Element[] = [];

        const rows = text.split('\n');
        let currentMultilineParagraphs: Paragraph[] = [];

        for(let rowCount = 0; rowCount < rows.length; rowCount++) {
            const element = this.decideRow(rows[rowCount]);
            if(element instanceof Paragraph) {
                currentMultilineParagraphs.push(element);
            } else {
                if(currentMultilineParagraphs.length > 0) {
                    const paragraph = this.combineParagraphs(currentMultilineParagraphs);
                    elements.push(paragraph);
                    currentMultilineParagraphs = [];
                }

                elements.push(element);
            }
        }

        if(currentMultilineParagraphs.length > 0) {
            const paragraph = this.combineParagraphs(currentMultilineParagraphs);
            elements.push(paragraph);
        }

        return elements
    };

    private combineParagraphs = (paragraphs: Paragraph[]): Paragraph => {
        let texts: string[] = [];

        paragraphs.forEach(paragraph => texts.push(paragraph.rawText));

        let combinedText = texts.join("\n");

        return new Paragraph(combinedText);
    };

    private decideRow = (text: string): Element => {
        if (text === "") {
            return new Empty();
        }

        if (RegExp(/^#{1,6}\s\S/).test(text)) {
            return new Header(text);
        }

        return new Paragraph(text);
    };
}

export interface Element {
    rawText: string;
}

export class Paragraph implements Element {
    rawText: string;

    constructor(text: string) {
        this.rawText = text;
    }
}

export class Empty implements Element {
    rawText = "";
}

export class Header implements Element {
    rawText: string;

    constructor(text: string) {
        this.rawText = text;
    }
}
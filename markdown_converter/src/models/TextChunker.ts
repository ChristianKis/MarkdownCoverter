import { Paragraph, Element, Header, Empty } from "./CustomElements";

export class TextChunker {
    public chunkText = (text: string): Element[] => {
        if (text == null) {
            throw new Error("Input is null or undefined.");
        }

        let elements: Element[] = [];

        const rows = text.split('\n');
        let currentMultilineParagraphs: Paragraph[] = [];

        for (let rowCount = 0; rowCount < rows.length; rowCount++) {
            const element = this.decideRow(rows[rowCount]);

            if (element instanceof Paragraph) {
                currentMultilineParagraphs.push(element);
            } else {
                if (currentMultilineParagraphs.length > 0) {
                    const paragraph = this.combineParagraphs(currentMultilineParagraphs);

                    elements.push(paragraph);
                    currentMultilineParagraphs = [];
                }

                elements.push(element);
            }
        }

        if (currentMultilineParagraphs.length > 0) {
            const paragraph = this.combineParagraphs(currentMultilineParagraphs);
            elements.push(paragraph);
        }

        return elements
    };

    private decideRow = (text: string): Element => {
        if (text === "") {
            return new Empty();
        }

        // Regex for rows which contain only hashtags and whitespaces
        if (RegExp(/^#*\s*$/).test(text)) {
            return new Empty();
        }

        // Regex for rows which start with up to 6 hashtags and then there is a valid text after
        if (RegExp(/^#{1,6}\s/).test(text)) {
            return new Header(text);
        }

        return new Paragraph(text);
    };

    private combineParagraphs = (paragraphs: Paragraph[]): Paragraph => {
        let texts: string[] = [];

        paragraphs.forEach(paragraph => texts.push(paragraph.rawText));

        let combinedText = texts.join("\n");

        return new Paragraph(combinedText);
    };
}
import { Element, Empty } from "./CustomElements";
import { TextChunker } from "./TextChunker";

export class MarkdownConverter {
    private textChunker: TextChunker;
    
    constructor() {
        // TODO: Move to ctor injection and IoC container
        this.textChunker = new TextChunker();
    }

    public convert = (inputText: string): string => {
        if (inputText == null) {
            throw new Error("Input is null or undefined.");
        }

        let elements: Element[] = this.textChunker.chunkText(inputText);

        let htmlStrings: string[] = [];

        elements.forEach(element => {
            if (!(element instanceof Empty)) {
                htmlStrings.push(element.toHtmlString())
            }
        });

        return htmlStrings.join("\n");
    }
}

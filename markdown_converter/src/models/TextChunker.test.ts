import { Paragraph, Header, Empty } from "./CustomElements";
import { TextChunker } from "./TextChunker";

describe('chunkText', () => {
    let textChunker: TextChunker;

    beforeEach(() => {
        textChunker = new TextChunker();
    });

    it('throws exception when input text is null', () => {
        expect(() => textChunker.chunkText(null)).toThrow(new Error("Input is null or undefined."));
    });

    it('throws exception when input text is undefined', () => {
        expect(() => textChunker.chunkText(undefined)).toThrow(new Error("Input is null or undefined."));
    });

    it('returns empty string for empty input', () => {
        const result = textChunker.chunkText("");

        expect(result[0] instanceof Empty).toBe(true);
        expect(result[0].rawText).toEqual("");
    });

    it('returns a paragraph for a single line of unformatted text', () => {
        const result = textChunker.chunkText("Some text");

        expect(result[0] instanceof Paragraph).toBe(true);
        expect(result[0].rawText).toEqual("Some text");
    });

    it('returns a header for a single line of header text', () => {
        const result = textChunker.chunkText("# Some text");

        expect(result[0] instanceof Header).toBe(true);
        expect(result[0].rawText).toEqual("# Some text");
    });

    it('returns two headers for two lines of headers', () => {
        const result = textChunker.chunkText("# Some text\n# Some other text");

        expect(result.length).toBe(2);
        expect(result[0] instanceof Header).toBe(true);
        expect(result[0].rawText).toEqual("# Some text");
        expect(result[1] instanceof Header).toBe(true);
        expect(result[1].rawText).toEqual("# Some other text");
    });

    it('returns a single paragraph for two lines of unformatted text', () => {
        const result = textChunker.chunkText("Some text\nSome other text");

        expect(result.length).toBe(1);
        expect(result[0] instanceof Paragraph).toBe(true);
        expect(result[0].rawText).toEqual("Some text\nSome other text");
    });

    it('returns paragraph, header, paragraph when there is a header between two paragraphs', () => {
        const result = textChunker.chunkText("Some text\n# Header\nSome other text");

        expect(result.length).toBe(3);
        expect(result[0] instanceof Paragraph).toBe(true);
        expect(result[0].rawText).toEqual("Some text");
        expect(result[1] instanceof Header).toBe(true);
        expect(result[1].rawText).toEqual("# Header");
        expect(result[2] instanceof Paragraph).toBe(true);
        expect(result[2].rawText).toEqual("Some other text");
    });

    it('returns two paragraphs when there is an extra empty row between two paragraphs', () => {
        const result = textChunker.chunkText("Some text\n\nSome other text");

        expect(result.length).toBe(3);
        expect(result[0] instanceof Paragraph).toBe(true);
        expect(result[0].rawText).toEqual("Some text");
        expect(result[1] instanceof Empty).toBe(true);
        expect(result[2] instanceof Paragraph).toBe(true);
        expect(result[2].rawText).toEqual("Some other text");
    });
});
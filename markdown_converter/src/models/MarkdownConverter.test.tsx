import { Empty, Header, MarkdownConverter, Paragraph } from './MarkdownConverter';

describe('MarkdownConverter', () => {
    let converter: MarkdownConverter;

    beforeEach(() => {
        converter = new MarkdownConverter();
    });

    it('throws exception when input text is null', () => {
        expect(() => converter.convert(null)).toThrow(new Error("Input is null or undefined."));
    });

    it('throws exception when input text is undefined', () => {
        expect(() => converter.convert(undefined)).toThrow(new Error("Input is null or undefined."));
    });

    it('returns empty string for empty input', () => {
        const result = converter.convert("");

        expect(result).toEqual("");
    });

    it('returns text in a paragraph when input is an unformatted text', () => {
        const input = "Some test text";

        const result = converter.convert(input);

        expect(result).toEqual("<p>Some test text</p>")
    });

    [
        { header: "h1", hashtags: "#" },
        { header: "h2", hashtags: "##" },
        { header: "h3", hashtags: "###" },
        { header: "h4", hashtags: "####" },
        { header: "h5", hashtags: "#####" },
        { header: "h6", hashtags: "######" }
    ].forEach((parameter) => {
        it(`returns test in ${parameter.header} when input is a text preceeded by ${parameter.hashtags} and a space`, () => {
            const input = `${parameter.hashtags} Some header`;

            const result = converter.convert(input);

            expect(result).toEqual(`<${parameter.header}>Some header</${parameter.header}>`)
        });
    })

    it('returns test in paragraph when input starts with # but does not have a space after it', () => {
        const input = "#Some text";

        const result = converter.convert(input);

        expect(result).toEqual("<p>#Some text</p>")
    });

    it('returns test in paragraph when input starts with more than 6 #', () => {
        const input = "####### Some text";

        const result = converter.convert(input);

        expect(result).toEqual("<p>####### Some text</p>")
    });

    it('returns empty text when input consists only of #s', () => {
        const input = "######";

        const result = converter.convert(input);

        expect(result).toEqual("")
    });

    it('returns header text without extra whitespaces when input has extra whitespaces after the #s', () => {
        const input = "###        Some header";

        const result = converter.convert(input);

        expect(result).toEqual("<h3>Some header</h3>")
    });

    describe('chunkText', () => {
        let converter: MarkdownConverter;

        beforeEach(() => {
            converter = new MarkdownConverter();
        });

        it('throws exception when input text is null', () => {
            expect(() => converter.chunkText(null)).toThrow(new Error("Input is null or undefined."));
        });

        it('throws exception when input text is undefined', () => {
            expect(() => converter.chunkText(undefined)).toThrow(new Error("Input is null or undefined."));
        });

        it('returns empty string for empty input', () => {
            const result = converter.chunkText("");

            expect(result[0] instanceof Empty).toBe(true);
            expect(result[0].rawText).toEqual("");
        });

        it('returns a paragraph for a single line of unformatted text', () => {
            const result = converter.chunkText("Some text");

            expect(result[0] instanceof Paragraph).toBe(true);
            expect(result[0].rawText).toEqual("Some text");
        });

        it('returns a header for a single line of header text', () => {
            const result = converter.chunkText("# Some text");

            expect(result[0] instanceof Header).toBe(true);
            expect(result[0].rawText).toEqual("# Some text");
        });

        it('returns two headers for two lines of headers', () => {
            const result = converter.chunkText("# Some text\n# Some other text");

            expect(result.length).toBe(2);
            expect(result[0] instanceof Header).toBe(true);
            expect(result[0].rawText).toEqual("# Some text");
            expect(result[1] instanceof Header).toBe(true);
            expect(result[1].rawText).toEqual("# Some other text");
        });

        it('returns a single paragraph for two lines of unformatted text', () => {
            const result = converter.chunkText("Some text\nSome other text");

            expect(result.length).toBe(1);
            expect(result[0] instanceof Paragraph).toBe(true);
            expect(result[0].rawText).toEqual("Some text\nSome other text");
        });

        it('returns paragraph, header, paragraph when there is a header between two paragraphs', () => {
            const result = converter.chunkText("Some text\n# Header\nSome other text");

            expect(result.length).toBe(3);
            expect(result[0] instanceof Paragraph).toBe(true);
            expect(result[0].rawText).toEqual("Some text");
            expect(result[1] instanceof Header).toBe(true);
            expect(result[1].rawText).toEqual("# Header");
            expect(result[2] instanceof Paragraph).toBe(true);
            expect(result[2].rawText).toEqual("Some other text");
        });

        it('returns two paragraphs when there is an extra empty row between two paragraphs', () => {
            const result = converter.chunkText("Some text\n\nSome other text");

            console.log(result)

            expect(result.length).toBe(3);
            expect(result[0] instanceof Paragraph).toBe(true);
            expect(result[0].rawText).toEqual("Some text");
            expect(result[1] instanceof Empty).toBe(true);
            expect(result[2] instanceof Paragraph).toBe(true);
            expect(result[2].rawText).toEqual("Some other text");
        });
    });
});

import { MarkdownConverter } from "./MarkdownConverter";

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
});

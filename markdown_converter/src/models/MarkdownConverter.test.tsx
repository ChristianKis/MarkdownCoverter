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

describe("MarkdownConverter characterization tests", () => {
    let converter: MarkdownConverter;

    beforeEach(() => {
        converter = new MarkdownConverter();
    });

    it("tests sample input #1", () => {
        let input = "" +
            "# Sample Document \n" +
            "\n" +
            "Hello!\n" +
            "\n" +
            "This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.";

        const result = converter.convert(input);

        expect(result).toEqual("<h1>Sample Document</h1>\n" +
            "<p>Hello!</p>\n" +
            `<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>`);
    });

    it("tests sample input #2", () => {
        let input = `` +
            `# Header one` +
            `\n` +
            `Hello there\n` +
            `\n` +
            `How are you?\n` +
            `What's going on?\n` +
            `\n` +
            `## Another Header\n` +
            `\n` +
            `This is a paragraph [with an inline link](http://google.com). Neat, eh?\n` +
            `\n` +
            `## This is a header [with a link](http://yahoo.com)\n`;

        const result = converter.convert(input);

        expect(result).toEqual(`<h1>Header one</h1>\n` +
            `<p>Hello there</p>\n` +
            `<p>How are you?\n` +
            `What's going on?</p>\n` +
            `<h2>Another Header</h2>\n` +
            `<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?</p>\n` +
            `<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>`);
    });
});
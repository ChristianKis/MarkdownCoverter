import { Header, Paragraph } from "./CustomElements";

describe("Header.toHtmlString", () => {        
    [
        { header: "h1", hashtags: "#" },
        { header: "h2", hashtags: "##" },
        { header: "h3", hashtags: "###" },
        { header: "h4", hashtags: "####" },
        { header: "h5", hashtags: "#####" },
        { header: "h6", hashtags: "######" }
    ].forEach((parameter) => {
        it(`returns text in ${parameter.header} when input is a text preceeded by ${parameter.hashtags} and a space`, () => {
            const header = new Header(`${parameter.hashtags} Some header`);

            const result = header.toHtmlString();

            expect(result).toEqual(`<${parameter.header}>Some header</${parameter.header}>`)
        });

        it(`returns link in ${parameter.header} when input is a link preceeded by ${parameter.hashtags} and a space`, () => {
            const header = new Header(`${parameter.hashtags} [Some header](link)`);

            const result = header.toHtmlString();

            expect(result).toEqual(`<${parameter.header}><a href="link">Some header</a></${parameter.header}>`)
        });
    })
});

describe("Paragraph.toHtmlString", () => {
    it('returns text in a paragraph when input is an unformatted text', () => {
        const paragraph = new Paragraph("Some test text");

        const result = paragraph.toHtmlString();

        expect(result).toEqual("<p>Some test text</p>")
    });

    it('returns link in a paragraph when input is a link', () => {
        const paragraph = new Paragraph("[Some test text](link)");

        const result = paragraph.toHtmlString();

        expect(result).toEqual(`<p><a href="link">Some test text</a></p>`)
    });
});
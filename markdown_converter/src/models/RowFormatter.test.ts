import { RowFormatter } from "./RowFormatter";

describe('formatRow', () => {
    let rowFormatter = new RowFormatter()

    it('throws exception when input text is null', () => {
        expect(() => rowFormatter.formatLinks(null)).toThrow(new Error("Input is null or undefined."));
    });

    it('throws exception when input text is undefined', () => {
        expect(() => rowFormatter.formatLinks(undefined)).toThrow(new Error("Input is null or undefined."));
    });

    it('returns empty string for empty input', () => {
        const result = rowFormatter.formatLinks("");

        expect(result).toEqual("");
    });

    it('returns input text for input without links', () => {
        const result = rowFormatter.formatLinks("some text");

        expect(result).toEqual("some text");
    });

    it('returns html link when input text is a link', () => {
        const input = "[text](link)";

        const result = rowFormatter.formatLinks(input);

        expect(result).toEqual(`<a href="link">text</a>`);
    });

    it('returns two html links when input text is two links one after another', () => {
        const input = "[text](link)[text2](link2)";

        const result = rowFormatter.formatLinks(input);

        expect(result).toEqual(`<a href="link">text</a><a href="link2">text2</a>`);
    });

    it('returns a single link if a title of a link contains a link', () => {
        const input = "[[text2](link2)](link)";

        const result = rowFormatter.formatLinks(input);

        expect(result).toEqual(`[<a href="link2">text2</a>](link)`);
    });

    it('returns a single link to a link with special characters if a link of a link contains a link', () => {
        const input = "[text]([text2](link2))";

        const result = rowFormatter.formatLinks(input);

        expect(result).toEqual(`<a href="[text2](link2">text</a>)`);
    });
});
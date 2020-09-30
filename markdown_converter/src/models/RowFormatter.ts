export class RowFormatter {
    public formatLinks = (text: string): string => {
        if (text == null) {
            throw new Error("Input is null or undefined.");
        }

        const pairs = new Map<string, string>();

        let title = "";
        let link = "";
        let currentCharIndex = 0;
        let recordingTitle = false;
        let recordingLink = false;

        while (currentCharIndex < text.length) {
            let currentChar = text[currentCharIndex];
            // Found a starting title bracket
            if (currentChar === '[' && !recordingTitle && !recordingLink) {
                recordingTitle = true;
            }
            // Found a new starting title bracket so we restart our title recording 
            else if (currentChar === '[' && recordingTitle && !recordingLink) {
                title = "";
            }
            // Found an end title bracket so we stop recording title
            else if (currentChar === ']' && recordingTitle) {
                recordingTitle = false;
            }
            // Found a start link bracket and we are not in the title
            else if (currentChar === '(' && !recordingTitle && !recordingLink) {
                recordingLink = true;
            }
            // Found an end link bracket and we were recording link, we save a proper link to pairs map
            else if (currentChar === ')' && recordingLink) {
                recordingLink = false;
                if(title !== "" && link !== "") {
                    pairs.set(title, link);
                    title = "";
                    link = "";
                }
            }
            // We are recording titles and they are not interfering characters
            else if (recordingTitle) {
                title += currentChar;
            }
            // We are recording links and they are not interfering characters 
            else if (recordingLink) {
                link += currentChar;
            }
            // If we find a character between closing title and opening link, we reset the title
            else if (!recordingLink && !recordingTitle) {
                title = "";
                link = "";
            }

            currentCharIndex++;
        }

        pairs.forEach((value:string, key:string) => {
            text = text.replace(`[${key}](${value})`, `<a href="${value}">${key}</a>`);
        })

        return text;
    };
}
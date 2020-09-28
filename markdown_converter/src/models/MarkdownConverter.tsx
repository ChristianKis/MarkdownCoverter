export class MarkdownConverter {

    public convert = (inputText: string): string => {
        if(inputText == null) {
            throw new Error("Input is null or undefined.");
        }
        
        if(inputText === "") {
            return inputText;
        }

        if(inputText[0] === '#') {
            let headerCounter = 1;
            let currentCharacterIndex = 1;
            while(currentCharacterIndex < inputText.length && headerCounter < 6 && inputText[currentCharacterIndex] === '#') {
                headerCounter++;
                currentCharacterIndex++;
            }

            const textAfterHashtags = inputText.substring(headerCounter);

            if(!textAfterHashtags.trim()) {
                return "";
            }

            if(textAfterHashtags[0] === ' ') {
                const trimmedText = textAfterHashtags.trim();

                return `<h${headerCounter}>${trimmedText}</h${headerCounter}>`;
            }
        }
        
        if(inputText.startsWith("# ")) {
            return `<h1>${inputText.substring(2)}</h1>`;
        }

        return `<p>${inputText}</p>`
    }
}
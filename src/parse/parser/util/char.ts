import type { ParseInput, ParseResult } from "@src/parse/type"

export type ParserUtilCharSet = {
    name: string
    test: (char: string) => boolean
}

export const parserUtilChar = (charset : ParserUtilCharSet) => (
    input : ParseInput
) : ParseResult<string> => {
    const char = input.data.charAt(input.index)
    if (!charset.test(char)) {
        return {
            resultType: "ERROR",
            error: `Expected: "${charset.name}" but got: "${char}"`,
            parsedInput: input
        }
    }

    const [x, y] = input.position

    return {
        resultType: "VALUE",
        value: char,
        parsedInput: {
            data: input.data,
            index: input.index + 1,
            position: char == "\n"
                ? [0, y + 1]
                : [x + 1, y]
        }
    }
}

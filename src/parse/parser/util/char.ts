import type { ParseInput, ParseResult } from "@src/parse/type"

export type ParserUtilCharSet = {
    name: string
    test: (char: string) => boolean
}

export const parserUtilChar = (
    input : ParseInput
) : ParseResult<string> => {
    const char = input.data.charAt(input.index)
    return {
        resultType: "VALUE",
        value: char,
        parsedInput: {
            data: input.data,
            index: Math.min(input.index + 1, input.data.length)
        }
    }
}

import type { ParseInput, ParseResult } from "@src/parse/type"

export const parserUtilValue = <T>(
    value: T
) => (input : ParseInput) : ParseResult<T> => {
        return {
            resultType: "VALUE",
            parsedInput: input,
            value: value
        }
    }

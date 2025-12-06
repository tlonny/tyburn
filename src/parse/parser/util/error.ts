import type { ParseInput, ParseResult } from "@src/parse/type"

export const parserUtilError = <T>(
    error: string
) => (input : ParseInput) : ParseResult<T> => {
        return {
            resultType: "ERROR",
            parsedInput: input,
            error: error
        }
    }

import type { Parser, ParseInput, ParseResult } from "@src/parse/type"

export const parse = <T>(
    parser: Parser<T>,
    input: ParseInput
): ParseResult<T> => {
    const result = parser(input)
    if (result.resultType === "FATAL") {
        return result
    }

    if (result.resultType === "VALUE") {
        return result
    }

    if (result.parsedInput.index === input.index) {
        return result
    }

    return {
        ... result,
        resultType: "FATAL",
    }

}

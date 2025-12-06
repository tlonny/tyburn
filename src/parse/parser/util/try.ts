import { parse } from "@src/parse/parse"
import type { ParseInput, Parser, ParseResult } from "@src/parse/type"


export const parserUtilTry = <T>(
    parser : Parser<T>
) => (input : ParseInput) : ParseResult<T> => {
        const result = parse(parser, input)

        if (result.resultType === "VALUE") {
            return result
        } else {
            return {
                ...result,
                resultType: "ERROR",
                parsedInput: input
            }
        }
    }

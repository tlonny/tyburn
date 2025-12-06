import { parse } from "@src/parse/parse"
import type { Parser, ParseInput, ParseResult } from "@src/parse/type"

export const parserUtilEither = <T1, T2>(
    parserFirst : Parser<T1>,
    parserSecond: Parser<T2>
) => (
        input : ParseInput
    ) : ParseResult<T1 | T2> => {
        const resultFirst = parse(parserFirst, input)

        return resultFirst.resultType === "ERROR"
            ? parse(parserSecond, resultFirst.parsedInput)
            : resultFirst
    }

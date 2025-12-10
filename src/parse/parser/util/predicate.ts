import { parse } from "@src/parse/parse"
import type { ParseInput, Parser, ParseResult } from "@src/parse/type"

export type ParserUtilPredicatePredicate<T> = {
    name: string
    test: (value : T) => boolean
}

export const parserUtilPredicate = <T>(
    parser: Parser<T>,
    predicate : ParserUtilPredicatePredicate<T>
) => (input : ParseInput) : ParseResult<T> => {
        const result = parse(parser, input)

        if (result.resultType === "VALUE" && !predicate.test(result.value)) {
            return {
                resultType: "ERROR",
                error: `Predicate: "${predicate.name}" failed`,
                parsedInput: input
            }
        }

        return result
    }

import { parse } from "@src/parse/parse"
import type { ParseInput, Parser, ParseResult } from "@src/parse/type"

export const parserUtilMap = <TIn, TOut>(
    parser : Parser<TIn>,
    mapFn: (value: TIn) => TOut
) => (input : ParseInput) : ParseResult<TOut> => {
        const result = parse(parser, input)

        if (result.resultType !== "VALUE") {
            return result
        }

        return {
            ...result,
            value: mapFn(result.value)
        }
    }

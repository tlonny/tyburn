import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import type { Statement } from "@src/parse/parser/statement/type"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import type { Parser } from "@src/parse/type"

export const parserBlock = (params: {
    parserStatement : Parser<Statement>
}) : Parser<Statement[]> => parserUtilMap(
    parserUtilSequence([
        parserWhitespace,
        parserUtilMany(
            parserUtilMap(
                parserUtilSequence([
                    params.parserStatement,
                    parserWhitespace
                ]),
                ([x,]) => x
            )
        )
    ]),
    ([, x,]) => x
)

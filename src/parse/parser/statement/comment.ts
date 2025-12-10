import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilPredicate } from "@src/parse/parser/util/predicate"
import { parserUtilMap } from "@src/parse/parser/util/map"
import type { StatementComment } from "@src/parse/parser/statement/type"
import { parserUtilTry } from "@src/parse/parser/util/try"
import { parserUtilChar } from "@src/parse/parser/util/char"

const TERMINATORS = new Set(["\n", "\r", ""])

const parserToken = parserWord("#")

export const parserStatementComment = parserUtilMap(
    parserUtilSequence([
        parserToken,
        parserUtilMany(
            parserUtilTry(
                parserUtilPredicate(parserUtilChar, {
                    name: "COMMENT",
                    test: c => !TERMINATORS.has(c)
                })
            )
        )
    ]),
    ([, comment]) : StatementComment => ({
        statementType: "COMMENT",
        comment: comment.join(""),
    })
)

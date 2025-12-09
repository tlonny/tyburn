import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilChar } from "@src/parse/parser/util/char"
import { parserUtilMap } from "@src/parse/parser/util/map"
import type { StatementComment } from "@src/parse/parser/statement/type"

const TERMINATORS = new Set(["\n", "\r", ""])

const parserToken = parserWord("#")

export const parserStatementComment = parserUtilMap(
    parserUtilSequence([
        parserToken,
        parserUtilMany(
            parserUtilChar({
                name: "COMMENT",
                test: c => !TERMINATORS.has(c)
            })
        )
    ]),
    ([, comment]) : StatementComment => ({
        statementType: "COMMENT",
        comment: comment.join(""),
    })
)

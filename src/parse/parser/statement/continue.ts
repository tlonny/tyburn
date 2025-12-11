import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import type { Statement } from "@src/parse/parser/statement/type"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import type { Parser } from "@src/parse/type"

const parserTokenContinue = parserWord("continue")
const parserTokenEnd = parserWord(";")

export const parserStatementContinue : Parser<Statement> = parserUtilMap(
    parserUtilSequence([
        parserTokenContinue,
        parserWhitespace,
        parserTokenEnd
    ]),
    () => ({ statementType: "CONTINUE" })
)

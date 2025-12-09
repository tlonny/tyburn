import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserBlock } from "@src/parse/parser/statement/block"
import type { Statement } from "@src/parse/parser/statement/type"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import type { Parser } from "@src/parse/type"

const parseTokenLoop = parserWord("loop")
const parseTokenBraceOpen = parserWord("{")
const parseTokenBraceClose = parserWord("}")

export const parserStatementLoop = (params : {
    parserStatement : Parser<Statement>
}) : Parser<Statement> => parserUtilMap(
    parserUtilSequence([
        parseTokenLoop,
        parserWhitespace,
        parseTokenBraceOpen,
        parserWhitespace,
        parserBlock(params),
        parserWhitespace,
        parseTokenBraceClose,
    ]),
    ([,,,, x]) => ({
        statementType: "LOOP",
        statements: x
    })
)

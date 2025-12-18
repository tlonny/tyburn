import type { ParserNodeStatement } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserExpr } from "@src/parser/expr"
import { parserStatementBlock } from "@src/parser/statement/block"
import { parserToken } from "@src/parser/token"
import { parserAtomMapValue, parserAtomSequence, parserWhitespace, type Parser } from "astroparse"

const parseTokenWhile = parserToken("while")
const parseTokenParensOpen = parserToken("(")
const parseTokenParensClose = parserToken(")")
const parseTokenBraceOpen = parserToken("{")
const parseTokenBraceClose = parserToken("}")

export const parserStatementWhile = (params : {
    parserStatement : Parser<ParserNodeStatement, ParserError>
}) => parserAtomMapValue(
    parserAtomSequence([
        parseTokenWhile,
        parserWhitespace,
        parseTokenParensOpen,
        parserWhitespace,
        parserExpr,
        parserWhitespace,
        parseTokenParensClose,
        parserWhitespace,
        parseTokenBraceOpen,
        parserWhitespace,
        parserStatementBlock(params),
        parserWhitespace,
        parseTokenBraceClose,
    ]),
    ([,,,, expr,,,,,, block]) : ParserNodeStatement => ({
        nodeType: "STATEMENT_WHILE",
        condition: expr,
        block: block
    })
)

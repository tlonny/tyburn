import type { ParserStatement } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserStatementBreak } from "@src/parser/statement/break"
import { parserStatementComment } from "@src/parser/statement/comment"
import { parserStatementContinue } from "@src/parser/statement/continue"
import { parserStatementVariableDefinition } from "@src/parser/statement/variable-definition"
import { parserStatementWhile } from "@src/parser/statement/while"
import { parserAtomEither, parserAtomError, type ParseInput, type Parser } from "astroparse"

const parserStatementDeferred = (x: ParseInput) => parserStatement(x)

export const parserStatement : Parser<ParserStatement, ParserError> = parserAtomEither([
    parserStatementWhile,
    () => parserStatementBreak,
    () => parserStatementContinue,
    () => parserStatementComment,
    () => parserStatementVariableDefinition,
    () => parserAtomError<ParserError>({ errorType: "TYBURN::STATEMENT_MISSING" }),
].map(x => x({ parserStatement: parserStatementDeferred })))

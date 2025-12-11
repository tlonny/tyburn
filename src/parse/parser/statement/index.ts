import { parserStatementBreak } from "@src/parse/parser/statement/break"
import { parserStatementComment } from "@src/parse/parser/statement/comment"
import { parserStatementContinue } from "@src/parse/parser/statement/continue"
import type { Statement } from "@src/parse/parser/statement/type"
import { parserStatementVariableDefinition } from "@src/parse/parser/statement/variable-definition"
import { parserStatementWhile } from "@src/parse/parser/statement/while"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilError } from "@src/parse/parser/util/error"
import type { ParseInput, Parser } from "@src/parse/type"

const parserStatementDeferred = (x: ParseInput) => parserStatement(x)

export const parserStatement : Parser<Statement> = parserUtilEither([
    parserStatementWhile,
    () => parserStatementBreak,
    () => parserStatementContinue,
    () => parserStatementComment,
    () => parserStatementVariableDefinition,
    () => parserUtilError<Statement>("Expected: statement")
].map(x => x({ parserStatement: parserStatementDeferred })))

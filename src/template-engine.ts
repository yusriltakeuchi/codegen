export function renderTemplate(
  source: string,
  inputVariables: Record<string, string>
): string {
  const variables = buildVariables(inputVariables);
  let result = source;

  // Compatibility with the common IntelliJ Velocity pattern:
  result = removeKnownIntellijDirectives(result);

  // 1. ${NAME} or ${NAME_PASCAL_CASE}: only substitute if key exists in variables.
  // In JS/TS/Dart/Kotlin, code literals like ${className} or ${id} remain intact.
  result = result.replace(
    /\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,
    (match, key: string) => (Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : match)
  );

  // 2. $NAME: only substitute if key exists in variables.
  // In PHP/Dart, local variables like $this, $request, $id are not in variables and stay intact.
  result = result.replace(
    /\$([A-Za-z_][A-Za-z0-9_]*)/g,
    (match, key: string) => (Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : match)
  );

  return result;
}

function buildVariables(
  input: Record<string, string>
): Record<string, string> {
  const variables: Record<string, string> = { ...input };

  // Collect all base keys to expand (NAME, MODULE, FEATURE, etc.)
  const keysToExpand = new Set<string>();
  if (variables.NAME || variables.name) {
    keysToExpand.add("NAME");
  }

  for (const key of Object.keys(input)) {
    if (
      /^[A-Za-z][A-Za-z0-9_]*$/.test(key) &&
      !key.includes("_CASE") &&
      !key.includes("_PLURAL") &&
      !key.includes("_SINGULAR") &&
      !key.includes("_SHORT") &&
      !key.includes("_NAME") &&
      !key.startsWith("DATE") &&
      !key.startsWith("TIME")
    ) {
      keysToExpand.add(key.toUpperCase());
    }
  }

  for (const key of keysToExpand) {
    const rawValue = input[key] ?? input[key.toLowerCase()] ?? "";
    if (!rawValue) continue;

    variables[key] = rawValue;

    // Casing variations
    const pascal = toPascalCase(rawValue);
    const camel = toCamelCase(rawValue);
    const snake = toSnakeCase(rawValue);
    const kebab = toKebabCase(rawValue);
    const title = toTitleCase(rawValue);
    const dot = toDotCase(rawValue);
    const pathVal = toPathCase(rawValue);
    const sentence = toSentenceCase(rawValue);
    const upper = rawValue.toUpperCase();
    const lower = rawValue.toLowerCase();

    variables[`${key}_CAPITALIZED`] = pascal;
    variables[`${key}_PASCAL_CASE`] = pascal;
    variables[`${key}_CAMEL_CASE`] = camel;
    variables[`${key}_SNAKE_CASE`] = snake;
    variables[`${key}_KEBAB_CASE`] = kebab;
    variables[`${key}_SLUG`] = kebab;
    variables[`${key}_PARAM_CASE`] = kebab;
    variables[`${key}_TITLE_CASE`] = title;
    variables[`${key}_DOT_CASE`] = dot;
    variables[`${key}_PATH_CASE`] = pathVal;
    variables[`${key}_SENTENCE_CASE`] = sentence;
    variables[`${key}_UPPER_CASE`] = upper;
    variables[`${key}_LOWER_CASE`] = lower;
    variables[`${key}_CONSTANT_CASE`] = snake.toUpperCase();
    variables[`${key}_SCREAMING_SNAKE_CASE`] = snake.toUpperCase();
    variables[`${key}_HUMAN_CASE`] = title;

    // Plural variations (crucial for database tables, collections, list endpoints)
    const plural = toPlural(rawValue);
    const pluralPascal = toPascalCase(plural);
    const pluralCamel = toCamelCase(plural);
    const pluralSnake = toSnakeCase(plural);
    const pluralKebab = toKebabCase(plural);
    const pluralTitle = toTitleCase(plural);

    variables[`${key}_PLURAL`] = plural;
    variables[`${key}_PLURAL_SNAKE_CASE`] = pluralSnake;
    variables[`${key}_SNAKE_CASE_PLURAL`] = pluralSnake;
    variables[`${key}_PLURAL_PASCAL_CASE`] = pluralPascal;
    variables[`${key}_PASCAL_CASE_PLURAL`] = pluralPascal;
    variables[`${key}_PLURAL_CAMEL_CASE`] = pluralCamel;
    variables[`${key}_CAMEL_CASE_PLURAL`] = pluralCamel;
    variables[`${key}_PLURAL_KEBAB_CASE`] = pluralKebab;
    variables[`${key}_KEBAB_CASE_PLURAL`] = pluralKebab;
    variables[`${key}_PLURAL_SLUG`] = pluralKebab;
    variables[`${key}_SLUG_PLURAL`] = pluralKebab;
    variables[`${key}_PLURAL_TITLE_CASE`] = pluralTitle;
    variables[`${key}_TITLE_CASE_PLURAL`] = pluralTitle;
    variables[`${key}_PLURAL_HUMAN_CASE`] = pluralTitle;
    variables[`${key}_HUMAN_CASE_PLURAL`] = pluralTitle;
    variables[`${key}_PLURAL_UPPER_CASE`] = pluralSnake.toUpperCase();
    variables[`${key}_UPPER_CASE_PLURAL`] = pluralSnake.toUpperCase();

    // Singular variations (for converting plurals like 'users' -> 'user')
    const singular = toSingular(rawValue);
    const singularPascal = toPascalCase(singular);
    const singularCamel = toCamelCase(singular);
    const singularSnake = toSnakeCase(singular);
    const singularKebab = toKebabCase(singular);
    const singularTitle = toTitleCase(singular);

    variables[`${key}_SINGULAR`] = singular;
    variables[`${key}_SINGULAR_SNAKE_CASE`] = singularSnake;
    variables[`${key}_SNAKE_CASE_SINGULAR`] = singularSnake;
    variables[`${key}_SINGULAR_PASCAL_CASE`] = singularPascal;
    variables[`${key}_PASCAL_CASE_SINGULAR`] = singularPascal;
    variables[`${key}_SINGULAR_CAMEL_CASE`] = singularCamel;
    variables[`${key}_CAMEL_CASE_SINGULAR`] = singularCamel;
    variables[`${key}_SINGULAR_KEBAB_CASE`] = singularKebab;
    variables[`${key}_KEBAB_CASE_SINGULAR`] = singularKebab;
    variables[`${key}_SINGULAR_SLUG`] = singularKebab;
    variables[`${key}_SLUG_SINGULAR`] = singularKebab;
    variables[`${key}_SINGULAR_TITLE_CASE`] = singularTitle;
    variables[`${key}_TITLE_CASE_SINGULAR`] = singularTitle;
    variables[`${key}_SINGULAR_HUMAN_CASE`] = singularTitle;
    variables[`${key}_HUMAN_CASE_SINGULAR`] = singularTitle;
    variables[`${key}_SINGULAR_UPPER_CASE`] = singularSnake.toUpperCase();
    variables[`${key}_UPPER_CASE_SINGULAR`] = singularSnake.toUpperCase();
  }

  return variables;
}

function toPlural(value: string): string {
  const s = toSnakeCase(value);
  if (!s) return "";
  const parts = s.split("_");
  const last = parts[parts.length - 1];

  let pluralLast = last;
  if (/(?:[sxz]|ch|sh)$/i.test(last)) {
    pluralLast = last + "es";
  } else if (/[^aeiou]y$/i.test(last)) {
    pluralLast = last.slice(0, -1) + "ies";
  } else if (/fe?$/i.test(last) && !/cliff|chief|roof|proof/i.test(last)) {
    pluralLast = last.replace(/fe?$/i, "ves");
  } else if (!last.endsWith("s")) {
    pluralLast = last + "s";
  }

  parts[parts.length - 1] = pluralLast;
  return parts.join("_");
}

function toSingular(value: string): string {
  const s = toSnakeCase(value);
  if (!s) return "";
  const parts = s.split("_");
  const last = parts[parts.length - 1];

  let singular = last;
  if (/ies$/i.test(last) && !/eies$/i.test(last)) {
    singular = last.slice(0, -3) + "y";
  } else if (/ves$/i.test(last)) {
    singular = last.slice(0, -3) + "f";
  } else if (/(?:xes|zes|ches|shes)$/i.test(last)) {
    singular = last.slice(0, -2);
  } else if (/ses$/i.test(last)) {
    singular = last.slice(0, -2);
  } else if (/s$/i.test(last) && !/ss$/i.test(last) && last.length > 2) {
    singular = last.slice(0, -1);
  }

  parts[parts.length - 1] = singular;
  return parts.join("_");
}

function removeKnownIntellijDirectives(source: string): string {
  // The generated values are calculated by buildVariables(), so the common
  // IntelliJ/Velocity helper blocks (#set, #foreach, #if, #end, etc.) can safely be removed.
  let result = "";
  let i = 0;

  while (i < source.length) {
    if (source[i] === "#") {
      // 1. Single-line Velocity comment: ## ...
      if (source.slice(i, i + 2) === "##") {
        let j = i + 2;
        while (j < source.length && source[j] !== "\n") j++;
        if (j < source.length && source[j] === "\n") j++;
        const lastNewline = result.lastIndexOf("\n");
        const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
        if (/^[ \t]*$/.test(result.slice(lineStart))) {
          result = result.slice(0, lineStart);
        }
        i = j;
        continue;
      }

      // 2. Multi-line Velocity comment: #* ... *#
      if (source.slice(i, i + 2) === "#*") {
        let j = i + 2;
        while (j < source.length - 1 && !(source[j] === "*" && source[j + 1] === "#")) j++;
        j = Math.min(source.length, j + 2);
        i = j;
        continue;
      }

      // 3. Directives with parentheses: #set(...), #foreach(...), #if(...), #elseif(...)
      const parenMatch = source.slice(i).match(/^#(set|foreach|if|elseif)\s*\(/);
      if (parenMatch) {
        let depth = 1;
        let j = i + parenMatch[0].length;
        let inSingleQuote = false;
        let inDoubleQuote = false;

        while (j < source.length && depth > 0) {
          const char = source[j];
          if (char === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote;
          } else if (char === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote;
          } else if (!inSingleQuote && !inDoubleQuote) {
            if (char === "(") depth++;
            else if (char === ")") depth--;
          }
          j++;
        }

        // Check if rest of line after directive is only whitespace
        let endOfLine = j;
        while (endOfLine < source.length && source[endOfLine] !== "\n") {
          endOfLine++;
        }
        const afterDirective = source.slice(j, endOfLine);
        const onlyWhitespaceAfter = /^[ \t\r]*$/.test(afterDirective);

        // Check if line before directive was only whitespace
        const lastNewline = result.lastIndexOf("\n");
        const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
        const beforeDirective = result.slice(lineStart);
        const onlyWhitespaceBefore = /^[ \t]*$/.test(beforeDirective);

        if (onlyWhitespaceBefore && onlyWhitespaceAfter) {
          result = result.slice(0, lineStart);
          i = endOfLine < source.length && source[endOfLine] === "\n" ? endOfLine + 1 : endOfLine;
        } else {
          i = j;
        }
        continue;
      }

      // 4. Standalone directives: #end, #else
      const standaloneMatch = source.slice(i).match(/^#(end|else)\b/);
      if (standaloneMatch) {
        let j = i + standaloneMatch[0].length;
        let endOfLine = j;
        while (endOfLine < source.length && source[endOfLine] !== "\n") {
          endOfLine++;
        }
        const afterDirective = source.slice(j, endOfLine);
        const onlyWhitespaceAfter = /^[ \t\r]*$/.test(afterDirective);

        const lastNewline = result.lastIndexOf("\n");
        const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
        const beforeDirective = result.slice(lineStart);
        const onlyWhitespaceBefore = /^[ \t]*$/.test(beforeDirective);

        if (onlyWhitespaceBefore && onlyWhitespaceAfter) {
          result = result.slice(0, lineStart);
          i = endOfLine < source.length && source[endOfLine] === "\n" ? endOfLine + 1 : endOfLine;
        } else {
          i = j;
        }
        continue;
      }
    }

    result += source[i];
    i++;
  }

  return result;
}

function normalize(value: string): string {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function words(value: string): string[] {
  return normalize(value)
    .split("_")
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

function toPascalCase(value: string): string {
  return words(value)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toCamelCase(value: string): string {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toSnakeCase(value: string): string {
  return words(value).join("_");
}

function toKebabCase(value: string): string {
  return words(value).join("-");
}

function toTitleCase(value: string): string {
  return words(value)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toSentenceCase(value: string): string {
  const w = words(value).join(" ");
  if (!w) return "";
  return w.charAt(0).toUpperCase() + w.slice(1);
}

function toDotCase(value: string): string {
  return words(value).join(".");
}

function toPathCase(value: string): string {
  return words(value).join("/");
}

function toPascalCase(str) {
  return str
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function mapPostgresToSequelize(pgType) {
  if (pgType.includes("character")) return "STRING";
  if (pgType === "text") return "TEXT";
  if (pgType === "integer") return "INTEGER";
  if (pgType === "bigint") return "BIGINT";
  if (pgType === "boolean") return "BOOLEAN";
  if (pgType.includes("timestamp")) return "DATE";
  if (pgType.includes("date")) return "DATEONLY";
  if (pgType.includes("numeric") || pgType.includes("decimal"))
    return "DECIMAL";
  return "STRING";
}

module.exports = { toPascalCase, mapPostgresToSequelize };

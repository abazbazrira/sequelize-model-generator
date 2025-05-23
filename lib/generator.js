const fs = require("fs");
const path = require("path");
const { sequelize } = require("./db");
const { toPascalCase, mapPostgresToSequelize } = require("./utils");
const { DataTypes } = require("sequelize");

async function generateModel(
  tableName,
  customName,
  outDir,
  pascalCase,
  addSuffixModel
) {
  try {
    const [results] = await sequelize.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = '${tableName}'
      ORDER BY ordinal_position
    `);

    if (results.length === 0) {
      console.error(`❌ Table '${tableName}' not found.`);
      process.exit(1);
    }

    const fields = results
      .map((col) => {
        const isPrimaryKey = col.column_name === "id";
        const isAutoIncrement =
          col.column_default && col.column_default.includes("nextval");

        const attributes = [
          `type: DataTypes.${mapPostgresToSequelize(col.data_type)}`,
          isPrimaryKey ? "primaryKey: true" : null,
          isAutoIncrement ? "autoIncrement: true" : null,
        ]
          .filter(Boolean)
          .join(", ");

        return `        ${col.column_name}: { ${attributes} }`;
      })
      .join(",\n");

    const modelName = toPascalCase(customName || tableName);
    const modelContent = `const { DataTypes } = require('sequelize');
const { main_db } = require('../config/sequelize.config');

const ${modelName} = main_db.define(
    '${tableName}',
    {
${fields}
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
);

module.exports = ${modelName};
`;

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    let fileName = !pascalCase
      ? customName || tableName
      : toPascalCase(customName || tableName);

    fileName = !addSuffixModel ? fileName : `${fileName}.model`;

    const modelPath = path.join(outDir, `${fileName}.js`);
    fs.writeFileSync(modelPath, modelContent);
    console.log(`✅ Model ${modelName} created at ${modelPath}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

module.exports = { generateModel };

# 🚀 Sequelize Model Generator

A simple CLI tool to generate Sequelize model files from existing **PostgreSQL** tables.

---

## ✨ Features

- ✅ Supports PostgreSQL
- 🧱 Follows Sequelize `model` structure (compatible with controller-service pattern)
- ⚙️ Customizable model and file name
- 📁 Output to desired directory
- 🔠 Option for PascalCase and .model suffix for filenames
- 🔐 Uses `.env` for DB credentials
- 🧪 Easy to use for existing or new Node.js projects

---

## 📦 Installation

```bash
npm install  @abazbazrira.dev/sequelize-model-generator
```

> You can also use it globally (with -g).

---

## 🛠️ Usage

```bash
npx genmodel --help
npx genmodel <table> [options]
```

### Arguments

- `<table>` **(required)** Name of the PostgreSQL table to generate the Sequelize model from.

### Options

| Option               | Alias | Type    | Default    | Description                                                                 |
| -------------------- | ----- | ------- | ---------- | --------------------------------------------------------------------------- |
| `--name`             | `-n`  | string  | -          | Custom name for the Sequelize model                                         |
| `--out`              | `-0`  | string  | `./models` | Output directory for the model file                                         |
| `--pascal-case`      | `-pc` | boolean | `false`    | Use PascalCase for the filename                                             |
| `--add-suffix-model` | -     | boolean | `true`     | Append `.model` suffix to filename (use `--no-add-suffix-model` to disable) |
| `--help`             | -     | -       | -          | Show help message                                                           |

## 🌱 Example

```bash
npx genmodel users -n User -o ./models --pascal-case --no-add-suffix-model
```

This command generates a file `User.js` in the `./models` directory.

## 📄 .env File

Make sure you have a `.env` file in your project root with the following PostgreSQL connection settings:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASS=your_password
```

or :

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

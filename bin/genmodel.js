#!/usr/bin/env node
require("dotenv").config();
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { generateModel } = require("../lib/generator");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: genmodel <table> [options]")
  .command(
    "$0 <table>",
    "Generate Sequelize model from PostgreSQL table",
    (yargs) => {
      yargs.positional("table", {
        describe: "Table name in PostgreSQL",
        type: "string",
      });
    }
  )
  .option("name", {
    alias: "n",
    describe: "Custom model name",
    type: "string",
  })
  .option("out", {
    alias: "o",
    describe: "Output folder (default: ./models)",
    type: "string",
    default: "./models",
  })
  .help().argv;

generateModel(argv.table, argv.name, argv.out);

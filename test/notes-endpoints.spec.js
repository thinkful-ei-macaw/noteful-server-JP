const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeNotesArray, makeFoldersArray } = require("./notes.fixtures");

describe("Notes Endpoints", function () {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("noteful-test").truncate());

  context("Given there are notes in the database", () => {
    const testNotes = makeNotesArray;

    this.beforeEach("insert notes", () => {
      return db.into("noteful-test").insert(testNotes);
    });
  });
});

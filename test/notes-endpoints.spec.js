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

  before("clean the table", () =>
    db("notes")
      .truncate()
      .then(() => db.raw("TRUNCATE TABLE folders RESTART IDENTITY CASCADE"))
  );

  afterEach("cleanup", () =>
    db("notes")
      .truncate()
      .then(() => db.raw("TRUNCATE TABLE folders RESTART IDENTITY CASCADE"))
  );

  context("Given there are notes in the database", () => {
    const testFolders = makeFoldersArray();
    const testNotes = makeNotesArray();

    beforeEach("insert folders", () => {
      return db.insert(testFolders).into("folders");
    });
    beforeEach("insert notes", () => {
      return db.insert(testNotes).into("notes");
    });
    it.only("responds with 200 and all of the notes", () => {
      return supertest(app).get("/note").expect(200, testNotes);
    });
  });
  // context(`Given an XSS attack note`, ()=> {
  //   const testNotes = makeNotesArray();
  //   const { maliciousNote, expectedNote } = makeMaliciousNote()

  //   beforeEach('insert malicious note', () => {
  //     return db
  //     .into('notes')
  //     .insert(testNotes)
  //     .then(()=>{
  //       return db
  //       .into('notes')
  //       .insert([maliciousNote])
  //     })
  //   })

  //   it('removes XSS attack content', ()=>{
  //     return supertest(app)
  //     .get('/notes')
  //     .expect(200)
  //     .expect(res => {
  //       expect(res.body[0].title).to.eql(expectedNote.title)
  //       expect(res.body[0].content).to.eql(expectedNote.content)
  //     })
  //   })
  // })
});
describe(`GET /notes/:notes_id`, () => {
  context(`Given no notes`, () => {
    it(`responds with 404`, () => {
      const noteId = 123456;
      return supertest(app)
        .get(`/notes/${noteId}`)
        .expect(404, { error: { message: `Note doesn't exist` } });
    });
  });

  context("Given there are articles in the database", () => {
    const testNotes = makeNotesArray();
  });
});

const request = require("supertest");
const chai = require("chai");
const app = require("../app");

const { expect } = chai;

describe("GET /", () => {
  it("Should render the index page with Login link", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include('<a href="/login">Login</a>');
        done();
      });
  });
});

describe("GET /login", () => {
  it("Should render Sign In with Google link", (done) => {
    request(app)
      .get("/login")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include(`<h1>Login</h1>`);
        expect(res.text).to.include(`<form action="/login" method="POST">`);
        done();
      });
  });
});

describe("GET /not_real_path", () => {
  it("Should render 404 page.", (done) => {
    request(app)
      .get("/not_real_path")
      .expect("Content-Type", /html/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include(
          `<h1>Whoops! You're not supposed to be here....</h1>`
        );
        done();
      });
  });
});

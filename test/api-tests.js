import { expect } from "chai";
import supertest from "supertest-as-promised";
import App from "../server/app";

const app = App();
const request = supertest.agent(app.listen());

describe("Display message to all", () => {

  it("returns the api message to all", (done) => {
    try {
      request
        .get("/api/message")
        .expect(200)
        .end((error, res) => {
          expect(res.body.author).to.equal("Jihdeh");
          done();
        });
    } catch (error) {
      if (error) return done(error);
    }
  });

  it("should throw an error by default", (done) => {
    try {
      request
        .get("/api/throwError")
        .end((error, res) => {
          expect(res.body.status).to.equal(500);
          expect(res.body.status).to.not.equal(200);
          done();
        });
    } catch (error) {
      if (error) return done(error);
    }
  });
});

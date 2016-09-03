import { expect } from "chai";
import supertest from "supertest-as-promised";
import report from "../worker/twitter/text-responder";
import getRates from "../worker/twitter/get-rates";
import moment from "moment";

describe("Test for twitter configuration", () => {
  it("report should contain todays info", async(done) => {
    const response = await report("rates");
    expect(response).to.contain(`${moment().format("MMMM Do YYYY")}`);
    done();
  });

  it("should return rates in json", async(done) => {
    const rates = await getRates();
    expect(rates).to.be.an("object");
    expect(rates).to.not.be.empty;
    done();
  });

  it("results should have values in json", async(done) => {
    const rates = await getRates();
    expect(rates).to.have.deep.property("parallel.usd").that.is.a("string").and.not.equal("");
    done();
  });

});

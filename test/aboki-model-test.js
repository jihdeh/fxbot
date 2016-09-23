import { expect } from "chai";
import _ from "lodash";
import mongoose from "mongoose";

import Aboki from "../app/model/aboki";

describe("Aboki Model", () => {
  before(() => {
    mongoose.connect("mongodb://localhost/test");
  });

  after(() => {
    mongoose.disconnect();
  });

  beforeEach(async(done) => {
    await Aboki.remove({});
    done();
  });

  [
    ["abokiID", "1038184896296564"],
    ["name", "Babajide Fowotade"],
    ["_id", new mongoose.Types.ObjectId()]
  ].map(([field, value]) => {
    it(`should find an aboki by ${field}`, async() => {
      await new Aboki({
        [field]: value }).save();
      const result = await Aboki.findOne({ [field]: value }).lean();

      expect(result).to.have.property(field);
      expect("" + result[field]).to.equal("" + value);
    });

    return [field, value];
  }).map(([field, value]) => {
    it(`should return null when we can't find an article by ${field}`, async() => {
      await new Aboki({
        [field]: value }).save();

      expect(await Aboki.findOne({ name: "not a real thing" })).to.be.null;
    });
  });

  it("should save new aboki", async (done) => {
    try {
      const aboki = new Aboki({
        name: "Babajide Fowotade",
        abokiID: 1038184896296564,
        gender: "male",
        locale: "en_NG",
        timezone: 1
      });

      expect(aboki).to.have.property("abokiID");
      expect(aboki.inSession).to.equal(false);

      aboki.inSession = true;
      await aboki.save();

      // there is only one
      const savedAboki = await Aboki.findOne().exec();
      expect(savedAboki).to.have.property("abokiID");
      expect(savedAboki.inSession).to.equal(true);

      done();
    } catch (error) {
      done(error);
    }
  });

});

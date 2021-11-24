import { getDreams } from "./dreamControllers";
import Dream from "../../database/models/dream";

describe("Given a getDreams function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json and call the Dream.find function", async () => {
      const dreams = [
        {
          id: 1,
          title: "Cosis",
        },
        {
          id: 2,
          title: "wow",
        },
      ];
      Dream.find = jest.fn().mockResolvedValue(dreams);
      const res = {
        json: jest.fn(),
      };

      await getDreams(null, res, null);

      expect(Dream.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
});

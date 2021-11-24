import { getDreams, getUserDreams } from "./dreamControllers";
import Dream from "../../database/models/dream";
import User from "../../database/models/user";

describe("Given a getDreams function", () => {
  describe("When it is called with a res and a req", () => {
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

describe("Given a getUserDreams function", () => {
  describe("When it receives an object req with a userId", () => {
    test("Then it should invoke the method json and call the User.findById function", async () => {
      const req = {
        userId: 1,
      };

      const next = jest.fn();

      const userDreams = {
        id: 1,
        name: "Elso",
        dreams: [
          {
            id: 1,
            title: "Cosis",
          },
          {
            id: 2,
            title: "wow",
          },
        ],
      };

      User.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(userDreams) });

      const res = {
        json: jest.fn(),
      };

      await getUserDreams(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.userId);
      expect(res.json).toHaveBeenCalledWith(userDreams.dreams);
    });
  });

  describe("When it receives an object req without a userId", () => {
    test("Then it should invoke the next with a 'Could not get dreams' error", async () => {
      const req = {};

      const next = jest.fn();

      User.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });

      const res = {
        json: jest.fn(),
      };

      const expectedError = new Error("Could not get dreams");

      await getUserDreams(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

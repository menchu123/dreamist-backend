import {
  getDreams,
  getUserDreams,
  getUserDreamById,
  createDream,
  deleteDream,
  updateDream,
} from "./dreamControllers";
import Dream from "../../database/models/dream";
import User from "../../database/models/user";
import mockResponse from "../../mocks/mockResponse";
import mockRequestPlus from "../../mocks/mockRequestPlus";

jest.setTimeout(20000);

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
      const req = mockRequestPlus();

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

      const res = mockResponse();

      await getUserDreams(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.userId);
      expect(res.json).toHaveBeenCalledWith(userDreams.dreams);
    });
  });

  describe("When it receives an object req without a userId", () => {
    test("Then it should invoke the next with a 'Could not get dreams' error", async () => {
      const req = mockRequestPlus();

      const next = jest.fn();

      User.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });

      const res = mockResponse();

      const expectedError = new Error("Could not get dreams");

      await getUserDreams(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a getUserDreamById function", () => {
  describe("When it receives an id through the req.params", () => {
    test("Then it should invoke the method json with the corresponding dream and call the User.findById function", async () => {
      const req = mockRequestPlus(null, null, { idDream: 1 });

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

      const res = mockResponse();

      await getUserDreamById(req, res, next);

      expect(User.findById).toHaveBeenCalledWith(req.userId);
      expect(res.json).toHaveBeenCalledWith(userDreams.dreams[0]);
    });
  });

  describe("When it receives an id through the req.params and the call to the User.findById function resolves in null", () => {
    test("Then it should invoke next with a 'Could not get dreams' error", async () => {
      const req = mockRequestPlus(null, null, { idDream: 1 });

      const next = jest.fn();

      User.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });

      const res = mockResponse();

      const expectedError = new Error("Could not get dreams");

      await getUserDreamById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a createDream function", () => {
  describe("When it receives a dream through the req.body", () => {
    test("Then it should invoke the method json of res with the new dream", async () => {
      const req: any = {
        body: {
          title: "ay ay ay la que se pudo liar",
          description: "mira es que ni te lo imaginas",
          mood: 1,
        },
        userId: 1,
        file: {
          fileURL: "cosas.jpg",
        },
      };

      const newDream = req.body;

      const next = jest.fn();

      Dream.create = jest.fn().mockResolvedValue(newDream);

      User.findOneAndUpdate = jest.fn().mockResolvedValue({});

      const res = mockResponse();

      await createDream(req, res, next);

      expect(res.json).toHaveBeenCalledWith(newDream);
    });
  });

  describe("When it receives a dream through the req.body but Dream.create fails", () => {
    test("Then it should invoke next with a 'Post failed' error", async () => {
      const req: any = {
        body: {
          title: "ay ay ay la que se pudo liar",
          description: "mira es que ni te lo imaginas",
          mood: 1,
        },
        userId: 1,
        file: {
          fileURL: "cosas.jpg",
        },
      };

      const next = jest.fn();

      Dream.create = jest.fn().mockResolvedValue(null);

      User.findOneAndUpdate = jest.fn().mockResolvedValue({});

      const res = mockResponse();

      const expectedError = new Error("Post failed");

      await createDream(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a deleteDream function", () => {
  describe("When it receives a dream id through the req.params", () => {
    test("Then it should invoke the method json of res with the dream deleted", async () => {
      const deletedDream = {
        id: 1,
      };

      const req = mockRequestPlus(null, null, { idDream: deletedDream.id });
      const res = mockResponse();

      const next = jest.fn();
      Dream.findByIdAndDelete = jest.fn().mockResolvedValue(deletedDream);

      await deleteDream(req, res, next);

      expect(res.json).toHaveBeenCalledWith(deletedDream);
    });
  });
  describe("When it receives a non existent dream id through the req.params", () => {
    test("Then it should invoke next with a 'Dream not found :('", async () => {
      const deletedDream = {
        id: 1,
      };
      const req = mockRequestPlus(null, null, { idDream: deletedDream.id });
      const res = mockResponse();
      const expectedError = new Error("Dream not found :(");
      const next = jest.fn();
      Dream.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteDream(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it doesn't receive a dream id through the req.params", () => {
    test("Then it should invoke next with a 'Couldn't delete dream :('", async () => {
      const req = mockRequestPlus(null, null, null);
      const res = mockResponse();
      const expectedError = new Error("Couldn't delete dream :(");
      const next = jest.fn();
      Dream.findByIdAndDelete = jest.fn().mockRejectedValue(null);

      await deleteDream(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given an updateDream function", () => {
  describe("When it receives a  dream id through the req.params but the update fails", () => {
    test("Then it should invoke next with a 'Couldn't update dream :(", async () => {
      const updatedDream = {
        id: 1,
      };
      const req: any = {
        params: { idDream: updatedDream.id },
        file: {
          fileURL: "cosas.jpg",
        },
      };
      const res = mockResponse();

      const next = jest.fn();
      const expectedError = new Error("Couldn't update dream :(");
      Dream.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updateDream(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a non existent dream id through the req.params", () => {
    test("Then it should invoke next with a 'Dream not found :(", async () => {
      const req = mockRequestPlus(null, null, { idDream: 4 });
      const res = mockResponse();

      const next = jest.fn();
      const expectedError = new Error("Dream not found :(");
      Dream.findById = jest.fn().mockResolvedValue(null);

      await updateDream(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a dream id through the req.params", () => {
    test("Then it should invoke res json with the updated dream", async () => {
      const updatedDream = {
        id: 1,
      };
      const req = mockRequestPlus(null, null, { idDream: updatedDream.id });
      const res = mockResponse();

      const next = jest.fn();
      Dream.findById = jest.fn().mockResolvedValue(updatedDream);
      Dream.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedDream);

      await updateDream(req, res, next);

      expect(res.json).toHaveBeenCalledWith(updatedDream);
    });
  });
});

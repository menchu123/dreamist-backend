import RequestPlus from "../utils/RequestPlus";

const mockRequestPlus = (body?: any, header?: any, params?: any) => {
  const req = {} as RequestPlus;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.userId = "";
  req.params = params;

  return req;
};

export default mockRequestPlus;

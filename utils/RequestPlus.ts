import { Request } from "express";

interface RequestPlus extends Request {
  params: any;
  userId?: string;
  userName?: string;
  file?: any;
  headers: any;
}

export default RequestPlus;

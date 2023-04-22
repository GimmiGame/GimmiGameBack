import { Request } from '@nestjs/common';
import { UserReq } from './user-req';

export interface AuthenticatedRequest extends Request {
  user: UserReq;
}

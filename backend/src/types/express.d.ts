/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request } from 'express'

declare module 'express' {
  export interface Request {
    locals?: { token: string }
  }
}

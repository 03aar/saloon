import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({ error: 'Validation failed', details: result.error.flatten() })
    }
    req.body = result.data
    next()
  }
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      return res.status(400).json({ error: 'Validation failed', details: result.error.flatten() })
    }
    ;(req as any).validatedQuery = result.data
    next()
  }
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err)
  const status = err.statusCode ?? err.code ?? 500
  const safeStatus = typeof status === 'number' && status >= 400 && status < 600 ? status : 500
  res.status(safeStatus).json({ error: err.message ?? 'Internal server error' })
}

import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                // Changed: Return path and message
                errors: result.error.issues.map(e => ({
                    path: e.path[0], 
                    message: e.message
                }))
            })
        };

        req.body = result.data;

        next()
    };
};
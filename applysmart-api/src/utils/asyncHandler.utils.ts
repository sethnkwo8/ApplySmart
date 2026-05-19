import { Request, Response, NextFunction } from "express";

// Define a type for our asynchronous controller signature layout
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;

/**
 * Wraps an asynchronous Express route controller to automatically catch errors
 * and forward them downstream to the centralized error-handling middleware.
 */
export const asyncHandler = (fn: AsyncController) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// Optimize controller
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import { optimizeCV } from "../services/optimize.service.js";
import { extractText } from "../utils/textExtractor.js";

export async function optimize(req: AuthRequest, res: Response, next: NextFunction) {
    // Verify user
    if (!req.user) {
        throw new AppError("Unauthorized", 401)
    }

    let cvText: string;
    const {jobDescription} = req.body;

    // Verify job description exists, and either a file OR pasted text
    if (!jobDescription || (!req.file && !req.body.cvText)) {
        throw new AppError("Please provide a job description and either upload a CV file or paste your resume text.", 400);
    }

    // If file is uploaded set CV text to extracted text
    if (req.file) {
        cvText = await extractText(req.file.buffer, req.file.mimetype)
    } else {
        // Else set CV text to text sent
        cvText = req.body.cvText;
    }

    const result = await optimizeCV(cvText, jobDescription)

    res.status(200).json({
        message: "success",
        data: result
    })

}
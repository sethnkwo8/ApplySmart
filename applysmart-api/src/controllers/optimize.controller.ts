// Optimize controller
import { Response} from "express";
import { AuthRequest } from "../types/express.js";
import { AppError } from "../utils/AppError.js";
import { createOptimizationReport } from "../services/optimize.service.js";
import { extractText } from "../utils/textExtractor.js";

export async function optimize(req: AuthRequest, res: Response) {
    // Verify user
    if (!req.user) {
        throw new AppError("Unauthorized", 401)
    }

    const userId = req.user.userId

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

    const result = await createOptimizationReport({
        userId,
        cvText,
        jobDescription,
        fileName: req.file?.originalname,
        fileSize: req.file?.size,
        fileType: req.file?.mimetype
    })

    res.status(201).json({
        success: true,
        message: "CV optimized and analytics report generated successfully",
        data: result
    })

}
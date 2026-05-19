// Text extractor utility
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { AllowedMimeType, ALLOWED_MIME_TYPES } from "../config/file.config.js";

// Validates if mime type is allowed
export function isValidMimeType(mimeType: string): mimeType is AllowedMimeType {
    return ALLOWED_MIME_TYPES.includes(mimeType as AllowedMimeType);
}

// Clean extracted text utility
export function cleanExtractedText(text: string): string {
    return text
        .replace(/\r/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/\s+/g, " ")
        .trim()
}

// Multer converts CV passed into raw bytes, mimeType is the file type 
export async function extractText(buffer: Buffer, mimeType: string): Promise<string> {
    // Validates mime type first
    if (!isValidMimeType(mimeType)) {
        throw new Error(`Unsupported file type pipeline request validation failure: ${mimeType}`);
    }
    // Switch case depending on the unique file type
    switch (mimeType) {
        // Plain .txt files
        case "text/plain":
            return buffer.toString("utf-8");
        // .pdf files
        case "application/pdf": {
            const parser = new PDFParse({data: buffer});
            const result = await parser.getText();
            const text = result.text?.trim() || "";

            // If no text for image-only, scanned and malformed pdfs
            if (!text) {
                throw new Error("No readable text could be extracted")
            }

            return cleanExtractedText(text)
        }
        // .docx or msword files
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "application/msword": {
            const result = await mammoth.extractRawText({buffer});
            const text = result.value?.trim() || ""

            return cleanExtractedText(text)
        }
        default:
            throw new Error(`Unsupported file type: ${mimeType}`);
    }
}
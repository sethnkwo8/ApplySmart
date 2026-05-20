// CV upload middleware
import multer from "multer";
import { MAX_FILE_SIZE_BYTES, ALLOWED_MIME_TYPES } from "../config/file.config.js";
import { isValidMimeType } from "../utils/textExtractor.js";

// Tells Node to store file in temporary RAM cache as a raw binary buffer
const storage = multer.memoryStorage();

// Instantiate middleware
export const cvUploadMiddleware = multer({
    storage,
    // File size limit
    limits: {fileSize: MAX_FILE_SIZE_BYTES},
    // callback hook that executes before file bytes are even written to server's memory
    fileFilter(req, file, callback) {
        // If file type sent in headers is in specified allowed types
        if (isValidMimeType(file.mimetype)) {
            callback(null, true) // Accept the file
        } else {
            callback(new Error(`Validation Error: Unsupported media format type (${file.mimetype})`));
        }
    },
}).single('file')
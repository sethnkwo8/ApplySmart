// MIME configuration file

// Allowed file types
export const ALLOWED_MIME_TYPES = [
    "text/plain",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/msword" // .doc
] as const

// Allowed mime type
export type AllowedMimeType = typeof ALLOWED_MIME_TYPES[number];

// File size limit 
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB limit container


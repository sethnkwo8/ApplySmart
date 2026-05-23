// API for optimize routes
import { OptimizePayload } from "@/types/optimize";

// Send CV for optimization api function
export async function sendCvForOptimization(payload: OptimizePayload) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const {jobDescription, cvText, cvFile} = payload;

    // If user uploaded a file (send multi part/ formData)
    if (cvFile) {
        const formData = new FormData();
        formData.append("file", cvFile); // name is meant to match the name in multer middleware
        formData.append("jobDescription", jobDescription)

        const res = await fetch(`${apiURL}/optimize/`, {
            method: "POST",
            credentials: "include",
            body: formData
        })

        const data = await res.json();

        if (!res.ok) {
            throw data
        }

        return data
    }

    if (cvText) {
        const res = await fetch(`${apiURL}/optimize/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jobDescription,
                cvText
            })
        })

        const data = await res.json();

        if (!res.ok) {
            throw data
        }

        return data
    }
}
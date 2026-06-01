// API for dashboard routes

// GET API function for dashboard data
export async function fetchDashboardData(page: number = 1, limit: number = 5) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiURL}/dashboard?page=${page}&limit=${limit}`, {
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return data
}
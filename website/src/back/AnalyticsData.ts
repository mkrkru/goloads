export interface AnalyticsData {
    id: string,
    clicks: number[],
    uniqueClicks: number[],
    views: number[],
    uniqueViews: number[]
}

export function fetchAnalyticsData(id: string, fn : (data? : AnalyticsData) => void) : void {
    fetch(`http://192.168.214.15:8080/analytics?id=${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        else {
            console.log(response) // Log not ok response
            return null;
        }
    })
    .then(fn)
}
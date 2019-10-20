const BASE_URL = "http://localhost:7878"

async function query(endpoint, method="get", body={}) {

    let headers = (method === "post" || method === "patch") ? { "Content-Type": "application/json" } : {}

    let options = {
        credentials: "include",
        method: method.toUpperCase()
    }

    if (method === "post" || method === "patch") {
        options = Object.assign(options, {
            headers: headers,
            body: JSON.stringify(body)
        })
    }
    
    const res = await fetch(`${BASE_URL}/${endpoint}`, options)
    return res.json()
}

export default query
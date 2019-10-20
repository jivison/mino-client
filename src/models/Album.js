import query from "../api/query"

const Album = {
    all() {
        return query("albums")
    }
}

export default Album
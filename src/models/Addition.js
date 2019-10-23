import query from "../api/query"

const Addition = {
    all() {
        return query("/additions")
    },
    create(params) {
        return query("/additions", "post", params)
    },
    one(id) {
        return query(`/additions/${id}`)
    },
    destroy(id) {
        return query(`/additions/${id}`, "delete")
    }
}

export default Addition
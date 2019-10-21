import query from "../api/query"

const Artist = {

    endpoint: "artists",

    all() {
        return query("artists")
    },

    one(id) {
        return query(`artists/${id}`)
    },

    create(params) {
        return query("artists", "post", params)
    },

    delete(id) {
        return query(`artists/${id}`, "delete")
    },

    update(id, params) {
        return query(`artists/${id}`, "patch", params)
    },

    mergeable(id) {
        return query(`artists/${id}/mergeable`)
    },

    merge(id, params) {
        return query(`artists/${id}/merge`, "post", params)
    }

}

export default Artist
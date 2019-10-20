import query from "../api/query";

const Album = {
    endpoint: "albums",

    all() {
        return query("albums");
    },
    one(id) {
        return query(`albums/${id}`);
    },

    delete(id) {
        return query(`albums/${id}`, "delete");
    },

    update(id, params) {
        return query(`albums/${id}`, "patch", params);
    },

    mergeable(id) {
        return query(`albums/${id}/mergeable`);
    },

    merge(id, params) {
        return query(`albums/${id}/merge`, "post", params);
    },

    moveable(id) {
        return query(`albums/${id}/moveable`)
    },

    move(id, params) {
        return query(`albums/${id}/move`, "post", params)
    }
};

export default Album;

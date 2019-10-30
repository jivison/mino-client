import query from "../api/query";

const endpoint = "tracks";

const Track = {
    endpoint: endpoint,

    all() {
        return query(endpoint);
    },

    create(params) {
        return query(endpoint, "post", params);
    },

    update(id, params) {
        return query(`${endpoint}/${id}`, "patch", params);
    },

    moveable(id) {
        return query(`${endpoint}/${id}/moveable`);
    },

    move(id, params) {
        return query(`${endpoint}/${id}/move`, "post", params);
    },
    destroy(id) {
        return query(`${endpoint}/${id}`, "delete");
    }
};

export default Track;

import query from "../api/query";

const Background = {
    find_tags_for_every_track() {
        return query("$/find_tags_for_every_track", "post", {});
    },

    tag_addition(addition_id) {
        return query("$/find_tags_for_every_track", "post", {
            addition_id: addition_id
        });
    },

    get_album_art(album) {
        return query("$/get_album_art", "post", {
            album_id: album.id,
            album_name: album.title,
            artist_name: album.artist.title
        });
    },

    get_artist_art(artist) {
        return query("$/get_artist_art", "post", {
            artist_id: artist.id,
            artist_name: artist.title
        });
    },

    add_tags_to_album(id, tags) {
        return query("$/add_tags_to_album", "post", {
            id: id,
            tags: tags
        });
    },

    find_tags_for_albums_tracks(id) {
        return query("$/find_tags_for_albums_tracks", "post", { id: id });
    },

    add_tags_to_artist(id, tags) {
        return query("$/add_tags_to_artist", "post", {
            id: id,
            tags: tags
        });
    },

    find_tags_for_artists_tracks(id) {
        return query("$/find_tags_for_artists_tracks", "post", { id: id });
    },

    clean_collection() {
        return query("$/clean_collection", "post", {});
    },

    clean_addition(addition_id) {
        return query("$/clean_collection", "post", {
            addition_id: addition_id
        });
    },

    change_session(params) {
        return query("$/change_session", "post", params);
    },

    get_session(session_key) {
        return query(`$/get_session?session_key=${session_key}`);
    }
};

export default Background;

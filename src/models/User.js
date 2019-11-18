import query from "../api/query";

const User = {
    current() {
        return query("/users/current");
    },

    signup(params) {
        return query("/signup", "post", { user: params });
    },

    signin(params) {
        return query("/signin", "post", params);
    },

    signout() {
        return query("/signout", "post");
    }
};

export default User;

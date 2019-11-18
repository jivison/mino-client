import React from "react";
import Page from "./Page";
import Form from "../components/helpers/Form";
import FormField from "../components/helpers/FormField";

function SigninPage({ handleSignIn, errors = [] }) {
    return (
        <Page title="Sign In">
            <Form
                title="Sign In"
                fields={["username", "password"]}
                submitHandler={handleSignIn}
                errors={errors}
            >
                <FormField name="username" title="Username" />
                <FormField name="password" title="Password" type="password" />

                <FormField submit title="Sign In" />
            </Form>
        </Page>
    );
}

export default SigninPage;

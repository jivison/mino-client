import React from "react";
import Page from "./Page";
import Form from "../components/helpers/Form";
import FormField from "../components/helpers/FormField";

function SignupPage({ handleSignUp, errors }) {
    return (
        <Page title="Sign Up">
            <Form
                title="Sign Up"
                fields={[
                    "username",
                    "email",
                    "password",
                    "password_confirmation"
                ]}
                errors={errors}
                submitHandler={handleSignUp}
            >
                <FormField name="username" title="Username" />
                <FormField name="email" title="Email" type="email" />
                <FormField name="password" title="Password" type="password" />
                <FormField
                    name="password_confirmation"
                    title="Password Confirmation"
                    type="password"
                />
                <FormField submit title="Sign Up" />
            </Form>
        </Page>
    );
}

export default SignupPage;

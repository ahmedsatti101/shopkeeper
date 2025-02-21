import { FlatList, Text, TextInput, View } from "react-native";
import { object, string } from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../components/SubmitButton";

const DATA = [
    "Password can't be too similar to your other personal information",
    "Password must contain at least 8 characters",
    "Password can't be a commonly used password",
    "Password can't be entirely numeric",
];

const formSchema = object({
    username: string()
        .required("Username is required")
        .max(150, "Username length must be 150 characters or less"),
    password: string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
});

export default function SignUpForm() {
    const onSubmit = () => {
        console.log("form submitted");
    };
    return (
        <View className="flex-1 bg-[#e0b688] px-[20px] pt-[40px]">
            <Text className="text-center font-serif text-3xl font-bold mb-[10px]">
                Sign up
            </Text>
            <Text className="text-center font-serif text-base font-bold text-[#787171] mb-[20px]">
                Create an account to add items to your basket
            </Text>

            <View className="mb-[20px]">
                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={formSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, isValid, errors }) => (
                        <Form>
                            <Text className="font-serif text-[21px] font-bold mb-[5px]">
                                Username
                            </Text>
                            <Field name="username">
                                {({ field, form }) => (
                                    <input
                                        className="rounded-[10px] bg-[#c4574f40] px-10 mb-[10px] h-[45px]"
                                        type="text"
                                    />
                                )}
                            </Field>
                            {errors.username}
                            <Text className="font-serif text-sm text-[#787171] mb-[5px] font-bold">
                                Required. 150 characters or fewer. Letters, digits and @/./+/-/_
                                only.
                            </Text>

                            <Text className="font-serif text-[21px] font-bold mb-[5px]">
                                Password
                            </Text>
                            <Field name="password">
                                {({ field, form }) => (
                                    <input
                                        className="rounded-[10px] bg-[#c4574f40] px-10 mb-[10px] h-[45px]"
                                        type="password"
                                    />
                                )}
                            </Field>
                            {errors.password}
                            <FlatList
                                data={DATA}
                                renderItem={({ item }) => (
                                    <Text className="font-serif text-sm text-[#787171] mb-[5px] font-bold">
                                        {item}
                                    </Text>
                                )}
                                testID="password-requirements"
                            />

                            <button type="submit" disabled={isSubmitting || !isValid}>
                                Sign up
                            </button>
                        </Form>
                    )}
                </Formik>
            </View>

            {/* <Button text="Sign up" /> */}
            <Text className="text-center font-serif text-base font-bold mt-[20px]">
                Already a customer? Sign in
            </Text>
        </View>
    );
}

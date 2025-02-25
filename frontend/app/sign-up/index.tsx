import { FlatList, Text, TextInput, View } from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "../components/SubmitButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";

const USRNAMEREQS = [
  "Username can be 150 characters or less",
  "Letters, digits and @ . + - _ characters can only be used",
];

const PASSREQ = [
  "Password can't be too similar to your other personal information",
  "Password must contain at least 8 characters",
  "Password can't be a commonly used password",
  "Password can't be entirely numeric",
];

const formSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .max(150, "Username length can only be 150 characters or less")
    .default(""),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .default(""),
});

export default function SignUpForm() {
  const passwordInputRef = useRef(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit: SubmitHandler<typeof formSchema> = (data: any) =>
    console.log(data);

  return (
    <View className="flex-1 bg-[#e0b688] px-[20px] pt-[40px]">
      <Text className="text-center font-serif text-3xl font-bold mb-[10px]">
        Sign up
      </Text>

      <View className="mb-[20px]">
        <Text className="font-serif text-[21px] font-bold mb-[5px]">
          Username
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              accessibilityLabel="Username text input"
              className="rounded-[10px] bg-[#c4574f40] px-10 mb-[10px] h-[45px]"
              inputMode="text"
              value={value}
              onChangeText={onChange}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
          )}
          name="username"
        />
        {errors.username?.message && (
          <Text className="text-red-600 m-1">{errors.username?.message}</Text>
        )}

        <FlatList
          data={USRNAMEREQS}
          renderItem={({ item }) => (
            <Text className="font-serif text-sm text-[#787171] mb-[5px] font-bold">
              {item}
            </Text>
          )}
          testID="username-requirements"
        />

        <Text className="font-serif text-[21px] font-bold mb-[5px]">
          Password
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              ref={passwordInputRef}
              accessibilityLabel="Password input"
              className="rounded-[10px] bg-[#c4574f40] px-10 mb-[10px] h-[45px]"
              secureTextEntry
              inputMode="text"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password?.message && (
          <Text className="text-red-600 m-1">{errors.password?.message}</Text>
        )}
        <FlatList
          data={PASSREQ}
          renderItem={({ item }) => (
            <Text className="font-serif text-sm text-[#787171] mb-[5px] font-bold">
              {item}
            </Text>
          )}
          testID="password-requirements"
        />
      </View>

      <Button text="Sign up" onPress={handleSubmit(onSubmit)} />
      <Text className="text-center font-serif text-base font-bold mt-[20px]">
        Already a customer? Sign in
      </Text>
    </View>
  );
}

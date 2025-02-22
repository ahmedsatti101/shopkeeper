import { Text, View, TextInput } from "react-native";
import Button from "../components/SubmitButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";

const formSchema = yup.object({
  username: yup.string().required("Username is required").default(""),
  password: yup.string().required("Password is required").default(""),
});

export default function SignInForm() {
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
        Sign in
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
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
          )}
          name="username"
        />
        {errors.username?.message && (
          <Text className="text-red-600 m-1">{errors.username?.message}</Text>
        )}

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
        <Button text="Sign in" onPress={handleSubmit(onSubmit)} />
        <Text className="text-center font-serif text-base font-bold mt-[20px]">
          Need to create an account? Sign up
        </Text>
      </View>
    </View>
  );
}

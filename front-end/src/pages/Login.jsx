import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Text,
  Center,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useLogin } from "../contexts/AuthProvider";
import { useCallback } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const login = useLogin();
  const toast = useToast();

  const onSubmit = useCallback(
    async (formData) => {
      const success = await login(formData);
      if (success) {
        history.replace("/authhome");
        toast({
          title: "U bent ingelogd",
          description: "Fijn dat je er bent :)",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login mislukt",
          description: "Gebruikersnaam en wachtwoord komen niet overeen",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    },
    [history, login, toast]
  );

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.600" p={12} rounded={6}>
          <Heading mb={6} textColor="white">
            Log in
          </Heading>
          <FormControl id="username" isRequired>
            <FormLabel textColor="white">Gebruikersnaam</FormLabel>
            <Input
              placeholder="Jan Smit"
              variant="filled"
              mb={1}
              data-cy="username_input"
              type="text"
              {...register("username", {
                required: "Dit veld is verplicht",
              })}
            ></Input>
            {errors.username && (
              <Text mb={2} textColor="red">
                {errors.username.message}
              </Text>
            )}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel textColor="white">Wachtwoord</FormLabel>
            <Input
              placeholder="********"
              variant="filled"
              mb={1}
              data-cy="password_input"
              type="password"
              {...register("password", { required: "Dit veld is verplicht" })}
            ></Input>
            {errors.password && (
              <Text mb={4} textColor="red">
                {errors.password.message}
              </Text>
            )}
          </FormControl>
          <Button
            colorScheme="orange"
            onClick={handleSubmit(onSubmit)}
            data-cy="submit_login"
            mb={4}
            mt={4}
          >
            Log in
          </Button>
          <Center>
            <Link to="/">
              <Button colorScheme="orange" variant="ghost">
                Keer terug
              </Button>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

import { Box, Text, Stack } from "@chakra-ui/layout";
import { FaPen } from "react-icons/fa";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  useToast,
  Center,
  IconButton,
  Image,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import * as MenuApi from "../api/menu";
import { useMenuUpdate } from "../contexts/MenuProvider";
import { useSession } from "../contexts/AuthProvider";

export default function MenuCard({ name, price, thumbnail, ingredients, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { isAuthed } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const refreshMenu = useMenuUpdate();

  const onSubmit = useCallback(
    async (formData) => {
      try {
        formData.id = id;
        await MenuApi.saveMenu(formData);
        await refreshMenu();
        onClose();
        toast({
          title: "Menu is aangepast",
          description:
            "Bezoekers van de website kunnen nu het aangepaste menu raadplegen",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Menu kan niet aangepast worden",
          description: "Contacteer de website beheerder voor verdere info",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [id, onClose, refreshMenu, toast]
  );

  return (
    <>
      <Box p={6} className="inline-block max-w-md max-h-md">
        <Box
          direction="column"
          background="gray.600"
          p={6}
          rounded={12}
          alignItems="center"
          justifyContent="center"
        >
          <Center>
            <Image
              className="h-40"
              rounded={12}
              mb={2}
              src={thumbnail}
              alt=""
            />
          </Center>

          <Stack alignItems="center" justifyContent="center">
            <Text color="white" fontSize="xl">
              {name}
            </Text>
            <Text color="white" fontSize="md" data-cy="menu_ingredients">
              {ingredients}
            </Text>
            <Text color="white" fontSize="md" data-cy="menu_price">
              {price} euro
            </Text>
            {isAuthed && (
              <IconButton
                colorScheme="orange"
                onClick={onOpen}
                icon={<FaPen />}
                data-cy="menu_edit_button"
              />
            )}
          </Stack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Menu aanpassen</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Input
              placeholder={name}
              variant="filled"
              mb={3}
              type="text"
              disabled
            ></Input>
            <FormControl id="ingredients" isRequired>
              <FormLabel>Ingredienten</FormLabel>
              <Input
                placeholder={ingredients}
                variant="filled"
                mb={3}
                type="text"
                {...register("ingredients", {
                  required: "Dit veld is verplicht",
                })}
                data-cy="menu_ingredients_input"
              ></Input>
              {errors.price && (
                <Text textColor="red">{errors.price.message}</Text>
              )}
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Prijs</FormLabel>
              <NumberInput mb={3} min={1} max={100}>
                <NumberInputField
                  placeholder={price}
                  variant="filled"
                  type="text"
                  {...register("price", { required: "Dit veld is verplicht" })}
                  data-cy="menu_price_input"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.price && (
                <Text mb={5} textColor="red">
                  {errors.price.message}
                </Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Annuleren
            </Button>
            <Button
              colorScheme="orange"
              onClick={handleSubmit(onSubmit)}
              data-cy="submit_edit_menu"
            >
              Versturen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

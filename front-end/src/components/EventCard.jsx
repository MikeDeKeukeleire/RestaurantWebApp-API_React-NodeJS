import { Box, Text, Stack } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  useToast,
  useDisclosure,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useCallback } from "react";
import { FaPen } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import * as EventApi from "../api/event";
import { useEventUpdate } from "../contexts/EventProvider";
import { useSession } from "../contexts/AuthProvider";

export default function EventCard({ date, title, description, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const refreshEvent = useEventUpdate();
  const { isAuthed } = useSession();

  const onSubmit = useCallback(
    async (formData) => {
      try {
        formData.id = id;
        await EventApi.saveEvent(formData);
        await refreshEvent();
        onClose();
        toast({
          title: "Evenement is aangepast",
          description:
            "Bezoekers van de website kunnen nu het aangepaste evenement raadplegen",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Dit evenement kan niet aangepast worden",
          description: "Contacteer de website beheerder voor verdere info",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [id, onClose, refreshEvent, toast]
  );

  const [isOpen2, setIsOpen] = React.useState(false);
  const onClose2 = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const deleteEvent = useCallback(async () => {
    try {
      await EventApi.deleteEvent(id);
      await refreshEvent();
      onClose2();
      toast({
        title: "Evenement is geannuleerd",
        description:
          "Bezoekers van de website kunnen het evenement niet meer raadplegen",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Dit evenement kan niet geannuleerd worden",
        description: "Contacteer de website beheerder voor verdere info",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [id, refreshEvent, toast]);

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
          <Stack alignItems="center" justifyContent="center">
            <Text></Text>
            <Text color="white" fontSize="xl" data-cy="event_date">
              {date}
            </Text>
            <Text color="white" fontSize="md" data-cy="event_title">
              {title}
            </Text>
            <Text color="white" fontSize="md" data-cy="event_description">
              {description}
            </Text>
            {isAuthed && (
              <IconButton
                colorScheme="orange"
                onClick={onOpen}
                icon={<FaPen />}
                data-cy="event_edit_button"
              />
            )}
            {isAuthed && (
              <IconButton
                colorScheme="orange"
                onClick={() => setIsOpen(true)}
                icon={<BsFillTrashFill />}
                data-cy="event_delete_button"
              />
            )}
          </Stack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Evenement aanpassen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="date" isRequired>
              <FormLabel>Datum</FormLabel>
              <Input
                placeholder={date}
                variant="filled"
                mb={3}
                type="date"
                {...register("date", {
                  required: "Dit veld is verplicht",
                })}
                data-cy="event_date_input"
              ></Input>
              {errors.date && (
                <Text mb={2} textColor="red">
                  {errors.date.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="title" isRequired>
              <FormLabel>Naam</FormLabel>
              <Input
                placeholder={title}
                variant="filled"
                mb={3}
                type="text"
                {...register("title", {
                  required: "Dit veld is verplicht",
                })}
                data-cy="event_title_input"
              ></Input>
              {errors.title && (
                <Text mb={2} textColor="red">
                  {errors.title.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Beschrijving</FormLabel>
              <Input
                placeholder={description}
                variant="filled"
                mb={3}
                type="text"
                {...register("description", {
                  required: "Dit veld is verplicht",
                })}
                data-cy="event_description_input"
              ></Input>
              {errors.description && (
                <Text mb={2} textColor="red">
                  {errors.description.message}
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
              data-cy="submit_edit_event"
            >
              Versturen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Annuleer evenement
            </AlertDialogHeader>

            <AlertDialogBody>
              Ben je zeker dat je dit evenement wilt annuleren?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose2}>
                Terug
              </Button>
              <Button
                colorScheme="red"
                onClick={(onClose2, deleteEvent)}
                ml={3}
                data-cy="submit_delete_event"
              >
                Verwijder
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

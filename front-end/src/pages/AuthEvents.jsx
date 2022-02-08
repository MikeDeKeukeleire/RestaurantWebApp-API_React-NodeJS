import React, { useCallback } from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import { useEvent } from "../contexts/EventProvider";
import EventCard from "../components/EventCard";
import { BsPlusCircle } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  useDisclosure,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Text } from "@chakra-ui/layout";
import * as EventApi from "../api/event";
import { useEventUpdate } from "../contexts/EventProvider";

export default function AuthHome() {
  const { event } = useEvent();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const refreshEvent = useEventUpdate();

  const onSubmit = useCallback(
    async (formData) => {
      try {
        await EventApi.addEvent(formData);
        await refreshEvent();
        onClose();
        toast({
          title: "Evenement is toegevoegd",
          description:
            "Bezoekers van de website kunnen nu het toegevoegde evenement raadplegen",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Menu kan niet toegevoegd worden",
          description: "Contacteer de website beheerder voor verdere info",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [onClose, refreshEvent, toast]
  );

  return (
    <>
      <nav className="bg-gray-600 px-4">
        <AuthNavbar />
      </nav>
      <div className="text-center mt-5">
        <Button
          colorScheme="orange"
          rightIcon={<BsPlusCircle />}
          onClick={onOpen}
          data-cy="event_add_button"
        >
          Evenement toevoegen
        </Button>
      </div>
      <div className="text-center">
        {event.map((event, key) => (
          <EventCard
            date={event.date}
            title={event.title}
            description={event.description}
            id={event.id}
            key={event.id}
          ></EventCard>
        ))}
      </div>
      <footer className="bg-gray-600 text-white px-4">
        <AuthFooter />
      </footer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Evenement toevoegen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="date" isRequired>
              <FormLabel>Datum</FormLabel>
              <Input
                placeholder="Datum van het evenement"
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
              <FormLabel>Titel</FormLabel>
              <Input
                placeholder="Title van het evenement"
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
                placeholder="Beschrijving van het evenement"
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
              data-cy="submit_add_event"
            >
              Versturen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

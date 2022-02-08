import { Input, Stack, Button, FormControl, FormLabel } from "@chakra-ui/react";

const form = () => {
  return (
    <form action="mailto:info@dentyto.be">
      <Stack spacing={4} mt={4}>
        <FormControl isRequired>
          <FormLabel color="white">Naam:</FormLabel>
          <Input backgroundColor="white" type="name" placeholder="Jan Smit" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="white">Email adres:</FormLabel>
          <Input
            backgroundColor="white"
            type="email"
            placeholder="jan@smit.be"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="white">Uw bericht:</FormLabel>
          <Input
            backgroundColor="white"
            type="text"
            placeholder="Schrijf hier uw bericht"
          />
        </FormControl>
        <Button backgroundColor="orange.500" color="white" type="submit">
          Verstuur
        </Button>
      </Stack>
    </form>
  );
};

export default form;

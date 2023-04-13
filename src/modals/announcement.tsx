import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Spacer
} from "@chakra-ui/react";

const HowToPlayModal = (props: { isOpen: boolean; onClose: any, data: Announcement[]}) => {
  return (
    <Modal
      size={{
        base: "md",
        md: "xl",
      }}
      isOpen={props.isOpen}
      onClose={props.onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Announcements</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {
                props.data && (
                    props.data.length > 0 ? props.data.map((e, i) => (
                        <Box key={i} pt={i == 0 ? 0 : 2} pb={2}>
                            <Box
                                display="flex"
                                flexDirection="row"
                            >
                                <Heading fontSize="xl">{e.title}</Heading>
                                <Spacer />
                                <Text fontSize="sm" mt={1}>{new Date(e.created_at).toLocaleString("en-GB")}</Text>
                            </Box>
                            <Text pt={2}>{e.content}</Text>
                            <hr style={{padding: 5}} />
                        </Box>
                    ))
                    :
                    <Text>There's no announcement yet!</Text>
                )
            }
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HowToPlayModal;

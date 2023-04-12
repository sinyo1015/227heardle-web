import React from "react";
import {
  Box,
  Button,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
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
import { DateTime } from "luxon";

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
                    props.data.map((e, i) => (
                        <Box key={i} pt={i == 0 ? 0 : 2} pb={2}>
                            <Box
                                display="flex"
                                flexDirection="row"
                            >
                                <Heading fontSize="xl">{e.title}</Heading>
                                <Spacer />
                                <Text fontSize="sm" mt={1}>{DateTime.fromISO(e.created_at).toFormat("yyyy-MM-dd hh:mm:ss")}</Text>
                            </Box>
                            <Text pt={2}>{e.content}</Text>
                            <hr style={{padding: 5}} />
                        </Box>
                    ))
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

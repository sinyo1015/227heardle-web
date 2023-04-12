import React from "react";
import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { RiPlayCircleLine, RiSpeedLine, RiStarHalfFill } from "react-icons/ri";

const HowToPlayModal = (props: { isOpen: boolean; onClose: any }) => {
  return (
    <Modal
      size={{
        base: "md",
        md: "xl",
      }}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How To Play</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            <ListItem>
              <Box display="flex" flexDirection="row">
                <ListIcon
                  fontSize="4xl"
                  as={RiPlayCircleLine}
                  color="#009ad0d7"
                />
                <Text>
                  Play to the section available, then find the answer available
                  at dropdown selection below.
                </Text>
              </Box>
            </ListItem>
            <ListItem>
              <Box display="flex" flexDirection="row">
                <ListIcon fontSize="4xl" as={RiSpeedLine} color="#009ad0d7" />
                <Text>
                  Incorrect or skipped action will unlock the rest of duration
                  of the music.
                </Text>
              </Box>
            </ListItem>
            <ListItem>
              <Box display="flex" flexDirection="row">
                <ListIcon
                  fontSize="4xl"
                  as={RiStarHalfFill}
                  color="#009ad0d7"
                />
                <Text>
                  Answer as early as possible with few tries, and you also can share
                  the score!
                </Text>
              </Box>
            </ListItem>
          </List>
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

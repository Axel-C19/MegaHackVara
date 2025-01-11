import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { useSailsCalls } from "@/app/hooks";
import { useAccount } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";

const GroupListCreateGroupModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [groupName, setGroupName] = useState("");

  const { account } = useAccount();
  const sails = useSailsCalls();

  const createNewGroup = async () => {
    if (!sails || !account) {
      alert("Sails or account not ready");
      return;
    }

    try {
      const { signer } = await web3FromSource(account.meta.source);
      const response = await sails.command(
        "Service/CreateGroup",
        {
          userAddress: account.decodedAddress,
          signer,
        },
        { callArguments: [groupName] }
      );

      onClose();
    } catch (e) {
      alert("Failed to create group");
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="b">Create a New Group</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color={"black"} as="b">
            New Group Name
          </Text>
          <Input
            placeholder="New Group"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            mt="2"
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              createNewGroup();
            }}
          >
            Create Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GroupListCreateGroupModal;

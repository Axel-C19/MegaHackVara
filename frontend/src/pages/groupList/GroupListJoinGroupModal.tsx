import React from "react";
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
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { group } from "console";

const GroupListJoinGroupModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { account } = useAccount();
  const sails = useSailsCalls();
  const [groupId, setGroupId] = React.useState<string>("");

  const joinGroup = async () => {
    if (!sails || !account) {
      alert("Sails or account not ready");
      return;
    }

    try {
      const { signer } = await web3FromSource(account.meta.source);
      const response = await sails.command(
        "Service/JoinGroup",
        {
          userAddress: account.decodedAddress,
          signer,
        },
        { callArguments: [groupId] }
      );

      console.log(response);
    } catch (e) {
      alert("Failed to join group");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="b">Join a Group</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color={"black"} as="b">
            Group Id
          </Text>
          <Input
            placeholder="123"
            type="number"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              joinGroup();
            }}
          >
            Create Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GroupListJoinGroupModal;

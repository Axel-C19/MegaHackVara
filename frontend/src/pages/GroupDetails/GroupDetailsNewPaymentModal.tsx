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
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ActorId } from "sails-js";

const GroupDetailsNewPaymentModal = ({
  isOpen,
  onClose,
  group,
}: {
  isOpen: boolean;
  onClose: () => void;
  group: any;
}) => {
  const { account } = useAccount();
  const sails = useSailsCalls();
  const [amount, setAmount] = useState("");
  const [actorId, setActorId] = useState("");

  const createNewPayment = async () => {
    if (!sails || !account) {
      alert("Sails or account not ready");
      return;
    }

    try {
      const { signer } = await web3FromSource(account.meta.source);
      const response = await sails.command(
        "Service/AddPayment",
        {
          userAddress: account.decodedAddress,
          signer,
        },
        { callArguments: [group.id, amount, actorId] }
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
          <Text as="b">Add a Payment</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder="Select Group Member"
            onChange={(e) => setActorId(e.target.value)}
          >
            {account &&
              group.members.map((member: any) => {
                if (member === account.decodedAddress) {
                  return null;
                }
                return (
                  <option key={member} value={member}>
                    {member}
                  </option>
                );
              })}
          </Select>
          <InputGroup my={4}>
            <InputLeftElement pointerEvents="none">
              <MdOutlineAttachMoney fontSize={"20px"} />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={createNewPayment}>
            Add Payment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GroupDetailsNewPaymentModal;

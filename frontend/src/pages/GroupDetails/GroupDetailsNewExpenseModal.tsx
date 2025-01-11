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
  VStack,
  Box,
  HStack,
  Highlight,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { group } from "console";
import { set } from "react-hook-form";

const GroupDetailsNewExpenseModal = ({
  groupId,
  isOpen,
  onClose,
}: {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [description, setDescription] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");

  const { account } = useAccount();
  const sails = useSailsCalls();

  const handleAddExpense = async () => {
    if (!sails || !account) {
      alert("Sails or account not ready");
      return;
    }

    try {
      const { signer } = await web3FromSource(account.meta.source);
      const expenseDto = {
        description: description,
        amount: amount,
        currency: "USD",
      };
      const response = await sails.command(
        "Service/AddExpense",
        {
          userAddress: account.decodedAddress,
          signer,
        },
        {
          callArguments: [Number(groupId), expenseDto],
        }
      );
      onClose();
    } catch (e) {
      alert("Failed to create expense");
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="b">Add a Expense</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color={"black"} as="b"></Text>
          <VStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IoNewspaperOutline fontSize={"20px"} />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdOutlineAttachMoney fontSize={"20px"} />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </InputGroup>
            <Text fontWeight="bold">
              <Highlight
                query={["you", "equally", "Accentuate"]}
                styles={{ rounded: "full", bg: "teal.100", px: 2, py: 0.5 }}
              >
                Paid by you and split equally
              </Highlight>
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              handleAddExpense();
            }}
          >
            Add Expense
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GroupDetailsNewExpenseModal;

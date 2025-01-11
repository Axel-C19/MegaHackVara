import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  VStack,
  Text,
  Spinner,
  HStack,
  Divider,
  Button,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineProduct } from "react-icons/ai";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";
import GroupDetailsNewExpenseModal from "./GroupDetailsNewExpenseModal";
import GroupDetailsNewPaymentModal from "./GroupDetailsNewPaymentModal";

function GroupDetails() {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<any>(null);
  const { account } = useAccount();
  const sails = useSailsCalls();
  const GroupDetailsNewExpenseDisclosure = useDisclosure();
  const GroupDetailsNewPaymentDisclosure = useDisclosure();

  const fetchGroupsDetails = async () => {
    if (!sails || !account) {
      return;
    }

    try {
      setLoading(true);
      const response = await sails.query(
        "Service/QueryGroup", // Adjust this command as needed
        {
          userId: account.decodedAddress,
          callArguments: [groupId],
        }
      );

      setGroup(response);
      setLoading(false);
    } catch (e) {
      alert("Failed to fetch groups");
      setLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGroupsDetails();
  }, [groupId, sails, account]);

  if (!group) {
    return (
      <Center>
        <Spinner color="blue.300" size={"xl"} />
      </Center>
    );
  }

  return (
    <>
      <Box bg="#F7A278" w="100%" h="130px"></Box>
      <Box padding={"20px"}>
        <VStack justify={"start"} alignItems={"start"}>
          <Text as="b" fontSize="60px">
            {group.name}
          </Text>
          <HStack>
            <Text fontSize={"17px"} color="orange" as="b">
              You owe $103.67 overall
            </Text>
            <Text fontSize={"17px"} color="green" as="b">
              You are owed $13.67 overall
            </Text>
          </HStack>
        </VStack>
        <Divider marginY={6} />
        <VStack justify={"start"} alignItems={"start"}>
          <HStack>
            <Button
              size="sm"
              colorScheme="orange"
              shadow={"lg"}
              onClick={GroupDetailsNewPaymentDisclosure.onOpen}
            >
              Settle Up
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              shadow="lg"
              onClick={GroupDetailsNewExpenseDisclosure.onOpen}
            >
              Add Expense
            </Button>
            <Button size="sm" shadow="lg">
              Totals
            </Button>
          </HStack>
          <VStack mt="6" w="100%">
            {group && group.expenses.length === 0 && (
              <Text>No Expenses Yet</Text>
            )}
            {group &&
              group.expenses.map((expense: any) => {
                return <ExpenseRow expense={expense} />;
              })}
          </VStack>
        </VStack>
        <GroupDetailsNewExpenseModal
          groupId={groupId}
          isOpen={GroupDetailsNewExpenseDisclosure.isOpen}
          onClose={() => {
            GroupDetailsNewExpenseDisclosure.onClose();
            fetchGroupsDetails();
          }}
        />
        <GroupDetailsNewPaymentModal
          group={group}
          isOpen={GroupDetailsNewPaymentDisclosure.isOpen}
          onClose={() => {
            GroupDetailsNewPaymentDisclosure.onClose();
            fetchGroupsDetails();
          }}
        />
      </Box>
    </>
  );
}

const ExpenseRow = ({ expense }: any) => {
  return (
    <HStack
      w="100%"
      p={4}
      bg="gray.50"
      borderRadius="md"
      boxShadow="xs"
      alignItems={"center"}
    >
      <VStack alignItems={"center"} spacing={0}>
        <Text>Sep</Text>
        <Text>28</Text>
      </VStack>
      <Text fontSize={"50px"} background={"gray.200"} mx="10px">
        <AiOutlineProduct />
      </Text>
      <VStack alignItems={"start"} spacing={0} w="100%">
        <Text fontSize={"17px"}>{expense.description}</Text>
        <Text fontSize="13px">
          You paid ${expense.amount}
          {expense.currency}
        </Text>
      </VStack>
      <VStack alignItems={"end"} spacing={0} w="100%">
        <Text color="green.500">you let</Text>
        <Text color="green.500" as="b">
          ${expense.amount}
        </Text>
      </VStack>
    </HStack>
  );
};

export default GroupDetails;

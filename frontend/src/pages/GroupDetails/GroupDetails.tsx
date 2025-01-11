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
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";
import GroupDetailsNewExpenseModal from "./GroupDetailsNewExpenseModal";
import GroupDetailsNewPaymentModal from "./GroupDetailsNewPaymentModal";
import {
  getTotalOwedFromGroup,
  getTotalOwedFromGroupToEachUser,
} from "./GroupDetails.Utils";
import { set } from "react-hook-form";

function GroupDetails() {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<any>(null);
  const { account } = useAccount();
  const sails = useSailsCalls();
  const GroupDetailsNewExpenseDisclosure = useDisclosure();
  const GroupDetailsNewPaymentDisclosure = useDisclosure();
  const [totalOwed, setTotalOwed] = useState([0, 0]);
  const [totalOwedToEachUser, setTotalOwedToEachUser] = useState<any>({});

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

  useEffect(() => {
    if (account) {
      setTotalOwed(getTotalOwedFromGroup(group, account.decodedAddress));
      const cosa = getTotalOwedFromGroupToEachUser(
        group,
        account.decodedAddress
      );
      setTotalOwedToEachUser(cosa);
    }
  }, [group]);

  if (!group) {
    return (
      <Center>
        <Spinner color="blue.300" size={"xl"} />
      </Center>
    );
  }

  console.log(totalOwedToEachUser);

  return (
    <>
      <Box bg="#F7A278" w="100%" h="130px"></Box>
      <Box padding={"10px"}>
        <HStack spacing={10}>
          <VStack justify={"start"} alignItems={"start"} spacing={0}>
            <Text as="b" fontSize="60px">
              {group.name}
            </Text>
            <Text as="b" mt={-4}>
              Group Id: {group.id}
            </Text>
            <HStack>
              {totalOwed[1] > totalOwed[0] ? (
                <Text>you owe {totalOwed[1]}</Text>
              ) : (
                <Text>you are owed {totalOwed[0]}</Text>
              )}
              {/* <Text fontSize={"17px"} color="orange.300" as="b">
                You owe ${totalOwed[1].toFixed(2)} overall
              </Text>
              <Text fontSize={"17px"} color="green.400" as="b">
                You are owed overall ${totalOwed[0].toFixed(2)}
              </Text> */}
            </HStack>
          </VStack>
          <VStack spacing={0} justify={"center"} alignItems={"start"}>
            {group.members.map((m: any) => {
              if (account && m === account.decodedAddress) {
                return;
              }
              return (
                <HStack spacing={3} alignItems={"center"}>
                  <Avatar size="2xs" name={m} />
                  <Text color="black">
                    {totalOwedToEachUser[m] > 0
                      ? `you owe ${
                          m.slice(0, 5) +
                          "..." +
                          m.slice(m.length - 5, m.length)
                        } $${totalOwedToEachUser[m]}`
                      : `${
                          m.slice(0, 5) +
                          "..." +
                          m.slice(m.length - 5, m.length)
                        } owes you $${Math.abs(totalOwedToEachUser[m])}`}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </HStack>
        <Divider marginY={2} />
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
        <VStack
          my="6"
          justify={"start"}
          alignItems={"start"}
          style={{
            overflowY: "scroll",
            height: "calc(100vh - 400px)",
          }}
        >
          <VStack mt="6" w="100%">
            {group &&
              group.payments.map((payment: any) => {
                return <PaymentRow payment={payment} />;
              })}
          </VStack>
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

const PaymentRow = ({ payment }: any) => {
  return (
    <HStack
      w="100%"
      p={4}
      bg=""
      borderRadius="md"
      boxShadow="xs"
      alignItems={"center"}
    >
      <VStack alignItems={"center"} spacing={0}>
        <Text>Sep</Text>
        <Text>28</Text>
      </VStack>
      <Text fontSize={"50px"} mx="10px" color="green">
        <MdOutlinePayments />
      </Text>
      <Text>
        {payment.from.slice(0, 5)}... paid {payment.to.slice(0, 5)}... $
        {payment.amount}
      </Text>
    </HStack>
  );
};

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

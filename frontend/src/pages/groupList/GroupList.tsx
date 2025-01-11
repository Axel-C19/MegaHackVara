import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";
import { FaDoorOpen } from "react-icons/fa6";
import { web3FromSource } from "@polkadot/extension-dapp";
import GroupListJoinGroupModal from "./GroupListJoinGroupModal";
import { getgroups } from "process";
import GroupListCreateGroupModal from "./GroupListCreateGroupModal";

function GroupsViewer() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const { account } = useAccount();
  const sails = useSailsCalls();

  const GroupListJoinGroupModalDisclosure = useDisclosure();
  const GroupListCreateGroupModalDisclosure = useDisclosure();

  const fetchGroups = async () => {
    if (!sails || !account) {
      return;
    }

    try {
      setLoading(true);
      const response = await sails.query("Service/QueryActorGroups", {
        userId: account.decodedAddress,
      });

      setGroups(response);
      setLoading(false);
    } catch (e) {
      alert("Failed to fetch groups");
      setLoading(false);
      console.error(e);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [account, sails]);

  return (
    <Box
      p={6}
      bg="gray.50"
      borderRadius="md"
      boxShadow="lg"
      maxW="600px"
      m="auto"
      marginBlockStart={10}
      overflowY={"scroll"}
    >
      <VStack spacing={4}>
        <HStack justify={"space-between"} width="100%">
          <Button
            size="sm"
            colorScheme="gray"
            leftIcon={<FaDoorOpen />}
            onClick={GroupListJoinGroupModalDisclosure.onOpen}
          >
            Join Group
          </Button>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color="teal.500"
          >
            Your Groups
          </Text>
          <Button
            size="sm"
            colorScheme="teal"
            leftIcon={<IoMdAdd />}
            onClick={() => {
              GroupListCreateGroupModalDisclosure.onOpen();
            }}
          >
            New Group
          </Button>
        </HStack>
        <VStack spacing={4} width="100%" overflowY={"scroll"}>
          {loading ? (
            <Spinner size="xl" color="teal.500" />
          ) : groups.length ? (
            groups.map((group, index) => (
              <Box
                key={index}
                p={4}
                bg="#134D6B"
                borderRadius="md"
                width="100%"
                cursor={"pointer"}
                onClick={() => {
                  window.location.href = `/group-details/${group.id}`;
                }}
              >
                <Text fontSize="lg" fontWeight="bold" color="white">
                  {group.name}
                </Text>
                <Text color="white">Members: {group.members.join(", ")}</Text>
                <Text color="white">Expenses: {group.expenses.length}</Text>
              </Box>
            ))
          ) : (
            <Alert status="info">
              <AlertIcon />
              No groups found for this wallet
            </Alert>
          )}
        </VStack>
      </VStack>
      <GroupListJoinGroupModal
        isOpen={GroupListJoinGroupModalDisclosure.isOpen}
        onClose={() => {
          fetchGroups();
          GroupListJoinGroupModalDisclosure.onClose();
        }}
      />
      <GroupListCreateGroupModal
        isOpen={GroupListCreateGroupModalDisclosure.isOpen}
        onClose={() => {
          fetchGroups();
          GroupListCreateGroupModalDisclosure.onClose();
        }}
      />
    </Box>
  );
}

export default GroupsViewer;

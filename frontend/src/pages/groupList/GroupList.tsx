import React, { useEffect, useState } from "react";
import { Box, VStack, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useAlert } from "@gear-js/react-hooks";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";

function GroupsViewer() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const { account } = useAccount();
  const sails = useSailsCalls();

  useEffect(() => {
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

    fetchGroups();
  }, [account, alert, sails]);

  return (
    <Box
      p={6}
      bg="gray.50"
      borderRadius="md"
      boxShadow="lg"
      maxW="600px"
      m="auto"
      marginBlockStart={10}
    >
      <VStack spacing={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color="teal.500"
        >
          Your Groups
        </Text>
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
                Group ID: {group.id}
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
    </Box>
  );
}

export default GroupsViewer;

import React, { useEffect, useState } from "react";
import { Box, VStack, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useAlert } from "@gear-js/react-hooks";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";

function GroupsViewer() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const alert = useAlert();
  const { account } = useAccount();
  const sails = useSailsCalls();

  useEffect(() => {
    const fetchGroups = async () => {
      if (!sails || !account) {
        return;
      }

      try {
        setLoading(true);
        const response = await sails.query(
          "Service/Query", // Adjust this command as needed
          {
            userAddress: account.decodedAddress,
          }
        );

        console.log(response);

        setGroups(response.groups);
        setLoading(false);
      } catch (e) {
        alert.error("Failed to fetch groups");
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
    >
      <VStack spacing={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color="teal.500"
        >
          Blockchain Groups
        </Text>
        {loading ? (
          <Spinner size="xl" color="teal.500" />
        ) : groups.length ? (
          groups.map((group, index) => (
            <Box key={index} p={4} bg="teal.100" borderRadius="md" width="100%">
              <Text fontSize="lg" fontWeight="bold">
                Group ID: {group.id}
              </Text>
              <Text>Members: {group.members.join(", ")}</Text>
              <Text>Expenses: {group.expenses.length}</Text>
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

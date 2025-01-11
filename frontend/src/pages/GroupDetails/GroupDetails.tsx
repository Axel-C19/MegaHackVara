import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, VStack, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useAlert } from "@gear-js/react-hooks";
import { useAccount } from "@gear-js/react-hooks";
import { useSailsCalls } from "@/app/hooks";

function GroupDetails() {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const { account } = useAccount();
  const sails = useSailsCalls();

  const fetchGroupsDetails = async () => {
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
      alert("Failed to fetch groups");
      setLoading(false);
      console.error(e);
    }
  };

  const getGroupDetails = async () => {};

  useEffect(() => {}, [groupId]);

  return <div>{groupId}</div>;
}

export default GroupDetails;

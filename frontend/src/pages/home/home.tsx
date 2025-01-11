import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { dAppContext } from '@/Context/dappContext';
import { Button } from '@gear-js/vara-ui';
import { useAccount, useBalance, useDeriveStakingAccount } from '@gear-js/react-hooks';
import { useSailsCalls } from '@/app/hooks';
import "./examples.css";
import { useSafeLayoutEffect } from '@chakra-ui/react';


function Home () {
    const { account } = useAccount();
    const { balance } = useBalance(account?.address);
    const sails = useSailsCalls();

    const sendMessagWithMethod = async (method: string) =>{
        console.log(balance?.toHuman())
    }

    return (
        <div>
        </div>
    );
}

export {Home };

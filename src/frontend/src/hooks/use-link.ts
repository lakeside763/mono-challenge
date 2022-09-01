/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import MonoConnect from '@mono.co/connect.js';
import useAccount from './use-account';

const useLink = () => {
  const { saveLinkedAccount, unlinkAccount } = useAccount();
  const [code, setCode] = useState<string>();
  
  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      key: process.env.REACT_APP_MONO_TEST_PK,
      onSuccess: ({ code }: { code: string }) => setCode(code),
    });
    monoInstance.setup();
    return monoInstance;
  }, []);

  useEffect(() => {
    if (code) {
      const generateAccountId = async () => {
        const response = await fetch('https://api.withmono.com/account/auth', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "mono-sec-key": process.env.REACT_APP_MONO_TEST_SK!,
          },
          body: JSON.stringify({ code }),
        });
        const { id } = await response.json();
        await saveLinkedAccount({ accountId: id, code })
      };
      generateAccountId();
    }
  }, [code]);

  const unlink = async (accountId: string) => {
    console.log(accountId)
    const response = await fetch(`https://api.withmono.com/accounts/${accountId}/unlink`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "mono-sec-key": process.env.REACT_APP_MONO_TEST_SK!,
      },
    });
    if (response.status === 200) {
      await unlinkAccount(accountId);
    } 
  }

  return  {
    monoConnect,
    unlink,
  }
}

export default useLink;
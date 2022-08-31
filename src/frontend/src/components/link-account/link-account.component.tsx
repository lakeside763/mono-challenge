import React, { Fragment, useMemo, useState, useEffect } from 'react'
import { FiLock } from 'react-icons/fi';
import MonoConnect from '@mono.co/connect.js';

import './link-account.style.scss';
import useAccount from '../../hooks/use-account';

const LinkAccount = () => {
  const { saveLinkedAccount } = useAccount();
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
  }, [code, saveLinkedAccount])


  
  return (
    <Fragment>
      <div className="link-account-wrapper">
        <div className="container">
          <div className="icon">
            <FiLock />
          </div>
          <div className="text">
            <h2>Final Step</h2>
            <p>Link your Bank Account in seconds</p>
            <button type='button' onClick={(() => monoConnect.open())}>Link Now</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LinkAccount
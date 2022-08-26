import React, { useMemo } from 'react';
import MonoConnect from '@mono.co/connect.js';

import './App.css';

function App() {

  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      key: process.env.REACT_APP_MONO_TEST_PK,
      onSuccess: ({ code }: { code: string }) => console.log(`Linked successfully: ${code}`),
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
    });

    monoInstance.setup();

    return monoInstance;
  }, []);

  const reauthoriseAccount = () => {
    const reauth_token = "code_xyzUi8olavk";
    monoConnect.reauthorise(reauth_token);
    monoConnect.open();
  }

  return (
    <div className="App">
      <h1>Mono App Integration</h1>
      <div>
        <button onClick={() => monoConnect.open()} className="btn-primary">Link account with Mono</button>
        <button onClick={() => reauthoriseAccount()} className="btn-primary">Reauthorise user account</button>
      </div>
    </div>
  );
}

export default App;

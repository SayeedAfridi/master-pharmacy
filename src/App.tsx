import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Button, Col, Input, Row } from 'antd';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome to Tauri!</h1>
      <Row gutter={[8, 8]}>
        <Col>
          <Input
            id='greet-input'
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder='Enter a name...'
          />
        </Col>
        <Col>
          <Button type='primary' onClick={greet}>
            Greet
          </Button>
        </Col>
      </Row>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;

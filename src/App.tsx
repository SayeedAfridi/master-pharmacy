import { selectAppOpenCount } from '@src/lib/redux/app/app.selsectors';
import { appActions } from '@src/lib/redux/app/app.slice';
import { Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const appOpenCount = useSelector(selectAppOpenCount);
  const dispatch = useDispatch();

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
          <Button
            type='primary'
            onClick={() => dispatch(appActions.increaseOpenCount())}
          >
            Increase Open Count
          </Button>
        </Col>
      </Row>
      <p>app open count: {appOpenCount}</p>
    </div>
  );
}

export default App;

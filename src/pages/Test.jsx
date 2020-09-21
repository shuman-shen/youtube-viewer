/** @jsx jsx */

import { useEffect, useState } from "react";

import { jsx, Button, Text } from "theme-ui";

const Test = ({ location: { state } }) => {
  const { num } = state;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(num);
  }, []);

  return (
    <div>
      <Text>{count}</Text>
      <Button onClick={() => setCount(2)}>Change to 2</Button>
    </div>
  );
};

export default Test;

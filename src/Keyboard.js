import React from "react";
import { Box, Grid, Textarea } from "@chakra-ui/core";
import { Key } from "./Key";
import { Row } from "./Row";

const qwertyLayout = [
  [
    { keys: ["`", "~"], keyCodes: [96, 126] },
    { keys: ["1", "!"], keyCodes: [49, 33] },
    { keys: ["2", "@"], keyCodes: [50, 64] },
    { keys: ["3", "#"], keyCodes: [51, 35] },
    { keys: ["4", "$"], keyCodes: [52, 36] },
    { keys: ["5", "%"], keyCodes: [53, 37] },
    { keys: ["6", "^"], keyCodes: [54, 94] },
    { keys: ["7", "&"], keyCodes: [55, 38] },
    { keys: ["8", "*"], keyCodes: [56, 42] },
    { keys: ["9", "("], keyCodes: [57, 40] },
    { keys: ["0", ")"], keyCodes: [48, 41] },
    { keys: ["-", "_"], keyCodes: [45, 95] },
    { keys: ["=", "+"], keyCodes: [61, 43] },
    { keys: ["backspace"], keyCodes: [], minW: "8rem" },
  ],
  [
    { keys: ["tab"], keyCodes: [], minW: "5rem" },
    { keys: ["q"], keyCodes: [113, 81] },
    { keys: ["w"], keyCodes: [119, 87] },
    { keys: ["e"], keyCodes: [101, 69] },
    { keys: ["r"], keyCodes: [114, 82] },
    { keys: ["t"], keyCodes: [116, 84] },
    { keys: ["y"], keyCodes: [121, 89] },
    { keys: ["u"], keyCodes: [117, 85] },
    { keys: ["i"], keyCodes: [105, 73] },
    { keys: ["o"], keyCodes: [111, 79] },
    { keys: ["p"], keyCodes: [112, 80] },
    { keys: ["[", "{"], keyCodes: [91, 123] },
    { keys: ["]", "}"], keyCodes: [93, 125] },
    { keys: ["\\", "|"], keyCodes: [92, 124], minW: "7rem" },
  ],
  [
    { keys: ["caps"], keyCodes: [], minW: "6.5rem" },
    { keys: ["a"], keyCodes: [97, 65] },
    { keys: ["s"], keyCodes: [115, 83] },
    { keys: ["d"], keyCodes: [100, 68] },
    { keys: ["f"], keyCodes: [102, 70] },
    { keys: ["g"], keyCodes: [103, 71] },
    { keys: ["h"], keyCodes: [104, 72] },
    { keys: ["j"], keyCodes: [106, 74] },
    { keys: ["k"], keyCodes: [107, 75] },
    { keys: ["l"], keyCodes: [108, 76] },
    { keys: [";", ":"], keyCodes: [59, 58] },
    { keys: ["'", '"'], keyCodes: [39, 34] },
    { keys: ["enter"], keyCodes: [13], minW: "9.625rem" },
  ],
  [
    { keys: ["shift"], keyCodes: [], minW: "8rem" },
    { keys: ["z"], keyCodes: [122, 90] },
    { keys: ["x"], keyCodes: [120, 88] },
    { keys: ["c"], keyCodes: [99, 67] },
    { keys: ["v"], keyCodes: [118, 86] },
    { keys: ["b"], keyCodes: [98, 66] },
    { keys: ["n"], keyCodes: [110, 78] },
    { keys: ["m"], keyCodes: [109, 77] },
    { keys: [",", "<"], keyCodes: [44, 60] },
    { keys: [".", ">"], keyCodes: [46, 62] },
    { keys: ["/", "?"], keyCodes: [47, 63] },
    { keys: ["shift"], keyCodes: [], minW: "12.25rem" },
  ],
  [
    { keys: ["ctrl"], keyCodes: [], minW: "5rem" },
    { keys: ["win"], keyCodes: [], minW: "5rem" },
    { keys: ["alt"], keyCodes: [], minW: "5rem" },
    { keys: ["space"], keyCodes: [], minW: "25.75rem" },
    { keys: ["alt"], keyCodes: [], minW: "5rem" },
    { keys: ["fn"], keyCodes: [], minW: "5rem" },
    { keys: ["sm"], keyCodes: [], minW: "5rem" },
    { keys: ["ctrl"], keyCodes: [], minW: "5.25rem" },
  ],
];

const initState = new Set();

function reducer(state, action) {
  switch (action.type) {
    case "keydown":
      state.add(action.payload);
      return state;
    case "keyup":
      state.delete(action.payload);
      return state;
    default:
      return state;
  }
}

export function Keyboard() {
  const [state, dispatch] = React.useReducer(reducer, initState);

  React.useEffect(() => {
    const keydown = window.addEventListener("keydown", (evt) => {
      dispatch({ type: "keydown", payload: evt.keyCode });
    });
    const keyup = window.addEventListener("keyup", (evt) => {
      dispatch({ type: "keyup", payload: evt.keyCode });
    });
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
    };
  }, []);

  React.useEffect(() => {
    console.log(state);
  });

  return (
    <Grid minH="100vh">
      <Box mx="auto" mt="2rem">
        <Textarea
          w="1000px"
          h="360px"
          px="0.575rem"
          fontSize="1.5rem"
          border="1px solid #323"
          boxSizing="border-box"
          mb="auto"
          borderRadius="3px"
          resize="none"
        />
      </Box>
      <Box mx="auto">
        {qwertyLayout.map((row, idx) => (
          <Row mb="3px" key={idx}>
            {row.map(({ keys, keyCodes, ...props }, idx) => (
              <Key
                key={keys[0] + idx}
                keys={keys}
                keyCodes={keyCodes}
                {...props}
              />
            ))}
          </Row>
        ))}
      </Box>
    </Grid>
  );
}

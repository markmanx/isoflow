import { createContext } from "react";
import { interpret, InterpreterFrom } from "xstate";
import { useInterpret } from "@xstate/react";
import { EditorMachine } from "../actions/Editor";

interface Props {
  children: React.ReactNode;
}

type Service = InterpreterFrom<typeof EditorMachine>;

interface Context {
  editor: Service;
}

export const GlobalStateContext = createContext<Context>({
  editor: interpret(EditorMachine),
});

export const GlobalStateProvider = ({ children }: Props) => {
  const editor = useInterpret(EditorMachine);

  return (
    <GlobalStateContext.Provider value={{ editor }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

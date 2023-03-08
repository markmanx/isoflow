import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";

interface Props {
  children: React.ReactElement;
  isIn: boolean;
}

export const Transition = ({ children, isIn }: Props) => {
  return (
    <Slide
      direction="right"
      in={isIn}
      mountOnEnter
      unmountOnExit
      style={{
        transitionDelay: isIn ? "150ms" : "0ms",
      }}
    >
      <Card
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          borderRadius: 0,
        }}
      >
        {children}
      </Card>
    </Slide>
  );
};

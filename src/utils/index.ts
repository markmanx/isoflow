import gsap from "gsap";

export const clamp = (num: number, min: number, max: number) => {
  return num <= min ? min : num >= max ? max : num;
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const tweenPosition = (
  item: paper.Item,
  { x, y, duration }: { x: number; y: number; duration: number }
) => {
  // paperjs doesn't like it when you try to tween the position of an item directly,
  // so we have to use a proxy object
  const currPosition = {
    x: item.position.x,
    y: item.position.y,
  };

  gsap.to(currPosition, {
    duration,
    overwrite: "auto",
    x,
    y,
    onUpdate: () => {
      item.set({ position: currPosition });
    },
  });
};

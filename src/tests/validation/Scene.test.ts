/* eslint-disable jest/no-conditional-expect */
import {
  SceneSchema,
  NodeI,
  ConnectorI,
  GroupI,
  findInvalidNode,
  findInvalidConnector,
  findInvalidGroup,
} from "../../validation/SceneSchema";
import { scene } from "../fixtures/scene";

describe("scene validation works correctly", () => {
  test("scene fixture is valid", () => {
    const result = SceneSchema.safeParse(scene);

    expect(result).toEqual(
      expect.objectContaining({
        success: true,
      })
    );
  });

  test("finds invalid nodes in scene", () => {
    const { icons } = scene;
    const invalidNode = {
      id: "invalidNode",
      icon: "doesntExist",
      position: { x: -1, y: -1 },
    };
    const nodes: NodeI[] = [...scene.nodes, invalidNode];

    const result = findInvalidNode(nodes, icons);

    expect(result).toEqual(invalidNode);
  });

  test("finds invalid connectors in scene", () => {
    const { nodes } = scene;
    const invalidConnector = {
      id: "invalidConnector",
      from: "node1",
      to: "invalidNode",
      label: null,
    };
    const connectors: ConnectorI[] = [...scene.connectors, invalidConnector];

    const result = findInvalidConnector(connectors, nodes);

    expect(result).toEqual(invalidConnector);
  });

  test("finds invalid groups in scene", () => {
    const { nodes } = scene;
    const invalidGroup = {
      id: "invalidGroup",
      label: null,
      nodes: ["invalidNode", "node1"],
    };
    const groups: GroupI[] = [...scene.groups, invalidGroup];

    const result = findInvalidGroup(groups, nodes);

    expect(result).toEqual(invalidGroup);
  });
});

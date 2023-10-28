import { Model } from 'src/types';

export const views: Model['views'] = [
  {
    id: 'view1',
    name: 'View1',
    description: 'View1Description',
    items: [],
    rectangles: [
      { id: 'rectangle1', from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }
    ],
    connectors: [
      {
        id: 'connector1',
        anchors: [
          { id: 'anch1-1', ref: { item: 'node1' } },
          { id: 'anch1-2', ref: { item: 'node2' } }
        ]
      },
      {
        id: 'connector2',
        anchors: [
          { id: 'anch2-1', ref: { item: 'node2' } },
          { id: 'anch2-2', ref: { item: 'node3' } }
        ]
      }
    ]
  }
];

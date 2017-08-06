import React, { PropTypes } from 'react';
import VegaLite, {createClassFromLiteSpec} from 'react-vega-lite';



export default createClassFromLiteSpec('LineChartLite',
{
  "width": 600,
  "height": 300,
  "layer": [
    {
      "selection": {
        "index": {
          "type": "single", "on": "mousemove",
          "encodings": ["x"],
          "nearest": true
        }
      },
      "mark": "line",
      "encoding": {
        "x": {"field": "date", "type": "temporal", "axis": null},
        "y": {"field": "closing price", "type": "quantitative"},
      }
    },
    {
      "transform": [
        {"filter": {
          "and": ["index.date", {"selection": "index"}]
        }}
      ],
      "mark": "rule",
      "encoding": {
        "x": {"field": "date", "type": "temporal", "axis": null}
      }
    }
  ]
}
);






// {
//   "width": 600,
//   "height": 300,
//   "layer": [
//     {
//       "selection": {
//         "index": {
//           "type": "single", "on": "mousemove",
//           "encodings": ["x"],
//           "nearest": true
//         }
//       },
//       "mark": "line",
//       "encoding": {
//         "x": {"field": "date", "type": "temporal", "axis": null},
//         "y": {"field": "closing price", "type": "quantitative"},
//       }
//     },
//     {
//       "transform": [
//         {"filter": {
//           "and": ["index.date", {"selection": "index"}]
//         }}
//       ],
//       "mark": "rule",
//       "encoding": {
//         "x": {"field": "date", "type": "temporal", "axis": null}
//       }
//     },
//   ],
//  }

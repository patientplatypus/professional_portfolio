import React, { PropTypes } from 'react';
import VegaLite, {createClassFromLiteSpec} from 'react-vega-lite';

export default createClassFromLiteSpec('BarChartLite', {
  "description": "A simple bar chart with embedded data.",
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal",
          "scale":{

          }
        },
    "y": {"field": "b", "type": "quantitative",
          "scale":{

          }
    }
  }
});

import React, { PropTypes } from 'react';
import {createClassFromSpec} from 'react-vega';


export default createClassFromSpec('LineChart',{
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
  "width": 1000,
  "height": 400,
  "padding": 5,

  "signals": [
    {
      "name": "interpolate",
      "value": "linear",

    }
  ],
  "data": [{ "name": "table" }],
  "scales": [
    {
      "name": "x",
      "type": "ordinal",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "xlabels",
      "type": "ordinal",
      "domain":  {"data": "table", "field": "x"},
      "range": {"data": "table", "field": "d"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true,
      "zero": false,
      "domain": {"data": "table", "field": "y"}
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {"data": "table", "field": "c"}
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "x",
      "title": "Date",
      "labelPadding": 30,
      "properties": {"labels": {"text": {"scale": "xlabels", "field": "data"}}},
    },
    {"orient": "left", "scale": "y",
      "labelPadding": 30,
      "tickCount": 5
    }
  ],

  "marks": [
    {
      "type": "group",
      "from": {
        "facet": {
          "name": "series",
          "data": "table",
          "groupby": "c"
        }
      },
      "marks": [
        {
          "type": "line",
          "from": {"data": "series"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "x"},
              "y": {"scale": "y", "field": "y"},
              "stroke": {"scale": "color", "field": "c"},
              "strokeWidth": {"value": 2}
            },
            "update": {
              "interpolate": {"signal": "interpolate"},
              "fillOpacity": {"value": 1}
            },
            "hover": {
              "fillOpacity": {"value": 0.5}
            }
          }
        }
      ]
    }
  ]
});

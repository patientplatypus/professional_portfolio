# Blog One - Google Re-Finance

## What it is

This is an API that is a bit of a revamped Google Finance - it makes the colors nicer and has a better UI (at least to my taste). I do a lot of neat things with VictoryCharts and live data loading. It's pretty cool you should check it out.

## Overview

Index.js is where most of the action takes place including the declaration and use of the VictoryCharts components. I call searchnews.js to search for news item, and searchstocks.js to search for stocks. Articlebox.js container contains the list of the articles that are pulled up after a search, and Articleframe.js contains the actual iframe of any article that is clicked on. I have a few files that are marked DEPRECATED - these were investigations into other charting libraries that I then decided not to use. They are kept here so that I can find and reference them later if I decide that they might work well in another project.

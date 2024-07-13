# Stand-up Timer

A simple web application that can be used to track the remaining time in a stand-up meeting, including the time spent by each person.

## Build
This is a simple Vue application using Vite as the build system.

## How to use
The configuration is specified using the URL query parameters:
- `name`: the name of the meeting/stand-up
- `total`: the total duration of the meeting, in seconds.  
  If omitted, the sum of the time for each person will be used as the total.
- any other query adds a line in the list of people. For example:
  - `Tom=60` adds a line with name "Tom" and duration of 60 seconds

Example:  
`https://base-url?name=Standup&total=300&Tom=60&Matt=120`

## Picture in Picture
You can open the list of timers in an additional Picture In Picture window.

This feature uses the [Document Picture in Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API), that is supported only by some browsers. If supported, a button in the footer will be available to use it.

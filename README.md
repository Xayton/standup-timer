# Stand-up Timer

A simple web application that can be used to track the remaining time in a stand-up meeting, including the time spent by each person.

## Build
This is a simple Vue application using Vite as the build system.

## How to use
The configuration is specified using the URL query parameters:
- `name`: the name of the meeting/stand-up
- `total`: the total duration of the meeting, in seconds
- any other query adds a line in the list of people. For example:
  - `Tom=60` adds a line with name "Tom" and duration of 60 seconds

Example:  
`https:\\base-url?name=Standup&total=300&Tom=60&Matt=120`

## Idea: Picture in picture
Note:_this is not implemented yet._

If supported by your browser, clicking on the icon will open a small window, on top of all other, that will show the same content as the main page.
https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API#browser_compatibility

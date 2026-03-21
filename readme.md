# Overview

Draw on video is a program for CECS 574 to demostrate the speedup of AVX256. It consists of a React.JS web based GUI and a C++ Server which has access to edit the files on the host computer. While technically a client & server setup, it is intended to be used as single program with client & server running on the same computer - think of it as a web GUI for a C++ app.

# How to use

## Using the tester (recomended for the scope of this project)

### To test the SIMD speedup, go into the Filters folder and compile & run tester.cpp This will run the blend filter on two images already loaded into memory thus give the purest result of the speedup without needing to load them from disk.

## Using the main program

Compile and run the program using the instruction under "Compilation instruction". You will be greeted with a landing page with two buttons. If both buttons are disabled, it means the server isn't running. Once the server is running, you can click to top button to go to the main program. Here you can select a video from you computer, and select a video file to edit. To draw on the video first create a new layer using the "+" Icon on the top bar and use your mouse to draw on the video. "Star - End" Dictates when your drawing will start and end relative to the video, this is useful if you only want to draw on a section of the video.

## Compilation instruction

### Using the tester
Go to the “Filters” folder ( cd ./Filters )
Compile “tester.cpp” ( g++ tester.cpp ) 
Run the output file


### Building Frontend

1. Install NPM (on mac, easy way is to use Brew and Brew -i npm)
2. Navigate to Frontend/app
3. install dependency with command: npm install
4. start server with command: npm run dev

### Building Backend

1. Use your preferred method to compile and run main.cpp using the c++ 17 standard (tested using g++ --std=c++17 main.cpp)

### To run

1. start Backend
2. start Frontend
3. Go to http://localhost:5173/


windows compile with g++ -std=c++17 main.cpp -lws2_32

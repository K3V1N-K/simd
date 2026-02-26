#include "../../lib/httplib.h"

#include <fstream>
#include <iostream>
extern "C" {
#include <libavcodec/avcodec.h>
#include <libavformat/avformat.h>
}

void splitVideo(const std::string allowedClients, httplib::Server *serverptr, const char *path) {
  serverptr->Post(path, [&](const httplib::Request &req, httplib::Response &res) {
    res.set_header("Access-Control-Allow-Origin", allowedClients);

    // req.body;

    AVFormatContext *formatContext = nullptr;

    // Open video file

    if (avformat_open_input(&formatContext, "bob", NULL, NULL) < 0) {
      res.set_content("failed to op", "text/plain");
      return; // Handle error
    }
    res.set_content("Success", "text/plain");
  });
}
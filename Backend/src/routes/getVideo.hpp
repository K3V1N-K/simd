#include "../../lib/httplib.h"

#include <fstream>
#include <iostream>
#include <string>

void getVideo(const std::string allowedClients, httplib::Server *serverptr,
              const char *path) {
  serverptr->Get(
    path, [&](const httplib::Request &req, httplib::Response &res) {
      res.set_header("Access-Control-Allow-Origin", allowedClients);

      std::string path = req.get_param_value("path");

      std::ifstream file(path, std::ios::binary);
      if (file) {
        std::ostringstream ss;
        ss << file.rdbuf();
        std::string image_data = ss.str();

        res.set_content(image_data, "video/*");
      } else {
        res.status = 404;
        res.set_content("Video not found", "text/plain");
      }

      // res.set_content("Hello World!", "text/plain");
    });
}
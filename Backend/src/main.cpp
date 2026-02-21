#include "../lib/httplib.h"
#include "routes/hello.hpp"
#include "routes/stop.hpp"

#include <iostream>

// config for server
const std::string PATH = "localhost";
const int         PORT = 8080;

const std::string CLIENT_URL = "http://localhost:5173"; // for CORS whitelist

int main() {
  std::cout << "Starting Main";

  httplib::Server svr;

  // routes
  hello(CLIENT_URL, &svr, "/hi");
  stop(CLIENT_URL, &svr, "/stopserver");

  // preflight check for cross-origin
  svr.Options("/(.*)",
              [&](const httplib::Request &req, httplib::Response &res) {
                res.set_header("Access-Control-Allow-Methods", CLIENT_URL);
                res.set_header("Access-Control-Allow-Headers", CLIENT_URL);
                res.set_header("Access-Control-Allow-Origin", CLIENT_URL);
                res.set_header("Connection", "close");
              });

  // start server
  svr.listen(PATH, PORT);

  std::cout << "Exiting Main";
  return 0;
}
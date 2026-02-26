#include "../../lib/httplib.h"

void stop(const std::string allowedClients, httplib::Server *serverptr, const char *path) {
  serverptr->Get(path, [&](const httplib::Request &req, httplib::Response &res) {
    res.set_header("Access-Control-Allow-Origin", allowedClients);
    res.set_content("Terminating Server", "text/plain");
    serverptr->stop();
  });
}
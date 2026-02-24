#include "../../lib/httplib.h"

#include <filesystem>
#include <iostream>
namespace fs = std::filesystem;

void listFiles(const std::string allowedClients, httplib::Server *serverptr,
               const char *path) {
  serverptr->Get(
    path, [&](const httplib::Request &req, httplib::Response &res) {
      res.set_header("Access-Control-Allow-Origin", allowedClients);

      std::string path     = req.get_param_value("path");
      std::string filesCsv = "";

      // print all files from the current directory

      if (fs::is_directory(path)) {
        for (const auto &entry : fs::directory_iterator(path)) {
          std::cout << entry.path() << '\n';
          filesCsv += entry.path();
          filesCsv += ",";
        }
      }

      res.set_content(filesCsv, "text/plain");
    });
}
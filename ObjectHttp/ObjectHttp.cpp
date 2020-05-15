#include <iostream>
#include <windows.h>
#include <string>
#include <fstream>
#include <sstream>
#include <streambuf>
#include "HTTPServer.h"

using namespace std;

int main(int argc, char* argv[])
{
	HTTPServer http;
	http.argc = argc;
	for (size_t i = 0; i < argc; i++)
		http.argv[i] = argv[i];
	http.start();
}	 
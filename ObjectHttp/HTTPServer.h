#pragma once
#include <iostream>
#include <windows.h>
#include <string>
#include <fstream>
#include <sstream>
#include <streambuf>	
using namespace std;
class HTTPServer
{
public:
	int argc;
	char* argv[80];
	WORD wVersionRequested = MAKEWORD(1, 1);
	WSADATA data;
	string text;
	sockaddr_in sockName;
	sockaddr_in clientInfo;
	SOCKET mainSocket;
	int port;
	char buf[1000];
	int size;
	int addrlen;
	int count = 0;
	HTTPServer();
	//~HTTPServer();
	void start();
};


#include "HTTPServer.h"
#include <iostream>
#include <windows.h>
#include <string>
#include <fstream>
#include <sstream>
#include <streambuf>
#include <map>
#define BUFSIZE 1000
using namespace std;
typedef int (*function)(SOCKET client, int size);
int hello(SOCKET client, int size)
{
	if ((size = send(client, "hello", 5, 0)) == SOCKET_ERROR)
	{
		cerr << "Probl�m s odesl�n�m dat" << endl;
		WSACleanup();
		return -1;
	}
	cout << "Odesl�no: " << size << endl;
	closesocket(client);
}
int shut(SOCKET client, int size)
{
	if ((size = send(client, "drz hubu", 8, 0)) == SOCKET_ERROR)
	{
		cerr << "Probl�m s odesl�n�m dat" << endl;
		WSACleanup();
		return -1;
	}
	cout << "Odesl�no: " << size << endl;
	closesocket(client);
}
HTTPServer::HTTPServer() {
	
};
void HTTPServer::start() {
	map<string, function> mapa;
	mapa["hello"] = hello;
	mapa["shut"] = shut;
	if (argc != 2)
	{
		cerr << "Syntaxe:\n\t" << argv[0]
			<< " " << "port" << endl;
	}
	if (WSAStartup(wVersionRequested, &data) != 0)
	{
		cout << "Nepoda�ilo se inicializovat sokety" << endl;
	}
	port = atoi(argv[1]);
	if ((mainSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP))
		== INVALID_SOCKET)
	{
		cerr << "Nelze vytvo�it soket" << endl;
		WSACleanup();
	}
	sockName.sin_family = AF_INET;
	sockName.sin_port = htons(port);
	sockName.sin_addr.s_addr = INADDR_ANY;
	if (bind(mainSocket, (sockaddr*)&sockName, sizeof(sockName))
		== SOCKET_ERROR)
	{
		cerr << "Probl�m s pojmenov�n�m soketu." << endl;
		WSACleanup();
	}
	if (listen(mainSocket, 10) == SOCKET_ERROR)
	{
		cerr << "Probl�m s vytvo�en�m fronty" << endl;
		WSACleanup();
	}
	cout << "Naslouch�m" << endl;
	do
	{
		addrlen = sizeof(clientInfo);
		SOCKET client = accept(mainSocket, (sockaddr*)&clientInfo,
			&addrlen);
		int totalSize = 0;
		if (client == INVALID_SOCKET)
		{
			cerr << "Probl�m s p�ijet�m spojeni" << endl;
			WSACleanup();
		}
		cout << "N�kdo se p�ipojil z adresy: "
			<< inet_ntoa((in_addr)clientInfo.sin_addr) << endl;
		text = "";
		if ((size = recv(client, buf, BUFSIZE - 1, 0))
			== SOCKET_ERROR)
		{
			cerr << "Probl�m s p�ijet�m dat." << endl;
			WSACleanup();
		}
		buf[size] = 0;
		cout << buf << flush;
		cout << "P�ijato: " << size << endl;
		totalSize += size;
		text += buf;
		cout << text;
		string fileName = "";
		int tmp = 0;
		for (size_t i = 0; i < text.length(); i++)
		{
			if (text[i] == ' ')
			{
				tmp++;
				if (tmp == 2)
				{
					break;
				}
			}
			else if (tmp == 1 && text[i] != '/')
			{
				fileName += text[i];
			}
		}
		ifstream f(fileName);
		if (!f.fail())
		{
			string str;
			if (f) {
				ostringstream ss;
				ss << f.rdbuf();
				str = ss.str();
			}
			char* post = new char[str.size() + 1];
			str.copy(post, str.size() + 1);
			if ((size = send(client, post, str.size(), 0)) == SOCKET_ERROR)
			{
				cerr << "Probl�m s odesl�n�m dat" << endl;
				WSACleanup();
			}
			cout << "Odesl�no: " << size << endl;
			closesocket(client);
		}
		else
		{
			int check = 0;
			map<string, function>::iterator it = mapa.begin();
			map<string, function>::key_compare mycomp = mapa.key_comp();
			string highest = mapa.rbegin()->first;
			do {
				if (it->first ==fileName)
				{
					check++;
					it->second(client, size);
					break;
				}
			} while (mycomp((*it++).first, highest));
			if (check ==0)
			{
				if ((size = send(client, "<html><head><title>404 Not Found</title></head><body><center><h1>404 Not Found</h1></center><hr><center>Peteri</center></body></html>", 134, 0)) == SOCKET_ERROR)
				{
					cerr << "Probl�m s odesl�n�m dat" << endl;
					WSACleanup();
				}
				cout << "Odesl�no: " << size << endl;
				closesocket(client);
			}
		}
	} while (true);
}


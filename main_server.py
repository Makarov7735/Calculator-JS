from server import Server

host = '127.0.0.1'
port = 9999


server = Server(host, port)


if __name__ == '__main__':
    server.to_monitor.append(server.server)
    server.event_loop()

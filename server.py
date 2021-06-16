import socket
from select import select

class Server():

    def __init__(self, host, port):
        self.to_monitor = []
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((host, port))
        self.server.listen(5)
        self.users = []

        print('working...')


    def send_message(self, client):
        data = client.recv(1024)
        data.decode('utf-8')

        print(f'# --> {data}')

        if data:
            client.send(data)
        else:
            client.close()


    def start_server(self):
        client, addr = self.server.accept()
        self.users.append(client)

        print(f'# [{addr[0]}:{addr[1]}] (info) --> join server')

        self.to_monitor.append(client)


    def event_loop(self):
        while True:
            ready_to_read, _, _ = select(self.to_monitor, [], [])

            for i in ready_to_read:
                if i is self.server:
                    self.start_server()
                else:
                    self.send_message(i)

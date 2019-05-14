import grpc
import service_pb2
import service_pb2_grpc


def signup(username, password):
    pass


def login(username, password):
    pass


def run_test():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = service_pb2_grpc.AccountServiceStub(channel)


if __name__ == '__main__':
    run_test()

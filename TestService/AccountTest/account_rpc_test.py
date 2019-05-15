import grpc
import service_pb2
import service_pb2_grpc
import uuid


def signup(stub, username, password):
    signup_message = service_pb2.SignupMessage(username=username, password=password)
    signup_result = stub.SignupNewUser(signup_message)
    return signup_result


def login(stub, username, password):
    login_message = service_pb2.LoginMessage(username=username, password=password)
    login_result = stub.LoginUser(login_message)
    return login_result


def run_test():
    with grpc.insecure_channel('account:50051') as channel:
        stub = service_pb2_grpc.AccountServiceStub(channel)
        username = str(uuid.uuid4())
        password = str(uuid.uuid4())
        signup_response = signup(stub, username, password)
        print signup_response.message
        signup_fail_response = signup(stub, username, str(uuid.uuid4()))
        print signup_fail_response.message
        login_response = login(stub, username, password)
        print login_response.message
        ogin_fail_response = login(stub, username, str(uuid.uuid4()))
        print ogin_fail_response.message


if __name__ == '__main__':
    run_test()

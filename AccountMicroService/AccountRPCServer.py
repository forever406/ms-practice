import service_pb2
import service_pb2_grpc
import AccountDB
import grpc
from concurrent import futures


class AccountServiceReceiver(service_pb2_grpc.AccountServiceServicer):
    def SignupNewUser(self, request, context):
        status = AccountDB.signup_user(request.username, request.password)
        if status == 0:
            msg = "succeed"
        elif status == 1:
            msg = "username existed"
        elif status == 2:
            msg = "password not strong"
        else:
            msg = "unknown error"
        return service_pb2.SignupResponse(status=status, message=msg)

    def LoginUser(self, request, context):
        status = AccountDB.login_user(request.username, request.password)
        if status == 0:
            msg = "login succeed"
        else:
            msg = "login fail"
        return service_pb2.LoginResponse(status=status, message=msg)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_AccountServiceServicer_to_server(AccountServiceReceiver(), server)
    server.add_insecure_port('[::]:50051')
    server.start()


if __name__ == '__main__':
    serve()

import service_pb2
import service_pb2_grpc
import AccountDB
import grpc
from concurrent import futures


class AccountServiceReceiver(service_pb2_grpc.AccountServiceServicer):
    def SignupNewUser(self, request, context):
        if len(request.password) < 6:
            msg = "password not strong"
            return service_pb2.SignupResponse(status=-2, message=msg, userid="")
        else:
            user = AccountDB.signup_user(request.username, request.password)
            if user is not None:
                msg = "succeed"
                return service_pb2.SignupResponse(status=0, message=msg, userid=str(user.userid))
            else:
                msg = "username existed"
                return service_pb2.SignupResponse(status=-1, message=msg, userid="")

    def LoginUser(self, request, context):
        userid = AccountDB.login_user(request.username, request.password)
        if userid is not None:
            msg = "login succeed"
            return service_pb2.LoginResponse(status=0, message=msg, userid=str(userid))
        else:
            msg = "login fail"
            return service_pb2.LoginResponse(status=-1, message=msg, userid=str(userid))


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_AccountServiceServicer_to_server(AccountServiceReceiver(), server)
    server.add_insecure_port('[::]:50051')
    server.start()


if __name__ == '__main__':
    serve()

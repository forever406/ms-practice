from peewee import *
import uuid

# db = PostgresqlDatabase('user_test_table', user='postgres', host='172.27.0.2')
db = PostgresqlDatabase('user_test_table', user='postgres', host='db')


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    username = CharField()
    password = CharField()
    userid = UUIDField()


def get_user(username):
    users = User.select().where(User.username == username)
    if len(users) > 0:
        return users[0]
    else:
        return None


def signup_user(username, password):
    user = get_user(username)
    if user is None:
        userid = uuid.uuid4()
        user = User.create(username=username, password=password, userid=userid)
        return user
    else:
        return None


def login_user(username, password):
    users = User.select().where((User.username == username) & (User.password == password))
    if len(users) > 0:
        return users[0].userid
    else:
        return None


db.connect()
db.create_tables([User])

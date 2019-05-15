from peewee import *

db = PostgresqlDatabase('user_test_table', user='postgres', host='db')


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    username = CharField()
    password = CharField()
    userid = UUIDField()


def get_user(username):
    users = User.select().where(username=username)
    if len(users) > 0:
        return users[0]
    else:
        return None


def signup_user(username, password):
    user = get_user(username)
    if user is None:
        user = User.create(username=username, password=password)
        return user
    else:
        return None


def login_user(username, password):
    users = User.select().where(username=username, password=password)
    if len(users) > 0:
        return users[0].userid
    else:
        return None


db.connect()
db.create_tables([User])

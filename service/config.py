import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///barbershop.db'  # Ou a URI do seu banco de dados
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)

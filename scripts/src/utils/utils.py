import os
from firebase_admin import credentials
import firebase_admin
from firebase_admin import firestore

ROOT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")


def get_db():
    """get firestore db instance"""

    if not firebase_admin._apps:
        cred = credentials.Certificate(os.path.join(ROOT_DIR, "..", "firebase-privatekey.json"))
        firebase_admin.initialize_app(cred)

    db = firestore.client()
    return db

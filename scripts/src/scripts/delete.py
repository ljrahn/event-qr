from firebase_admin import firestore
import os
import click
import qrcode
from utils.utils import ROOT_DIR, get_db

db = get_db()


@click.command()
@click.option('--all/--not-all', default=False, help=' specifies if you want all the document deleted. diabled by default')
@click.option('--document-id', '-i', default="", help='specifies a particular document to be delete. NOTE: "--all" overrides this.')
def delete_document_firebase(all, document_id):
    """deletes firebase entry with document id specified, or all documents in the database. note all=True supercedes a specific document id"""

    if all:
        all_qr_codes = db.collection(u'user').stream()

        # transform ids into firestore document with id as the uuid fetched from firebase
        document_refs = [db.collection(u'user').document(users.id) for users in all_qr_codes]

        # create a batch of all document initilizations
        batches = []

        counter = -1
        # create a batch of all document initilizations
        for idx, document_ref in enumerate(document_refs):
            if (idx % 400 == 0):
                batches.append(db.batch())
                counter += 1

            batches[counter].delete(document_ref)

        # commit and push batch to firebase
        for batch in batches:
            batch.commit()

        click.echo("All documents delete from user collection")

    elif document_id:
        db.collection(u'user').document(document_id).delete()

        click.echo(f"Document ID: {document_id}, successfully deleted")

    else:
        click.echo("ERROR: option --all or --document_id not provided. atleast one must be provided")

import os
import click
import qrcode
import uuid
from utils.utils import ROOT_DIR, get_db

db = get_db()


@click.command()
@click.option('--count', '-c', default=1, help='number of qr codes to create')
def create_qr_code(count):
    """create qr codes with random uuid. saves the qr code as a file named {random_uuid}.jpg inside generated_qr"""

    for i in range(count):
        # create qr code object
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=2,
        )

        # generate random uuid
        random_uuid = uuid.uuid4().hex

        # set data for qr code as the random uuid and make the image
        qr.add_data(random_uuid)
        img = qr.make_image(fill_color="black", back_color="white")

        # save the qr code into "generated_qr" directory with the name of the file as the random uuid
        os.system(f"mkdir -p {os.path.join(ROOT_DIR, '..', 'generated_qr')}")
        img.save(os.path.join(ROOT_DIR, "..", "generated_qr", f"{random_uuid}.jpg"))

        click.echo(f"Image Saved with uuid: {random_uuid}")


@click.command()
def push_qr_code_firebase():
    """creates firebase entry with document id specified by each qr codes file name. """
    # fetch qr code names (uuids) from files stored in "generated_qr"
    qr_document_ids = [f.split(".")[0] for f in os.listdir(os.path.join(ROOT_DIR, "..", "generated_qr"))
                       if os.path.isfile(os.path.join(ROOT_DIR, "..", "generated_qr", f))]

    existing_qr_codes = [document.id for document in db.collection('user').stream()]

    # transform ids into firestore document with id as the uuid fetched from files
    document_refs = [db.collection('user').document(qr_document_id)
                     for qr_document_id in qr_document_ids if qr_document_id not in existing_qr_codes]

    # define all meals initilized as false
    user_meals = {"dinnerFri": False, "midnightFri": False, "breakfastSat": False,
                  "lunchSat": False, "dinnerSat": False, "midnightSat": False, "breakfastSun": False, "lunchSun": False, "name": '', "workshopRaffle": 0}

    batches = []

    counter = -1
    # create a batch of all document initilizations
    for idx, document_ref in enumerate(document_refs):
        if (idx % 400 == 0):
            batches.append(db.batch())
            counter += 1

        batches[counter].create(document_ref, user_meals)

    # commit and push batch to firebase
    for batch in batches:
        batch.commit()

    click.echo("successfully pushed all qr codes")

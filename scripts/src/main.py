from scripts.delete import delete_document_firebase
from scripts.create import create_qr_code, push_qr_code_firebase
import click


@click.group()
def cli():
    pass


cli.add_command(create_qr_code)
cli.add_command(push_qr_code_firebase)
cli.add_command(delete_document_firebase)


if __name__ == '__main__':
    cli()

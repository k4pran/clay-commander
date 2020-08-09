import tarfile
import urllib
import db
import deductive_service

table_types = {"CSV"}
image_types = {"PNG", "JPG", "JPEG", "SVG"}
text_types = {"JSON"}
zip_types = {"GZIP", "TGZ"}


def persist(content, content_type, name):
    if not content_type:
        content_type = deductive_service.interpret_url_content_type(content)
    if content_type in table_types:
        return import_table(content, name)

    elif content_type in image_types:
        return import_image(content, name)

    elif content_type in text_types:
        return import_text(content, name)

    elif content_type in zip_types:
        ftpstream = urllib.request.urlopen(name)
        tar_file = tarfile.open(fileobj=ftpstream, mode="r:gz")
        return from_tar(tar_file)


def import_table(content, name):
    return db.import_csv(content, name)


def import_image(location, name):
    return db.import_image(location, name)


def import_text(content, name):
    return db.import_text(content, name)


def from_tar(tar_file: tarfile.TarFile):
    file_names = ""
    for member in tar_file:
        if member.isreg():
            print("{} - {} bytes".format(member.name, member.size))
            file_names += " " + member.name
            persist(tar_file.extractfile(member).read(), None, member.name)

    return {"name": file_names}
images = []


def get_current_gallery():
    if not images:
        return get_gallery_sample()
    else:
        return images


def add(url, name="", description=""):
    images.append({
        'original': url,
        'thumbnail': url,
        'originalTitle': name,
        'thumbnailTitle': name,
        'description': description
    })


def remove_by_url(url):
    global images
    updated_arr = []
    for image in images:
        if not image['original'] == url:
            updated_arr.append(image)
    images = []


def clear_images():
    global images
    images = []


def get_gallery_sample():
    return [
                {
                    'original': 'https://picsum.photos/id/1015/1000/600/',
                    'thumbnail': 'https://picsum.photos/id/1015/250/150/',
                    'originalTitle': 'sample1',
                    'thumbnailTitle': 'sample1',
                    'description': 'this is a sample image'
                },
                {
                    'original': 'https://picsum.photos/id/1019/1000/600/',
                    'thumbnail': 'https://picsum.photos/id/1019/250/150/',
                    'originalTitle': 'sample1',
                    'thumbnailTitle': 'sample1',
                    'description': 'this is a sample image'
                }
            ]

import asyncio
import threading

import event_publisher

images = []


def get_current_gallery():
    if not images:
        return get_gallery_sample()
    else:
        return images


def add_to_gallery(url, name="", description=""):
    images.append({
        'original': url,
        'thumbnail': url,
        'originalTitle': name,
        'thumbnailTitle': name,
        'description': description
    })
    on_gallery_updated()


def remove_from_gallery_by_url(url):
    global images
    updated_arr = []
    for image in images:
        if not image['original'] == url:
            updated_arr.append(image)
    images = updated_arr
    on_gallery_updated()


def clear_gallery():
    global images
    images = []
    on_gallery_updated()


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


def on_gallery_updated():
    gallery = get_current_gallery()
    gallery_thread = threading.Thread(target=event_publisher.send, args=(gallery,))
    gallery_thread.start()

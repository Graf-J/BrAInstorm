import requests
from bs4 import BeautifulSoup
import numpy as np
from PIL import Image
from io import BytesIO
from sklearn.cluster import KMeans
import numpy as np


class WordColorAI:
    @staticmethod
    def get_color(word: str) -> str:
        # Download Images
        raw_images = WordColorAI.__download_images(word)

        # Edit Images to a uniform format
        resized_images = WordColorAI.__resize_images(raw_images)
        images = WordColorAI.__crop_images(resized_images)

        # Extract Pixels
        pixels = WordColorAI.__extract_pixel_values(images)

        # KMeans Machine Learning Algorithm
        kmeans = KMeans(n_clusters=3, random_state=42, n_init=10).fit(pixels)
        largest_cluster_label = np.argmax(np.bincount(kmeans.labels_))
        r, g, b = kmeans.cluster_centers_[largest_cluster_label]
        hex_code = '#{:02x}{:02x}{:02x}'.format(*(int(r), int(g), int(b)))

        return hex_code
    

    def __download_images(word, num_images=5):
        # Send Request to Google Images
        google_url = f"https://www.google.com/search?q={ word }&tbm=isch"
        response = requests.get(google_url)

        # Extract Image URLs from HTTP Response
        soup = BeautifulSoup(response.content, 'html.parser')
        image_urls = []
        for img in soup.find_all('img'):
            image_urls.append(img.get('src'))
            
        # Open and Store the given amount of images
        ctr = 0
        images = []
        for url in image_urls:
            if ctr == num_images: break
            try:
                response = requests.get(url)
                image = Image.open(BytesIO(response.content))
                images.append(image.convert('RGB'))
                ctr += 1
            except:
                pass
            
        return images
    

    def __resize_images(images, size=(150, 150)):
        resized_images = []
        for image in images:
            resized_images.append(image.resize(size))
            
        return resized_images


    # Zooms into the Image
    def __crop_images(images, crop=30):
        width, height = images[0].size
        new_width, new_height = width - crop, height - crop
        border = int(crop / 2)
        crop_region = (border, border, width - border, height - border)
        cropped_images = []
        for image in images:
            cropped_images.append(image.crop(crop_region).resize((new_width, new_height)))
            
        return cropped_images
    

    def __extract_pixel_values(images, max_brightness=(50, 50, 50), max_darkness=(205, 205, 205)):
        # Extract Pixels from Images
        pixels = []
        for image in images:
            pixels.extend(image.getdata())

        # Reduce Dimension from 5 to 4
        pixel_values = np.array(pixels)
        pixel_values_2d = pixel_values.reshape(-1, 3)
        pixel_values_2d

        # Remove Bright and Dark Pixels
        clean_pixel_values_2d = []
        for pixel in pixel_values_2d:
            if (pixel[0] < max_brightness[0] and pixel[1] < max_brightness[1] and pixel[2] < max_brightness[0]): continue
            if ((pixel[0] > max_darkness[0] and pixel[1] > max_darkness[1] and pixel[2] > max_darkness[2])): continue
            clean_pixel_values_2d.append(pixel)

        return clean_pixel_values_2d

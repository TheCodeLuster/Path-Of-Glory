# Includes hand written digits (more than 21000 in total)
# less than 20 epochs - .97 accurancy

import os
import glob
import cv2
import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from sklearn.model_selection import train_test_split

rows = 5
columns = 5
size = 25

fig_r = 10
fig_c = 10 

digits = 10

path = "dataset"
images = []
labels = []

def preprocess(img_path):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img_resized = cv2.resize(img, (28, 28), interpolation=cv2.INTER_AREA)    
    return img_resized / 255.0

for i in range(digits):
    dataset = os.path.join(path, str(i))
    f_list = glob.glob(os.path.join(dataset, "*.jpg"))
    print(f"Обробка цифри {i}: знайдено {len(f_list)} зображень")
    for j in f_list:
        pre_img = preprocess(j)
        images.append(pre_img)
        labels.append(i)

images = np.array(images)
labels = np.array(labels)
print(f"\nЗагальна кількість зображень: {images.shape[0]}")

# Додаємо вимір каналу для CNN (формат: (висота, ширина, кількість каналів))
images = images[..., np.newaxis]

x_train, x_test, y_train, y_test = train_test_split(images, labels, test_size=0.2, random_state=42)

plt.figure(figsize=(fig_r, fig_c))
for i in range(size):
    plt.subplot(rows, columns, i + 1)
    plt.xticks([])
    plt.yticks([])
    plt.imshow(x_test[i].squeeze(), cmap='gray')
    plt.title(f"{y_test[i]}")
plt.show(block=False)

# https://www.tensorflow.org/tutorials/images/cnn (CNN)
model = keras.models.Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])

model.compile(optimizer=keras.optimizers.Adam(learning_rate=0.001),
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=17, validation_data=(x_test, y_test))

test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print(f'\nТочність: {test_acc}')

predictions = model.predict(x_test)
pred_labels = predictions.argmax(axis=1)

plt.figure(figsize=(fig_r, fig_c))
for i in range(size):
    plt.subplot(rows, columns, i + 1)
    plt.xticks([])
    plt.yticks([])
    plt.imshow(x_test[i].squeeze(), cmap='gray')
    if pred_labels[i] == y_test[i]:
        color = 'green'
    else: 
        color = 'red'
    plt.title(f"Pred: {pred_labels[i]}", color=color)
plt.tight_layout()
plt.show()

# letters recognizer

import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from torchvision import datasets
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

rows = 5
columns = 5
size = 25

fig_r = 10
fig_c = 10

letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

emnist_data = datasets.EMNIST(root='./data', split='letters', train=True, download=True)
x_train, y_train = emnist_data.data.numpy(), emnist_data.targets.numpy()

emnist_test = datasets.EMNIST(root='./data', split='letters', train=False, download=True)
x_test, y_test = emnist_test.data.numpy(), emnist_test.targets.numpy()


x_train = x_train / 255.0
x_test = x_test / 255.0

x_train = x_train[..., np.newaxis]
x_test = x_test[..., np.newaxis]

x_train, x_val, y_train, y_val = train_test_split(x_train, y_train, test_size=0.2, random_state=42)

y_train = y_train - 1
y_val = y_val - 1
y_test = y_test - 1

# https://www.tensorflow.org/tutorials/images/cnn (CNN)
model = keras.Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(26, activation='softmax') 
])

model.compile(optimizer=keras.optimizers.Adam(learning_rate=0.001),
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=10, validation_data=(x_val, y_val))

loss, accuracy = model.evaluate(x_test, y_test)
print(f'Точність: {accuracy * 100:.2f}%')

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
    plt.title(f"Pred: {letters[pred_labels[i]]}", color=color)
plt.tight_layout()
plt.show()

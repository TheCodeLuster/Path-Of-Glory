## My first ever NN (not really :) )
# .97 accurancy

from tensorflow.keras.datasets import mnist
from tensorflow import keras
from tensorflow.keras.layers import Dense, Flatten
import matplotlib.pyplot as plt
import numpy as np

(x_train, y_train), (x_test, y_test) = mnist.load_data()

rows = 5
columns = 5
size = 25

fig_rows = 10
fig_col = 10

images = x_test[:size]
labels = y_test[:size]

plt.figure(figsize=(fig_rows, fig_col))
for i in range(size):
    plt.subplot(rows, columns, i + 1)
    plt.xticks([])
    plt.yticks([])
    plt.grid(False)
    plt.imshow(images[i], cmap=plt.cm.binary)
    plt.title(f"{labels[i]}")
plt.show(block=False)

x_train = x_train / 255.0
x_test = x_test / 255.0

model = keras.models.Sequential([
    Flatten(input_shape=(28, 28)), Dense(128, activation='relu'), Dense(10, activation='softmax')
])

model.compile(optimizer=keras.optimizers.Adam(learning_rate=0.0001),
              loss='sparse_categorical_crossentropy', metrics=['accuracy'])

history = model.fit(x_train, y_train, epochs=5, validation_data=(x_test, y_test))

test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print(f'\nTest accuracy: {test_acc}')

act_pred = model.predict(images)
pred_labels = act_pred.argmax(axis=1)

print(f"\n{pred_labels}")

plt.figure(figsize=(fig_rows, fig_col))
for i in range(size):
    plt.subplot(rows, columns, i + 1)
    plt.xticks([])
    plt.yticks([])
    plt.grid(False)
    plt.imshow(images[i], cmap=plt.cm.binary)
    act_pred = pred_labels[i]
    real_labels = labels[i]
    if act_pred == real_labels:
        color = 'green'
    else:
        color = 'red'
    plt.title(f"Pred: {act_pred}", color=color)

plt.tight_layout()
plt.show()

#!/usr/bin/python

import numpy as np
import matplotlib.pyplot as plt
import matplotlib
from matplotlib.collections import PatchCollection
import matplotlib.path as mpath
import matplotlib.patches as mpatches
import matplotlib.lines as mlines

font = "sans-serif"
fig = plt.figure(figsize=(5,5))
ax = plt.axes([0,0,1,1])

# create 3x3 grid to plot the artists
pos = np.mgrid[0.2:0.8:3j, 0.2:0.8:3j].reshape(2, -1)

patches = []

# add a circle
art = mpatches.Circle(pos[:,0], 0.1,ec="none")
patches.append(art)
plt.text(pos[0,0], pos[1,0]-0.15, "Circle", ha="center",
        family=font, size=14)

# add a rectangle
art = mpatches.Rectangle(pos[:,1] - np.array([0.025, 0.05]), 0.05, 0.1,
        ec="none")
patches.append(art)
plt.text(pos[0,1], pos[1,1]-0.15, "Rectangle", ha="center",
        family=font, size=14)




colors = 100*np.random.rand(len(patches))
collection = PatchCollection(patches, cmap=matplotlib.cm.jet, alpha=0.4)
collection.set_array(np.array(colors))
ax.add_collection(collection)

plt.show()


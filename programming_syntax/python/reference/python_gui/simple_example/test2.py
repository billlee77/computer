#!/usr/bin/python

# colors.py

import sys, random
from PyQt4 import QtGui, QtCore


class Colors(QtGui.QWidget):
    def __init__(self, parent=None):
        QtGui.QWidget.__init__(self, parent)

        self.setGeometry(300, 300, 350, 280)
        self.setWindowTitle('Colors')

    def paintEvent(self, event):
        paint = QtGui.QPainter()
        paint.begin(self)

        color = QtGui.QColor(0, 0, 0)
        color.setNamedColor('#d4d4d4')
        paint.setPen(color)

        paint.setBrush(QtGui.QColor(255, 0, 0, 80))
        paint.drawRect(10, 15, 90, 60)

        paint.setBrush(QtGui.QColor(255, 0, 0, 160))
        paint.drawRect(130, 15, 90, 60)

        paint.setBrush(QtGui.QColor(255, 0, 0, 255))
        paint.drawRect(250, 15, 90, 60)

        paint.setBrush(QtGui.QColor(10, 163, 2, 55))
        paint.drawRect(10, 105, 90, 60)

        paint.setBrush(QtGui.QColor(160, 100, 0, 255))
        paint.drawRect(130, 105, 90, 60)

        paint.setBrush(QtGui.QColor(60, 100, 60, 255))
        paint.drawRect(250, 105, 90, 60)

        paint.setBrush(QtGui.QColor(50, 50, 50, 255))
        paint.drawRect(10, 195, 90, 60)

        paint.setBrush(QtGui.QColor(50, 150, 50, 255))
        paint.drawRect(130, 195, 90, 60)

        paint.setBrush(QtGui.QColor(223, 135, 19, 255))
        paint.drawRect(250, 195, 90, 60)

        paint.end()

app = QtGui.QApplication(sys.argv)
dt = Colors()
dt.show()
app.exec_()


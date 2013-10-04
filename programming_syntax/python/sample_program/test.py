# A function that calculates the mean and variance of a sequence of numbers

def stats(data):

    sum = 0.0
    for value in data:
        sum += value
    mean = sum/len(data)

    sum = 0.0
    for value in data:
        sum += (value - mean)**2
    variance = sum/(len(data) - 1)

    return (mean, variance)

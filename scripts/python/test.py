print("Hello, World!")
from os import listdir
from os.path import isfile, join
mypath = "images/gallery/roaches"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
print (onlyfiles)

name_c = ['Don', 'Perez']
with open("out.txt", "w+") as f:
    f.write("data = {{\"name\": {}, \"lastname\": {}}}".format(*name_c))
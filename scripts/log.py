import os
import sys
from datetime import datetime


heure_actuelle = datetime.now()
heure_actuelle = heure_actuelle.strftime("%d/%m %H:%M")


all_types = {
    "error": "\033[31m",
    "info": "\033[32m",
    "warning": "\033[33m",
}

def log(message, type="info", log_file="area.log"):
    # check if the type is correct
    if type not in all_types:
        type = "info"
    # check if the log file exist
    if not os.path.isfile(log_file):
        # print in the terminal
        print(heure_actuelle + ": " + all_types[type] + type + ": " + message + "\033[0m")
        return
    # write the log with puting ths_link_are date and time before and change the color of the type
    with open(log_file, "a") as f:
        f.write(heure_actuelle + ": " + all_types[type] + type + ": " + message + "\033[0m")

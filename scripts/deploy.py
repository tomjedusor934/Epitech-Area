import os
import sys
from dotenv import load_dotenv

load_dotenv()

def replace_str_by_another(file_path, old_str, new_str):
    with open(file_path, "r") as f:
        content = f.read()
    content = content.replace(old_str, new_str)
    with open(file_path, "w") as f:
        f.write(content)

def str_ends_with(string, suffix):
    return string.endswith(suffix)

if __name__ == "__main__":
    domain_for_back = input("Enter domain for backend: ")
    domain_for_front = input("Enter domain for frontend: ")

    # Check if path end wit /scripts or /Area like that we can automaticly redirect to the good folder for front && back
    if str_ends_with(os.getcwd(), "/scripts"):
        os.chdir("../")
    elif str_ends_with(os.getcwd(), "/Area"):
        os.chdir("./")
    else:
        print("Error: You must be in the folder Area or scripts")
        sys.exit(1)

    if domain_for_back == "" or domain_for_front == "":
        print("Error: You must enter a domain")
        # sys.exit(1)

    # Replace domain for backend
    replace_str_by_another("api/docker-compose/yml", "DOMAIN", domain_for_back)

    # Replace domain for frontend
    replace_str_by_another("front_end/docker-compose.yml", "DOMAIN", domain_for_front)
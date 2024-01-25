import os
import sys
import mysql.connector
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import requests
import json
from transformation import TransfoArea
from log import log
from sql_request import sqlRequest
from formater import formater
import re

load_dotenv()

timer = {
    "0": "every minute",
    "1": "every 5 minutes",
    "2": "every 10 minutes",
    "3": "every 15 minutes",
    "4": "every 30 minutes",
    "5": "every hour",
    "6": "every 2 hours",
    "7": "every 3 hours",
    "8": "every 4 hours",
    "9": "every 6 hours",
    "10": "every 12 hours",
    "11": "every 24 hours",
}
# Connect to database
mydb = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DBUSER"),
    password=os.getenv("DBPASSWD"),
    database=os.getenv("DATABASE")
)

pointer_tab_transformation = {}
current_user_id = None
current_area_block_id = None
HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"]

user_input = {}


"""     Fill the pointer_tab_transformation with the transformation function
        (create a dynamic pointer tab)
    """
def fill_pointer_tab(pointer_tab_transformation, TransfoArea):
    for f in open("transformation.py"):
        for line in f.split("\n"):
            if "def" in line:
                name = line.split("def")[1].split("(")[0].strip()
                pointer_tab_transformation[name] = TransfoArea.__getattribute__(name)
    return

    """ Replace the variable by the value
        it used when you find $ before a word in the body, headers or url
    """
def replace_variable(variable, prev_response=None):
    #? we need to check if the variable exist
    if "token" in variable:
        return get_token(variable)
    elif variable == "user_id":
        return get_user_id()
    elif variable == "return_value":
        return prev_response
    elif "input" in variable:
        return get_custom_value(variable)
    elif variable == "today":
        return datetime.now().strftime("%Y-%m-%d")
    elif variable == "yesterday":
        return (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
    else:
        log("Variable " + variable + " doesn't exist", "error", "atot")
        return False

    """ Get the token of the user
        need to parse the token_infos to get wich token we need (facebook, twitter, ...)
        then we need to get the token in the database with the user_id
    """
def get_token(token_type):
    global current_user_id
    res = form.format_token_infos(query.selectQuery("*", "token_infos", "user_id = '" + str(current_user_id) + "'"))
    current_token = None

    for token in res:
        if token["infos_for"] in token_type:
            current_token = token
            break
    #? we need to check if the token is still valid
    token_expiration = current_token["expires_in"]
    if token_expiration or token_expiration != "":
        token_expiration = re.split(r'[- :.]', token_expiration)
        token_expiration = datetime(
            int(token_expiration[0]),
            int(token_expiration[1]),
            int(token_expiration[2]),
            int(token_expiration[3]),
            int(token_expiration[4]),
            int(token_expiration[5]),
            tzinfo=timezone.utc,
        )

        if token_expiration < (datetime.now(timezone.utc) + timedelta(hours=1)):
            # make a request to get a new token
            header = {
                "user_id": current_user_id,
            }
            url = "https://api.area.tal-web.com/reconnect_" + current_token["infos_for"]
            requests.get(url, headers=header)
            return get_token(token_type)
        else:
            return current_token["token"]
    log("Token " + token_type + " expired or doesen't exist", "error", "atot")
    return current_token["token"]

    """ Get the user id
        it can be found in current_user_id variable
    """
def get_user_id():
    global current_user_id
    return str(current_user_id)

    """ Get the value of the input
        it's locate in user_input tab
    """
def get_custom_value(input):
    global user_input
    if input in user_input:
        return user_input[input]
    return False

    """ Prepare the body, headers
        it's used when you have a body or headers in the action or reaction
        the goal is to replace the variable by the value when you have a $ before the variable
        at the end we need to convert the body to json because pyython request needs a json format
    """
def prepare_body(body, prev_response):
    if not body:
        return body
    param_list = []

    for word in re.split(r'[/?=,& "\']', body):
        if "$" in word:
            param_list.append(word.strip("$"))

    for param in param_list:
        variable = replace_variable(param, prev_response)
        body = body.replace("$" + param, variable)
    body = body.replace("'", '"')
    body = json.loads(body)
    return body

    """ Same as prepare_body but for headers
    """
def prepare_headers(headers, prev_response):
    if not headers:
        return headers
    headers = prepare_body(headers, prev_response)
    return headers

    """ Prepare the url
        we need to split the url by /, ?, = to get the parameters
        then we need to replace the variable by the value
    """
def prepare_url(url, prev_response):
    if not url:
        return url
    param_list = []

    for word in re.split(r'[/?=,&]', url):
        if "$" in word:
            param_list.append(word.strip("$"))

    for param in param_list:
        variable = replace_variable(param, prev_response)
        url = url.replace("$" + param, variable)
    return url

def handle_false_response(area):
    #todo: entrer dans la base de donnée que l'area a echoué avec des infos x pour pouvoir les recuper dans le front
    return False

def treat_response(response):
        if response.status_code == 200:
            return response.text
        elif response.status_code == 401:
            return False
        elif response.status_code == 404:
            return False
        elif response.status_code == 500:
            return False

def execute_action(action, prev_response):
    #? we need to check if the data is correct
    if action["method"] not in HTTP_METHODS:
        log("Method not correct", "error", "atot")
        return False

    if not action["url"]:
        log("Url is empty", "error", "atot")
        return False

    method = action["method"]
    url = prepare_url(action["url"], prev_response)
    headers = prepare_headers(action["headers"], prev_response)
    body = prepare_body(action["body"], prev_response)

    response = False
    try:
        if method == "GET":
            if headers:
                print("Headers: ", headers)
                response = requests.get(url, headers=headers)
            else:
                response = requests.get(url)
        elif method == "POST":
            if headers and body:
                response = requests.post(url, headers=headers, json=body)
            elif headers:
                response = requests.post(url, headers=headers)
            elif body:
                response = requests.post(url, json=body)
            else:
                response = requests.post(url)
        else:
            log("Method not correct", "error", "atot")
            return False
        return treat_response(response)
    except Exception as e:
        log(f"Error: {str(e)}", "error", "atot")
        return False

def execute_reaction(reaction, prev_response):
    execute_action(reaction, prev_response)
    return

def execute_transformation(transformation, prev_response):
    #? les parametres de la fonction de transformation sont dans transformation["transformation_params"] et sont de la forme: param1, param2, param3, ...
    #? on doit donc les parser pour les recuperer de plus les parametres peuvent etre des variables ou des valeurs (il y a un $ devant les variables)

    #? on commence par parser les parametres
    transformation_params = transformation["transformation_params"].split(", ")

    #? on recupere les valeurs des parametres
    for i, param in enumerate(transformation_params):
        if "$" in param:
            variable = param.strip("$")
            transformation_params[i] = replace_variable(variable, prev_response)
        if "'" in transformation_params[i]:
            transformation_params[i] = transformation_params[i].replace("'", '"')

    #? on execute la fonction de transformation
    return pointer_tab_transformation[transformation["transformation_function"]](*transformation_params)

pointer_tab = {
    "action": execute_action,
    "reaction": execute_reaction,
    "transformation": execute_transformation
}

def usage():
    """
    Displays the usage instructions for the 'area.py' script.
    """
    log("Usage: python3 area.py <periode d'execution>", "error", "atot")
    log("Periode d'execution:", "error")
    log("0: toutes les minutes", "error", "atot")
    log("1: toutes les 5 minutes", "error", "atot")
    log("2: toutes les 10 minutes", "error", "atot")
    log("3: toutes les 15 minutes", "error", "atot")
    log("4: toutes les 30 minutes", "error", "atot")
    log("5: toutes les heures", "error", "atot")
    log("6: toutes les 2 heures", "error", "atot")
    log("7: toutes les 3 heures", "error", "atot")
    log("8: toutes les 4 heures", "error", "atot")
    log("9: toutes les 6 heures (a 8h, 14h, 20h, 2h)", "error", "atot")
    log("10: toutes les 12 heures (a 8h et 20h))", "error", "atot")
    log("11: tous les jours (a 8h)", "error", "atot")

index = 0

def execute_step(area_steps, response):
    global index

    if index >= len(area_steps):
        print(index, len(area_steps))
        return False

    log("Executing area " + str(area_steps[index]["type"]), "info", "atot")
    type = area_steps[index]["type"]
    result = pointer_tab[type](area_steps[index], response)
    log("Result: " + str(result), "info", "atot")

    if result == False:
        log("While executing area " + str(area_steps[index]["step_nb"]), "error", "atot")
        return False
    index += 1
    return result

def execute_area_steps(area_steps, response):

    for _ in area_steps:
        response = execute_step(area_steps, response)
        if response == False:
            return False
    return response

def run_area(all_area_steps):
    #* we need to loop through all the steps notice that area are formated like this:
    #* area = [
    #*   "area_block_id": 1,
    #*   "link_nb": 1,
    #*   "action_id": 1,
    #*   "reaction_id": 2,
    #*   "user_id": 1,
    #*   "time_check": "every 5 minutes",
    #*   "input_params_action : "input1:param1, input2:param2, input3:param3, ...",
    #*   "input_params_reaction : "input1:param1, input2:param2, input3:param3, ...",
    #*   "is_active": 1,
    #* ]
    #* and the reaction id is the action id next step so don't need to run it exept if it's the last step
    #* first we need to get the action steps (cause every action are composed of multiple steps)

    len_area_steps = len(all_area_steps) - 1
    global index
    global user_input
    return_value = None

    for steps_link_area in all_area_steps:
        index = 0
        result = []

        try:
            #? set the custom user input to the user_input tab
            if steps_link_area["params_for_action"]:
                for input in steps_link_area["params_for_action"].split(", "):
                    user_input.update({input.split(":")[0]: input.split(":")[1]})
            result = form.format_area_steps(query.selectQuery("*", "steps_of_area", "area_id = '" + str(steps_link_area["action_id"]) + "'"))
            return_value = execute_area_steps(result, return_value)
            user_input.clear()
            if steps_link_area["link_nb"] == len_area_steps and return_value != False:
                log("executing last reaction", "info", "atot")
                index = len_area_steps - 1
                if steps_link_area["params_for_action"] and steps_link_area["params_for_reaction"] != None:
                    for input in steps_link_area["params_for_action"].split(", "):
                        user_input.update({input.split(":")[0]: input.split(":")[1]})
                response = form.format_area_steps(query.selectQuery("*", "steps_of_area", "area_id = '" + str(steps_link_area["reaction_id"]) + "'"))
                return_value = execute_area_steps(response, return_value)
                user_input.clear()
        except:
            log("Can't get action steps", "error", "atot")
            return False


if __name__ == "__main__":
    is_test = False
    area_block_id = None
    if len(sys.argv) != 2:
        if len(sys.argv) == 4 and sys.argv[3] == "--test":
            area_block_id = sys.argv[2]
            is_test = True
        else:
            usage()
            sys.exit(1)
    time = sys.argv[1]
    query = sqlRequest(mydb)
    form = formater()
    transformation = TransfoArea()
    fill_pointer_tab(pointer_tab_transformation, transformation)

    try:
        if is_test:
            result = form.format_link(query.selectQuery("*", "link", "user_id = '" + time + "' AND area_block_id = '" + area_block_id + "' AND is_active = 1"))
        else:
            result = form.format_link(query.selectQuery("*", "link", "time_check = '" + timer[time] + "' AND is_active = 1"))
        log('Get the link' + str(result), "info", "atot")
    except:
        log("Can't get the link", "error", "atot")
        sys.exit(1)

    #? create an array sorted by area_block_id
    areas = {}
    for row in result:
        is_find = False
        for key, value in areas.items():
            if row["area_block_id"] == key:
                areas[key].append(row)
                is_find = True
                break
        if not is_find:
            areas.update({row["area_block_id"]: [row]})

    #? now sort by link nb (ascending)
    for key, area in areas.items():
        area.sort(key=lambda x: x["link_nb"])

    #? now start the script
    for key, area in areas.items():
        current_user_id = area[0]["user_id"]
        run_area(area)
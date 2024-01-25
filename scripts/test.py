# my_string = "Je suis $un $développeur $web"
# my_list = []

# for word in my_string.split():
#     if "$" in word:
#         my_list.append(word.strip("$"))

# print(my_list)

# def funct(toto: str | int | None = None):
#     print(toto)

# funct("toto")
# funct(1)
# funct([1, 2, 3])
# funct()

# from transformation import *

# transfo = TransfoArea()

# poitner_tab = {
# }


# # recupere les fonctions de transformation
# for f in open("transformation.py"):
#     for line in f.split("\n"):
#         if "def" in line:
#             # print(line)
#             name = line.split("def")[1].split("(")[0].strip()
#             poitner_tab[name] = transfo.__getattribute__(name)

# # # test avec une fonction de transformation x
# # poitner_tab["x"]()

# str = "Je suis $un $développeur $web"
# suffix = "qqqqqqqqq"

# params = [suffix, str]

# params2 = [str]

# print(poitner_tab["updateReverse"](*params))


# texte = "Bonjour, le monde!"
# nouveau_texte = texte.replace("le", "Pythodfghdgjkdfhgn")

# print(nouveau_texte)

# test = 1

# def toto():
#     global test
#     print(test)
#     test += 2

# toto()
# print(test)


import re

votre_chaine = "e xe&mple1/ex'em&ple2?ex,emple3/exemple4?exemple5=$toto"

# Utilisez re.split() avec une expression régulière pour diviser en utilisant '/' ou '?'
elements = re.split(r'[/?=,& \']', votre_chaine)

# elements contiendra la liste des parties divisées
print(elements)


from datetime import datetime, timedelta, timezone

# print(datetime.now(timezone.utc))

# j'ai recupere la date en db elle est sous cette forme: 2023-10-31T16:41.33.507Z
# je veux la comparer avec la date actuelle

# date_db = "2023-11-30T16:41.33.507Z"

# date_db = date_db.split("T")[0]
# date_db = date_db.split("-")
# date_db = datetime(
#     int(date_db[0]), int(date_db[1]), int(date_db[2]), tzinfo=timezone.utc
# )

# print(date_db)

# if date_db < datetime.now(timezone.utc):
#     print("date depassee")

print((datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d"))

st = "{ 'titre': 'ca marche', 'message': $return_value }"

for word in st.split():
    print(word)

toto = "2023-11-02 18:01:18.000"
# token_expiration = toto
token_expiration = re.split(r'[- :.]', toto)
print(token_expiration)
#utc + 1
print((datetime.now(timezone.utc)) + timedelta(hours=1))
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
    print("date depassee")
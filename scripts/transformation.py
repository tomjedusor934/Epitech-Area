import json
from deep_translator import GoogleTranslator
import requests
from jsonpath_rw_ext import parse as jparse
import base64

class TransfoArea:
    def isJson(self, object):
        try:
            json.loads(object)
            return True
        except ValueError:
            return False

    def updatePrefix(self, obj, prefix):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updatePrefix(value, prefix)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updatePrefix(item, prefix)
        elif isinstance(obj, str):
            obj = prefix + obj
        return obj

    def addPrefix(self, prefix, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updatePrefix(object, prefix)
            object = json.dumps(object, indent=4)
        else:
            object = prefix + object
        return object

    def updateSuffix(self, obj, suffix):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateSuffix(value, suffix)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateSuffix(item, suffix)
        elif isinstance(obj, str):
            obj = obj + suffix
        return obj

    def addSuffix(self, suffix, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateSuffix(object, suffix)
            object = json.dumps(object, indent=4)
        else:
            object = object + suffix
        return object

    def updateReverse(self, obj, toto=''):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateReverse(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateReverse(item)
        elif isinstance(obj, str):
            obj = obj[::-1]
        return obj

    def reverseString(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateReverse(object)
            object = json.dumps(object, indent=4)
        else:
            object = object[::-1]
        return object

    def updateUpper(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateUpper(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateUpper(item)
        elif isinstance(obj, str):
            obj = obj.upper()
        return obj

    def upperString(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateUpper(object)
            object = json.dumps(object, indent=4)
        else:
            object = object.upper()
        return object

    def updateLower(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateLower(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateLower(item)
        elif isinstance(obj, str):
            obj = obj.lower()
        return obj

    def lowerString(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateLower(object)
            object = json.dumps(object, indent=4)
        else:
            object = object.lower()
        return object

    def updateTranslate(self, obj, language):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateTranslate(value, language)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateTranslate(item, language)
        elif isinstance(obj, str):
            obj = GoogleTranslator(source='auto', target=language).translate(obj)
        return obj

    def translateString(self, language, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateTranslate(object, language)
            object = json.dumps(object, indent=4)
        else:
            object = GoogleTranslator(source='auto', target=language).translate(object)
        return object

    def updateSnake(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateSnake(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateSnake(item)
        elif isinstance(obj, str):
            obj = obj.lower()
            obj = obj.replace(" ", "_")
            obj = obj.replace("-", "_")
            obj = obj.replace("é", "e")
            obj = obj.replace("è", "e")
            obj = obj.replace("ê", "e")
            obj = obj.replace("à", "a")
            obj = obj.replace("â", "a")
            obj = obj.replace("ô", "o")
            obj = obj.replace("î", "i")
            obj = obj.replace("ï", "i")
            obj = obj.replace("ç", "c")
            obj = obj.replace("'", "")
        return obj

    def snakeCase(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateSnake(object)
            object = json.dumps(object, indent=4)
        else:
            object = object.lower()
            object = object.replace(" ", "_")
            object = object.replace("-", "_")
            object = object.replace("é", "e")
            object = object.replace("è", "e")
            object = object.replace("ê", "e")
            object = object.replace("à", "a")
            object = object.replace("â", "a")
            object = object.replace("ô", "o")
            object = object.replace("î", "i")
            object = object.replace("ï", "i")
            object = object.replace("ç", "c")
            object = object.replace("'", "")
        return object

    def updateCamel(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateCamel(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateCamel(item)
        elif isinstance(obj, str):
            obj = obj.lower()
            obj = obj.replace(" ", "_")
            obj = obj.replace("-", "_")
            obj = obj.replace("é", "e")
            obj = obj.replace("è", "e")
            obj = obj.replace("ê", "e")
            obj = obj.replace("à", "a")
            obj = obj.replace("â", "a")
            obj = obj.replace("ô", "o")
            obj = obj.replace("î", "i")
            obj = obj.replace("ï", "i")
            obj = obj.replace("ç", "c")
            obj = obj.replace("'", "")
            obj = obj.title()
            obj = obj.replace("_", "")
            obj = obj[0].lower() + obj[1:]
        return obj

    def camelCase(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateCamel(object)
            object = json.dumps(object, indent=4)
        else:
            object = object.lower()
            object = object.replace(" ", "_")
            object = object.replace("-", "_")
            object = object.replace("é", "e")
            object = object.replace("è", "e")
            object = object.replace("ê", "e")
            object = object.replace("à", "a")
            object = object.replace("â", "a")
            object = object.replace("ô", "o")
            object = object.replace("î", "i")
            object = object.replace("ï", "i")
            object = object.replace("ç", "c")
            object = object.replace("'", "")
            object = object.title()
            object = object.replace("_", "")
            object = object[0].lower() + object[1:]
        return object

    def updateKebab(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateKebab(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateKebab(item)
        elif isinstance(obj, str):
            obj = obj.lower()
            obj = obj.replace(" ", "-")
            obj = obj.replace("_", "-")
            obj = obj.replace("é", "e")
            obj = obj.replace("è", "e")
            obj = obj.replace("ê", "e")
            obj = obj.replace("à", "a")
            obj = obj.replace("â", "a")
            obj = obj.replace("ô", "o")
            obj = obj.replace("î", "i")
            obj = obj.replace("ï", "i")
            obj = obj.replace("ç", "c")
            obj = obj.replace("'", "")
        return obj

    def kebabCase(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateKebab(object)
            object = json.dumps(object, indent=4)
        else:
            object = object.lower()
            object = object.replace(" ", "-")
            object = object.replace("_", "-")
            object = object.replace("é", "e")
            object = object.replace("è", "e")
            object = object.replace("ê", "e")
            object = object.replace("à", "a")
            object = object.replace("â", "a")
            object = object.replace("ô", "o")
            object = object.replace("î", "i")
            object = object.replace("ï", "i")
            object = object.replace("ç", "c")
            object = object.replace("'", "")
        return object

    def updateRemoveWhiteSpace(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateRemoveWhiteSpace(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateRemoveWhiteSpace(item)
        elif isinstance(obj, str):
            obj = obj.replace(" ", "")
        return obj

    def removeWhiteSpace(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateRemoveWhiteSpace(object)
            object = json.dumps(object, indent=4)
        else:
            object = object.replace(" ", "")
        return object

    def updateToFahrenheit(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateToFahrenheit(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateToFahrenheit(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = (obj * 9/5) + 32
        return obj

    def toFahrenheit(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateToFahrenheit(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = (object * 9/5) + 32
        return object

    def updateToCelsius(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateToCelsius(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateToCelsius(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = (obj - 32) * 5/9
        return obj

    def toCelsius(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateToCelsius(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = (object - 32) * 5/9
        return object

    def updateKmToMile(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateKmToMile(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateKmToMile(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / 1.609
        return obj

    def KmtoMile(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateKmToMile(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / 1.609
        return object

    def updateMileToKm(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateMileToKm(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateMileToKm(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * 1.609
        return obj

    def MiletoKm(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateMileToKm(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * 1.609
        return object

    def updateCmToInch(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateCmToInch(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateCmToInch(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / 2.54
        return obj

    def CmtoInch(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateCmToInch(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / 2.54
        return object

    def updateInchToCm(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateInchToCm(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateInchToCm(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * 2.54
        return obj

    def InchtoCm(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateInchToCm(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * 2.54
        return object

    def updateMtoKm(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateMtoKm(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateMtoKm(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / 1000
        return obj

    def MtoKm(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateMtoKm(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / 1000
        return object

    def updateKmToM(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateKmToM(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateKmToM(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * 1000
        return obj

    def KmtoM(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateKmToM(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * 1000
        return object

    def updateMToCm(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateMToCm(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateMToCm(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * 100
        return obj

    def MtoCm(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateMToCm(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * 100
        return object

    def updateCmToM(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateCmToM(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateCmToM(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / 100
        return obj

    def CmtoM(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateCmToM(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / 100
        return object

    def updateKgToPound(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateKgToPound(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateKgToPound(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * 2.205
        return obj

    def KgtoPound(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateKgToPound(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * 2.205
        return object

    def updatePoundToKg(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updatePoundToKg(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updatePoundToKg(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / 2.205
        return obj

    def PoundtoKg(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updatePoundToKg(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / 2.205
        return object

    def UpdateGtoKG(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.UpdateGtoKG(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.UpdateGtoKG(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / 1000
        return obj

    def GtoKG(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.UpdateGtoKG(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / 1000
        return object

    def UpdateKGtoG(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.UpdateKGtoG(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.UpdateKGtoG(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * 1000
        return obj

    def KGtoG(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.UpdateKGtoG(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * 1000
        return object

    def UpdateMintoHour(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.UpdateMintoHour(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.UpdateMintoHour(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / 60
        return obj

    def MintoHour(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.UpdateMintoHour(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / 60
        return object

    def UpdateHourtoMin(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.UpdateHourtoMin(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.UpdateHourtoMin(item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * 60
        return obj

    def HourtoMin(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.UpdateHourtoMin(object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * 60
        return object

    def create_string(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = json.dumps(object, indent=4)
        return object

    def get_part_of_response(self, object, key):
        if (self.isJson):
            object = json.loads(object)
            if '"' in key:
                key = key.replace('"', '')
                object = object[int(key)]
            else:
                object = object[key]

        else:
            # get the part of the string since the key
            object = object.split(key)[1]
        return object

    def get_all_keys(self, object, key):
        new_object = []
        if (self.isJson(object)):
            object = json.loads(object)
            for item_key, value in object.items():
                if item_key == key:
                    new_object.append(value)
        else:
            new_object = object.split(key)
        return new_object

    def get_first_key(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            for item_key, value in object.items():>>>>>>> main
7

                return value
        return object

    def is_one_value_lower(self, object, key, lower):
        if (self.isJson(object)):
            json_complete_value = json.loads(object)
            for item_key, value in json_complete_value.items():
                if item_key == key:
                    if value < lower:
                        return True
            return False
        elif isinstance(object, str) and isinstance(lower, str):
            if object < lower:
                return True
            return False
        elif isinstance(object, int) and isinstance(lower, int):
            if object < lower:
                return True
            return False
        return False

    def is_one_value_upper(self, object, key, upper):
        if (self.isJson(object)):
            json_complete_value = json.loads(object)
            for item_key, value in json_complete_value.items():
                if item_key == key:
                    if value > upper:
                        return True
            return False
        elif isinstance(object, str) and isinstance(upper, str):
            if object > upper:
                return True
            return False
        elif isinstance(object, int) and isinstance(upper, int):
            if object > upper:
                return True
            return False
        return False

    def is_all_value_lower(self, object, key, lower):
        if (self.isJson(object)):
            find_one = False
            json_complete_value = json.loads(object)
            for item_key, value in json_complete_value.items():
                if item_key == key:
                    find_one = True
                    if value > lower:
                        return False
            if find_one:
                return True
            return False
        elif isinstance(object, str) and isinstance(lower, str):
            if object < lower:
                return True
            return False
        elif isinstance(object, int) and isinstance(lower, int):
            if object < lower:
                return True
            return False
        return False

    def is_all_value_upper(self, object, key, upper):
        if (self.isJson(object)):
            find_one = False
            json_complete_value = json.loads(object)
            for item_key, value in json_complete_value.items():
                if item_key == key:
                    find_one = True
                    if value < upper:
                        return False
            if find_one:
                return True
            return False
        elif isinstance(object, str) and isinstance(upper, str):
            if object > upper:
                return True
            return False
        elif isinstance(object, int) and isinstance(upper, int):
            if object > upper:
                return True
            return False
        return False

    def updateAddFormulaToNumber(self, formula, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateFormulaToNumber(formula, value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateFormulaToNumber(formula, item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj + eval(formula)
        return obj

    def addFormulaToNumber(self, formula, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateAddFormulaToNumber(formula, object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object + eval(formula)
        return object

    def updateSubFormulaToNumber(self, formula, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateSubFormulaToNumber(formula, value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateSubFormulaToNumber(formula, item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj - eval(formula)
        return obj

    def subFormulaToNumber(self, formula, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateSubFormulaToNumber(formula, object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object - eval(formula)
        return object

    def updateMulFormulaToNumber(self, formula, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateMulFormulaToNumber(formula, value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateMulFormulaToNumber(formula, item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj * eval(formula)
        return obj

    def mulFormulaToNumber(self, formula, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateMulFormulaToNumber(formula, object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object * eval(formula)
        return object

    def updateTexttoBase64(self, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateTexttoBase64(value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateTexttoBase64(item)
        elif isinstance(obj, str):
            obj = obj.encode('ascii')
            obj = base64.b64encode(obj)
            obj = obj.decode('ascii')
        return obj

    def TexttoBase64(self, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = json.dumps(object, indent=4)
        else:
            if isinstance(object, str):
                object = object.encode('ascii')
                object = base64.b64encode(object)
                object = object.decode('ascii')
        return object

    def updateDivFormulaToNumber(self, formula, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updateDivFormulaToNumber(formula, value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updateDivFormulaToNumber(formula, item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj / eval(formula)
        return obj

    def divFormulaToNumber(self, formula, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updateDivFormulaToNumber(formula, object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object / eval(formula)
        return object

    def updatePowFormulaToNumber(self, formula, obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                obj[key] = self.updatePowFormulaToNumber(formula, value)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                obj[i] = self.updatePowFormulaToNumber(formula, item)
        elif isinstance(obj, int) or isinstance(obj, float):
            obj = obj ** eval(formula)
        return obj

    def powFormulaToNumber(self, formula, object):
        if (self.isJson(object)):
            object = json.loads(object)
            object = self.updatePowFormulaToNumber(formula, object)
            object = json.dumps(object, indent=4)
        else:
            if (isinstance(object, int) or isinstance(object, float)):
                object = object ** eval(formula)
        return object

    def get_rawg_last_games(self, json_data, num_games):
        if (not self.isJson(json_data)):
            return False
        json_data = json.loads(json_data)
        liste_jeux = ""
        num_games = int(num_games)
        for i in range(num_games):
            liste_jeux = liste_jeux + json_data["results"][i]["name"] + ", "
        liste_jeux = liste_jeux[:-2]
        return ("Voici les " + str(num_games) + " derniers jeux sortis : " + liste_jeux)


    def get_station_ids(self, json_data, type_essence="Gazole"):
        if (not self.isJson(json_data)):
            return False
        json_data = json.loads(json_data)
        station_ids, stations_name, liste_prix = [], [], []
        for station in json_data:
            station_id, station_name = station.get("id"), station.get("name")
            if station_id is not None:
                station_ids.append(station_id)
                stations_name.append(station_name)
            else:
                return False
        for station_id in station_ids:
            infos = requests.get(
                "https://api.prix-carburants.2aaz.fr/station/" + str(station_id))
            if infos.status_code == 200:
                fuel_data = infos.json()
                prix_du_gazole = None
                fuels = fuel_data.get("Fuels", [])
                for fuel in fuels:
                    if fuel.get("name") == type_essence:
                        prix_du_gazole = fuel.get("Price", {}).get("value")
                        liste_prix.append(prix_du_gazole)
                        break
            else:
                return False
        index_lowest = liste_prix.index(min(liste_prix))
        return (f"La station la moins chère est {stations_name[index_lowest]} avec un prix de {liste_prix[index_lowest]} pour un litre de {type_essence}")
    
    def find_value_in_json(self, json_data, path):
        json_obj = json.load(json_data)

        try:
            jsonpath_expr = jparse(path)
            matches = [match.value for match in jsonpath_expr.find(json_obj)]
            if matches:
                return str(matches[0])
        except Exception as e:
            return False

        return "-1"
    
    def get_lol_game_stats(self, json_data, summoner_name):

        json_data = json.load(json_data)
        kills, deaths, assists, win = 0, 0, 0, False
        for participant in json_data["info"]["participants"]:
            if participant["summonerName"] == summoner_name:
                kills = participant["kills"]
                deaths = participant["deaths"]
                assists = participant["assists"]
                win = participant["win"]
                break
        string = "Le joueur " + str(summoner_name) + "a fait " + str(kills) + " kills, " + str(deaths) +" deaths et " + str(assists) + " assists"
        if win and kills > deaths:
            string += ", il a carry et gagné la game."
        elif win and kills < deaths:
            string += ", il s'est fait boosté et a win."
        elif not win and kills > deaths:
            string += ", dommage il a pas carry, il a perdu quand meme."
        elif not win and kills < deaths:
            string += ", faut arreter le int, logique qu'il perde..."
        return string
    


# test = TransfoArea()
# file = open("test.json", "r").read()
# print(test.translateString("english", "vas te faire foutre"))
# print(test.translateString("english", file))

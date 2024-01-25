import os
import sys
import mysql.connector
from log import log


class sqlRequest:
    def __init__(self, mydb):
        self.mycursor = mydb.cursor()
        self.mydb = mydb

    def selectQuery(self, what, table, where="", order=""):
            """
            Executes a SELECT query on the database.

            Args:
                what (str): The columns to select.
                table (str): The table to select from.
                where (str, optional): The WHERE clause of the query. Defaults to "".
                order (str, optional): The ORDER BY clause of the query. Defaults to "".

            Returns:
                list: A list of tuples representing the rows returned by the query.
            """
            sql = "SELECT " + what + " FROM " + table
            if where != "":
                sql += " WHERE " + where
            if order != "":
                sql += " ORDER BY " + order
            log(sql, "warning", "atot")
            self.mycursor.execute(sql)
            return self.mycursor.fetchall()

    def insertQuery(self, table, values):
            """
            Inserts a new row into the specified table with the given values.

            Args:
                table (str): The name of the table to insert into.
                values (str): A comma-separated string of values to insert.

            Returns:
                None
            """
            sql = "INSERT INTO " + table + " VALUES (" + values + ")"
            self.mycursor.execute(sql)
            self.mydb.commit()

    def updateQuery(self, table, set, where):
        """
        Update a record in the specified table with the given set of values and condition.

        Args:
        table (str): The name of the table to update.
        set (str): The set of values to update in the table.
        where (str): The condition to specify which records to update.

        Returns:
        None
        """
        sql = "UPDATE " + table + " SET " + set + " WHERE " + where
        self.mycursor.execute(sql)
        self.mydb.commit()

    def deleteQuery(self, table, where):
        """
        Deletes rows from a table based on a given condition.

        Args:
        table (str): The name of the table to delete rows from.
        where (str): The condition to use when selecting rows to delete.

        Returns:
        None
        """
        sql = "DELETE FROM " + table + " WHERE " + where
        self.mycursor.execute(sql)
        self.mydb.commit()

from os.path import exists
import json
import requests

class APIAuthenticate:
    if exists("botenodk.json"):
        with open("botenodk.json") as cfg:
            config = json.load(cfg)

    # function to check if the script is authorized to use the API by checking the config file
    def IsAuthorized(self):         
        if self.config["AUTHTOKEN"]:
            return True
        else:
            return False

    # function to achieve a authorization token from the API
    def GenerateAuthToken(self, username, password):
        if not username or not password:
            print("No username or password specified!")
            exit()

        if not self.IsAuthorized(self):
            body = {
                "username": username,
                "password": password
            }
            authRequest = requests.post(self.config["APIURL"] + "/token/authorize", json=body, verify=False)

            if not authRequest.status_code == 200:
                print("Authentication error - please submit valid credentials")
                exit()
            
            authResponse = authRequest.json()

            #save token to config file
            self.config["AUTHTOKEN"] = authResponse["authToken"]
            with open("botenodk.json", 'w') as cfg:
                json.dump(self.config, cfg)

            print("Authorization successfull, your auth token is: " + authResponse["authToken"])
            print("Your token is saved to the configuration file: botenodk.json")
        else:
            print("You are already authenticated, or the AUTHTOKEN value in the config contains (some) data. Please clear the value if you want to retrieve a new authorization token.")

    # function to retrieve a new temporary access token from the API
    def GetAccessToken(self):
        # check if there is a auth token available
        if self.IsAuthorized(self):
            authToken = self.config["AUTHTOKEN"]
        else:
            print("No authorization token set, first retrieve a authorization token before running the scripts!")
            exit()

        # retrieve a access token
        body = {
            "grant_type": "auth_token",
            "authtoken": self.config["AUTHTOKEN"]
        }
        accTokenRequest = requests.post(self.config["APIURL"] + "/token", json=body, verify=False)

        if not accTokenRequest.status_code == 200:
            print(accTokenRequest.content)
            print("Authentication error: authorization token might be invalid!")
            print("Please retry. If the problem still exists, try to retrieve a new authorization token.")
            exit()

        # decode to json object and return access token
        accToken = accTokenRequest.json()
        return accToken["token"]
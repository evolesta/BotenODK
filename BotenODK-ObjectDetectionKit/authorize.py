from cfg_authenticate import APIAuthenticate as auth
import getpass

print("== Only run this script if you aren't already authorized to use the API ==")

print("Please enter your username:")
username = input()
print("Please enter your password:")
password = getpass.getpass("Password:")

auth.GenerateAuthToken(auth, username, password)
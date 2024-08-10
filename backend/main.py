# IDEA
# api's
# top 10 open source repo
# check their data ...
# push data to db
#  frontned will read from db create visualizations
# jenkins job will run python file periodically to collect data adn send to db
# select db
# later part.. -> create a mlops solution
# parts covered in this project -> full stack, data analysis, ml, ci/cd

# --------------------------------------------------------------------------------------------------


# flask api's add here
# to fetch data for a particular publics repo

from github import Github
from github import Auth

import config


class GithubData:
    def __init__(self, token):
        auth = Auth.Token(token)
        self.g = Github(auth=auth)
        self.g.get_user().login
        self.github_data = []

    def fetch_data(self):
        pass



    # def send_data_to_db(self):
    #     pass


def collect_github_data():
    github_data = GithubData(config.token)
    github_data.fetch_data()


collect_github_data()
# if __name__ == "main":
#     fetch_github_data()
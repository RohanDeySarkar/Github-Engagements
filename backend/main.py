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


# flask api's add hdiff file to fetch for a specific user
# to fetch data for a particular publics repo

from github import Github
from github import Auth
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import config

list_of_repos = [
    "tensorflow/tensorflow",
    "pytorch/pytorch",
    "opencv/opencv",
    "scikit-learn/scikit-learn",
    "keras-team/keras",
    "langchain-ai/langchain",
    "Artelnics/opennn",
    "huggingface/transformers",
    "openai/whisper",
    "dmlc/xgboost",
    "BVLC/caffe",
    "apache/mxnet",
    "deeplearning4j/deeplearning4j"
]

class GithubData:
    def __init__(self, token):
        auth = Auth.Token(token)
        self.g = Github(auth=auth)
        self.g.get_user().login
        self.github_data = []

    def get_data(self, list_of_repos):
        for idx in range(len(list_of_repos)):
            repository = list_of_repos[idx]
            print(f'Fetching data for {repository} Repository...')
            try:
                repo = self.g.get_repo(repository)
                # print(dir(repo))

                count = 0
                n_latest = 10
                
                latest_open_issues = []
                open_issues = repo.get_issues(state='open')
                for issue in open_issues:
                    if count == n_latest:
                        count = 0
                        break
                    latest_open_issues.append(issue.title)
                    count += 1

                latest_releases = []
                releases = repo.get_releases()
                for release in releases:
                    if count == n_latest:
                        count = 0
                        break 
                    latest_releases.append(release.title)
                    count += 1

                languages = []
                repo_languages = repo.get_languages()
                for language in repo_languages:
                    languages.append({
                        "language" : language,
                        "loc" : repo_languages[language]
                    })

                temp_data = {
                    "id" : idx,
                    "repo_name" : repo.name,
                    "description:": repo.description,
                    "stars" : repo.stargazers_count,
                    "forks" : repo.forks_count,
                    "created_at" : repo.created_at,
                    "updated_at" : repo.updated_at,
                    "homepage" : repo.homepage,
                    "latest_open_issues" : latest_open_issues,
                    "latest_releases" : latest_releases,
                    "languages" : languages
                }
                self.github_data.append(temp_data)
            except:
                print(f'{repository} not found')

    def send_data_to_db(self, firebase_cred):
        print('Sending data to DB...')
        cred = credentials.Certificate(firebase_cred)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        for item in self.github_data:
            try:
                db.collection("github_repos").document(str(item["id"])).set(item)
            except:
                print(f'Error with {item["repo_name"]}')


def collect_github_data(list_of_repos):
    git_hub = GithubData(config.token)
    git_hub.get_data(list_of_repos)
    git_hub.send_data_to_db(config.firebase_cred)
    print('Finished!')
    

collect_github_data(list_of_repos)

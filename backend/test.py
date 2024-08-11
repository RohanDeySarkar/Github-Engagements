from github import Github
from github import Auth

import config

auth = Auth.Token(config.token)
g = Github(auth=auth)
g.get_user().login

# list of all top repos
# https://analyticsindiamag.com/ai-origins-evolution/12-most-popular-open-source-projects-on-github/

github_data = []

# just list competetive repos ?? Eg: tensorflow vs pytorch
# TOP ten AI libraries
repo_list = [
    "tensorflow/tensorflow",
  
]

for repo in repo_list:
    try:
        repo = g.get_repo(repo)
        print(dir(repo))
        
        count = 0
        n_latest = 10

    except:
        print(f'{repo} not found')

print(github_data)


# https://pygithub.readthedocs.io/en/stable/examples/Repository.html#get-repository-topics

# Home page of UI these data needed (TOP 10 repo engagements)
# number of prs
# number of contributors
# lines of codes
# list of open issues
#  

# Individual page UI these data needed (USER CONTRIBUTION..)
# lines of code
# number of repos
# open source contribuytion
# medals ??

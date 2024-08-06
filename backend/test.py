from github import Github
from github import Auth

import config

auth = Auth.Token(config.token)
g = Github(auth=auth)
g.get_user().login

# list of all top repos
# https://analyticsindiamag.com/ai-origins-evolution/12-most-popular-open-source-projects-on-github/


repo = g.get_repo("tensorflow/tensorflow")
print(repo.get_topics())

# https://pygithub.readthedocs.io/en/stable/examples/Repository.html#get-repository-topics

# number of prs
# number of contributors
# lines of codes
# list of open issues
#  

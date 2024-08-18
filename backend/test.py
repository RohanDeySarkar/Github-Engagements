
from github import Github
from github import Auth
from firebase_admin import credentials
from firebase_admin import firestore
import config
import firebase_admin

auth = Auth.Token(config.token)
g = Github(auth=auth)
g.get_user().login


repo_name = 'tensorflow/tensorflow'

repo = g.get_repo(repo_name)

count = 0
n_latest = 15

latest_open_issues = []
open_issues = repo.get_issues(state='open')
for issue in open_issues:
    if count == n_latest:
        count = 0
        break
    latest_open_issues.append({
        "issue" : issue.title,
        "user" : issue.user.login,
        "href" : f'https://github.com/{repo_name}/pull/{issue.number}'
    })
    count += 1
print(latest_open_issues)
# print(dir(repo))

# print(dir(repo.get_contributors().get_page(2)))

# contributors = 0
# page = 1
# not_empty = True
# while not_empty:
#     curr_page = repo.get_contributors(anon=True).get_page(page)
#     if len(curr_page) == 0:
#         not_empty = False
#         break
#     for item in curr_page:
#         contributors += 1
#     page += 1

#     print(contributors, "OP")






# top contributor
# commits graph
















# cred = credentials.Certificate(config.firebase_cred)
# firebase_admin.initialize_app(cred)
# db = firestore.client()

# users_ref = db.collection("users").document("deysarkarrohan@gmail.com").collection("repoNames")

# docs = users_ref.stream()

# for doc in docs:
#     print(f'{doc.id} => {doc.to_dict()}')

# # list of all top repos
# # https://analyticsindiamag.com/ai-origins-evolution/12-most-popular-open-source-projects-on-github/

# github_data = []

# # just list competetive repos ?? Eg: tensorflow vs pytorch
# # TOP ten AI libraries
# repo_list = [
#     "tensorflow/tensorflow",
  
# ]

# for repo in repo_list:
#     try:
#         repo = g.get_repo(repo)
#         print(dir(repo))
        
#         count = 0
#         n_latest = 10

#     except:
#         print(f'{repo} not found')

# print(github_data)


# # https://pygithub.readthedocs.io/en/stable/examples/Repository.html#get-repository-topics

# # Home page of UI these data needed (TOP 10 repo engagements)
# # number of prs
# # number of contributors
# # lines of codes
# # list of open issues
# #  

# # Individual page UI these data needed (USER CONTRIBUTION..)
# # lines of code
# # number of repos
# # open source contribuytion
# # medals ??




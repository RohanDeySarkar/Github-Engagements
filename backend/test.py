
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

commits_data = []
page = 0
while page < 10:
    curr_page = repo.get_commits().get_page(page)
    for item in curr_page:
        try:
            commits_data.append({
                "author" : item.author.login,
                "date" : str(item.last_modified_datetime.date())
            })
        except:
            continue
    page += 1


top_contributors = {}
for data in commits_data:
    author = data["author"]
    if author not in top_contributors:
        top_contributors[author] = 1
    else:
        top_contributors[author] += 1
top_contributors = dict(sorted(top_contributors.items(), key=lambda item: item[1], reverse=True))

top_contributors_list = []
top_n_contributors = 10
curr_count = 0
for contributor in top_contributors:
    if curr_count == top_n_contributors:
        break
    top_contributors_list.append({
        "author" : contributor,
        "commits" : top_contributors[contributor]
    })
    curr_count += 1

print(top_contributors_list)

# print(commits_data)

# commits_per_day = {}
# for data in commits_data:
#     date = data["date"]
#     if date not in commits_per_day:
#         commits_per_day[date] = 1
#     else:
#         commits_per_day[date] += 1

# commits_per_day_list = []
# for commit_date in commits_per_day:
#     commits_per_day_list.append({
#         "date" : commit_date,
#         "commits" : commits_per_day[commit_date]
#     })

# print(commits_per_day_list)

# top contributors















# count = 0
# n_latest = 15

# latest_open_issues = []
# open_issues = repo.get_issues(state='open')
# for issue in open_issues:
#     if count == n_latest:
#         count = 0
#         break
#     latest_open_issues.append({
#         "issue" : issue.title,
#         "user" : issue.user.login,
#         "href" : f'https://github.com/{repo_name}/pull/{issue.number}'
#     })
#     count += 1
# print(latest_open_issues)
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




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
    "pytorch/pytorch"
    "opencv/opencv",
    "scikit-learn/scikit-learn",
    "keras-team/keras",
    "langchain-ai/langchain",
    "Artelnics/opennn",
    "huggingface/transformers",
    "openai/whisper",
    "dmlc/xgboost",
    "BVLC/caffe",
    "apache/mxnet"
    "deeplearning4j/deeplearning4j"
]

for repo in repo_list:
    try:
        repo = g.get_repo(repo)
        # print(dir(repo))
        print(repo.full_name)
        # print(repo.description)
        # print(repo.forks_count)
        # print(repo.created_at)
        # print(repo.updated_at)
        # print(repo.homepage)
        # print(repo.url)
        # print(repo.subscribers_count)
        # print("SIZE", repo.size)
        # print(repo.get_comments())
        # print(repo.get_top_referrers())
        # contents = repo.get_views_traffic()
        # contents = repo.get_views_traffic(per="week")
        # print(contents)
        break

        # topics = repo.get_topics()    
        # open_issues = repo.get_issues(state='open')

        # latest_open_issues = []
        # count = 0

        # for issue in open_issues:
        #     if count == 10:
        #         break
        #     latest_open_issues.append(issue.title)
        #     count += 1

        temp_data = {
            "repo_name" : repo.full_name,
            "description:": repo.description,
            "topics" : topics,
            "stars" : repo.stargazers_count,
            "watchers_count" : repo.watchers_count,
            "forks" : repo.forks_count,
            "creatd_at" : repo.created_at,
            "updated_at" : repo.updated_at,
            "homepage" : repo.homepage,
            "latest_open_issues" : latest_open_issues
        }
        # github_data.append(temp_data)
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

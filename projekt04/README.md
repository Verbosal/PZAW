WIP!!!

# Simple silly forum
## Once you make an account and log in, you can:
- Make a post,
- Modify or delete your own posts,
- See all posts,
- Or you can be an admin and modify/delete other people's posts!

First, if you'd like to be an admin, set up your desired administrator credentials in ```/database/admin.json```.
Then, just run
```node --env-file=./login/generate_env.bash --no-warnings index.js```
to start hosting the website @ localhost:1337.

Designed to be as simple as possible; Just one page for all your needs.
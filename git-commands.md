# Github Commands

## To clone
```sh
git clone <--branch> <branchName> url <renaming>
```

ex:

```sh
git clone --branch part-time https://github.com/AnthonyBronca/2023-nov-cohort nov-notes
```


## Check for git repo existance

```sh
git remote --v
```
OR

```
ls -a
```
And check for a .git file

`git remote --v` will tell you the address of where a push would go to

We can reassign it doing:

```sh
git remote set-url origin <new URL>
```

Then run `git push`

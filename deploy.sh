set -e
echo "********** building functions **********"
npm --prefix ./functions run build
echo "********** building frontends **********"
npm --prefix ./frontends run test
npm --prefix ./frontends run build:tasks --no-progress
firebase use default
firebase deploy --force --only "storage,firestore,functions,hosting"

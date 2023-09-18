set -e
echo "********** building functions **********"
# npm --prefix ./functions run test
npm --prefix ./functions run build
echo "********** building frontends **********"
# npm --prefix ./frontends run test
npm --prefix ./frontends run build:tasks --no-progress
firebase use test-app
firebase deploy --force --only "firestore,functions,hosting:tasks"

set -e
echo "********** building functions **********"
npm --prefix ./functions run build
echo "********** building webapp **********"
npm --prefix ./webapp run build-prod --no-progress
firebase use default
firebase deploy --force --only "storage,firestore,functions,hosting"

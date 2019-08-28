echo "deploy"
echo $PWD
rm -rf dist &&
npm install &&
npm run build
cd ..
echo $PWD
rm -rf public_html/lottery &&
mv Lottery_FE/dist public_html/lottery &&
chown -R playtron:playtron public_html/lottery
echo "Successfully built"